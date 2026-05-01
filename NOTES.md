# Quiz DB migration — handoff notes

Working notes for the multi-PR rollout. Update as features land.

## State of play (as of 2026-04-30)

### Shipped this PR

- **Migration** `supabase/migrations/20260501043939_create_quiz_schema.sql`:
  - Content: `quizzes`, `question_tiers` (+ `_translations`), `questions` (+ `_translations`), `result_band_copies` (flat, keyed by `(quiz_id, ordinal, locale)`).
  - Demographics (EAV): `demographic_fields` (+ `_translations`), `demographic_options` (+ `_translations`), `quiz_attempt_demographics`.
  - Responses: `quiz_attempts`, `quiz_responses`. Anon-friendly via `anon_token`. Score is summed at submit; `score_pct` is a stored generated column.
  - Insights: `quiz_insights` (populated by future scheduled job, not triggers).
  - RLS: public-read on content + insights; owner-read on attempts/responses; **no insert policies** — anon writes go through RPC only.
  - RPCs: `submit_attempt(p_quiz_id, p_locale, p_anon_token, p_responses jsonb, p_demographics jsonb null, p_email null, p_email_consent false, p_session_id null)` returns `(attempt_id, score, max_score, score_pct)`. Validates response count + foreign question_id. `claim_attempt(p_token)` for future signup.

- **Seed** `supabase/seed.sql` (auto-generated). Generator at `scripts/generate-seed.ts` (run with `node --experimental-strip-types scripts/generate-seed.ts`). Counts: 19 quizzes, 612 questions (general 15 + company 35 + roles 17 × 33, except `finance-accounting` which has 34 → 562), 5 tiers/quiz × 2 locales, 10 band-copy rows per quiz.

- **Front (read path only)**:
  - `app/assessment/[slug]/page.tsx` — server component, `generateStaticParams` from active quizzes.
  - `lib/supabase/queries/getQuizBySlug.ts` — uses a plain `@supabase/supabase-js` client (NOT the cookie-aware `createClient`), because `generateStaticParams` runs without an HTTP request. ISR `revalidate: 3600`.
  - `app/assessment/_components/quiz-runner.tsx` — generic client component. Replaces `general-quiz.tsx` / `company-quiz.tsx` / `role-quiz.tsx` (deleted).
  - `lib/quizCopy.ts` — quiz-level copy (title, subtitle, intro) keyed by slug. Lives in `lib/`, NOT in DB.
  - `lib/scoring.ts` — `BAND_THRESHOLDS_PCT = [0,20,40,60,80,100]`, `getBandOrdinal(score, max)`.
  - `lib/sessionState.ts` — keyed by `quizSlug` (was `assessmentType + roleId`).
  - Routes: `/assessment/role/:roleId` redirects to `/assessment/role-:roleId` (next.config.ts).

### Not yet wired (deliberately)

| Capability                 | What's missing                                                                                                                                                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Persisting attempts        | Front never calls `submit_attempt`. Test row in DB came from a manual `curl` during verification.                                                                                                                            |
| Anon cookie middleware     | `aq_anon` cookie issuance on first `/assessment/*` hit. Plan calls for it now; not done.                                                                                                                                     |
| Results screen from DB     | `QuizRunner` builds `resultsContent` inline from `band.description` / `band.nextStep`. Per-dimension breakdown for company quiz dropped (UX unified). Migrate when results screen moves off `lib/*`.                         |
| Email capture wiring to DB | Currently posts to BEEHIIV_ENDPOINT only. Should also pass `email` + `email_consent` to `submit_attempt`.                                                                                                                    |
| Demographics UI → DB       | `DemographicsScreen` still uses static `lib/demographics.ts` / `industries.ts` / `companyTypesV2.ts`. Should fetch from `demographic_fields` + `demographic_options` and submit through `submit_attempt`'s `p_demographics`. |
| `claim_attempt` on signup  | Auth flow doesn't exist yet. When it does, call `claim_attempt(token)` after sign-in.                                                                                                                                        |
| Insights job               | No scheduler / function. Manual queries only for now.                                                                                                                                                                        |

## Locked decisions (don't relitigate)

- **`quizzes` is minimal**: `id, slug, is_active, created_at, updated_at`. No `kind`, no quiz translations table. Quiz-level copy lives in `lib/quizCopy.ts`.
- **Universal 5-pt scale** — `lib/scaleLabels.ts` consumed directly by `<ScaleButtons>`. No `option_sets` / `options` tables.
- **Universal thresholds** — 0/20/40/60/80/100. Band derived from `score_pct`, not stored.
- **EAV demographics** — adding a dimension is data INSERT, not a migration.
- **Slug format** — `general`, `company`, `role-${roleId}` (hyphenated, URL-safe).
- **Versioning** — `quiz_attempts.quiz_version` + `quiz_responses.weight` snapshot on submit. No history table.
- **Email persists on `quiz_attempts`** (`email`, `email_consent`) in addition to Beehiiv push.
- **Per-dimension breakdown for company quiz** is NOT preserved. If wanted later, add at results-screen-rework time.
- **Seed source** — `scripts/generate-seed.ts` is one-off. After committing seed.sql we can delete the script (kept for now in case we tweak content before all features ship).

## Anon-friendly contract

- `submit_attempt` is `security definer`, granted to `anon` + `authenticated`. Validates the response set covers exactly the active questions of the quiz (count match + foreign-key check), then inserts attempt + responses atomically.
- `quiz_attempts.anon_token uuid` is currently passed by the caller. Plan calls for issuing it as `aq_anon` HttpOnly cookie via Next middleware on first `/assessment/*` hit. NOT YET WIRED. When wiring:
  - Add to `lib/supabase/middleware.ts` (or a separate file under `proxy.ts` matcher): set cookie if missing, name `aq_anon`, value `crypto.randomUUID()`, `Max-Age` 90d, `HttpOnly`, `SameSite=Lax`, `Secure` in prod.
  - Front reads cookie on the page and passes to `submit_attempt`.

## Useful commands

- `pnpm db:reset` — wipe + apply migration + seed.
- `pnpm db:types` — regenerate `lib/supabase/database.types.ts` (needs local Supabase running).
- `node --experimental-strip-types scripts/generate-seed.ts` — regenerate `supabase/seed.sql` from `lib/*`.
- `pnpm typecheck` — must be clean before commit.
- `pnpm lint` — 2 pre-existing errors in `app/about/*` are not ours.

## Key files to know

| File                                                        | Why                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `supabase/migrations/20260501043939_create_quiz_schema.sql` | Authoritative schema + RPC source.                   |
| `lib/supabase/queries/getQuizBySlug.ts`                     | Read path. Note the build-time public client.        |
| `app/assessment/_components/quiz-runner.tsx`                | Single quiz UI. Where submit_attempt will be called. |
| `lib/quizCopy.ts`                                           | Add new quiz titles here, not in DB.                 |
| `lib/scoring.ts`                                            | Universal band logic.                                |
| `lib/sessionState.ts`                                       | `sessionStorage` shape — keyed by `quizSlug`.        |

## Next-PR checklist (suggested order)

1. **Anon cookie** + middleware. Small, isolates one concern.
2. **Wire `submit_attempt` in `QuizRunner`** when last question is answered. Pass `anon_token` from cookie, optionally `email`/`email_consent` later. Hand the returned `attempt_id` + `score_pct` to `PostQuizFlow`.
3. **Results screen from DB** — drop `lib/content.ts:RESULT_COPY`, `lib/companyResults.ts`, `lib/roleResults.ts` references; consume from `quiz.resultBands`. Decide whether to bring back per-dimension breakdown for company.
4. **Demographics UI → DB**: load fields/options from DB, submit through `p_demographics`.
5. **`claim_attempt` on signup** when auth lands.
6. **Insights job** — scheduled function (Supabase cron / edge / external) to populate `quiz_insights`. Read RPC enforces `sample_size >= 30`.
