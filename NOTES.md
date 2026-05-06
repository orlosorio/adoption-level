# Testing plan — auth-only quiz + user demographics + precomputed benchmarks

Concrete steps to verify the changes on `feat/quiz-db-schema`. Run them in order; each later flow assumes the earlier ones work.

## 1. Reset the DB and confirm migrations land

```powershell
pnpm db:stop
pnpm db:start
pnpm db:reset      # runs all migrations + seed
pnpm db:types      # regenerates types from the live DB (overwrites hand-edits — should diff back to the same shape)
pnpm typecheck
```

If `db:types` produces a non-trivial diff, the hand-edited `database.types.ts` is wrong somewhere. Inspect and reconcile.

## 2. Smoke-test the schema in SQL

Open `pnpm db:status` → Studio URL. In the SQL editor:

```sql
-- 5 fields seeded
select slug, field_kind from public.demographic_fields order by sort_order;

-- options exist + translations cover both locales
select f.slug, count(distinct o.id) as opts, count(t.label) as translations
from public.demographic_fields f
join public.demographic_options o on o.field_id = f.id
join public.demographic_option_translations t on t.option_id = o.id
group by f.slug;

-- old table is gone
select to_regclass('public.quiz_attempt_demographics');  -- should be null

-- snapshot column exists
\d public.quiz_attempts
```

## 3. Anon must be locked out

In Studio's SQL editor, switch the role selector to `anon`:

```sql
select public.submit_attempt(
  (select id from public.quizzes where slug='general'),
  'es',
  '[]'::jsonb
);  -- should fail: "authentication required"

select * from public.user_demographics;  -- should return 0 rows / RLS denies
```

## 4. Logged-in happy path

```powershell
pnpm dev
```

1. `localhost:3000` → click **Sign in** → switch to **Sign up**.
2. Fill name/email/password. Use a real email — Resend SMTP delivers the confirm link.
3. The new **Tell us a bit more** step appears. Pick options and **Save**.
4. Open the email, click the confirm link. The callback redirects to `/` (no `next` because signup happened from the homepage).
5. SQL check:

```sql
select user_id, count(*) from public.user_demographics group by user_id;  -- should be 5 if you didn't skip
```

6. Navigate to `/assessment/general`, take the quiz to the end. Results appear immediately, no email/demographics screens.
7. SQL check:

```sql
select id, user_id, score, score_pct, jsonb_array_length(demographics_snapshot)
from public.quiz_attempts order by created_at desc limit 1;

select * from public.quiz_insights
where quiz_id = (select id from public.quizzes where slug='general');
-- you'll see at least the overall row + one row per (field, option) you saved
```

8. Click **Email this to me**. Check your inbox for the Resend message.

## 5. Logged-out → login mid-quiz

1. Open an incognito window, take `/assessment/general` to the end without signing in.
2. You'll see the "Sign in to unlock" CTA inside the slot.
3. Click → log in with the existing user.
4. The slot should auto-submit (saving spinner → benchmark). Verify a fresh row in `quiz_attempts`.

## 6. Logged-out → sign up → confirm in a different tab (the localStorage path)

1. Fresh incognito profile. Take the quiz to the end.
2. Click **Sign in** → **Sign up** with a new email.
3. **Save** demographics in the modal step (or **Skip**).
4. Open the confirmation email **in the same browser** (different tab is fine — `localStorage` is shared per origin within a browser profile, but is **not** shared across browsers).
5. After clicking the link, the callback returns you to `/assessment/general?...` because signup put `next=` on `emailRedirectTo`.
6. quiz-runner sees `localStorage` complete + user logged-in → jumps to the results screen → slot auto-submits.
7. Verify in DB: new attempt + `user_demographics` flushed (if you didn't skip).

```sql
select user_id, field_id, option_id from public.user_demographics
where user_id = (select id from auth.users order by created_at desc limit 1);
```

## 7. Trigger correctness under load

```sql
-- count attempts per quiz
select quiz_id, count(*) from public.quiz_attempts where is_complete group by quiz_id;

-- counts in insights match overall row's sample_size
select qi.sample_size, c.cnt
from public.quiz_insights qi
join (select quiz_id, count(*) cnt from public.quiz_attempts where is_complete group by quiz_id) c
  on c.quiz_id = qi.quiz_id
where qi.segment_field_id is null;

-- per-(field, option) sample sizes never exceed the overall
select max(sample_size) over (partition by quiz_id) as overall_max,
       sample_size, segment_field_id
from public.quiz_insights;
```

Then submit one more attempt and verify the overall `sample_size` increments.

## 8. Edge function locally

The function calls Resend. Locally, with `[edge_runtime] enabled = true`:

```powershell
supabase functions serve send-result-email --env-file supabase/.env
```

Then in the running app, hit **Email this to me**. To test via curl:

```powershell
curl -X POST http://127.0.0.1:54321/functions/v1/send-result-email `
  -H "Authorization: Bearer <user-access-token>" `
  -H "Content-Type: application/json" `
  -d '{"attempt_id":"<uuid>"}'
```

Grab the access token from devtools → Application → Cookies → `sb-...-auth-token`.

## What to watch out for

- If `pnpm db:types` produces a real diff, the hand-edited types are out of sync — re-run and commit the regenerated file.
- Salary buckets (`<20k / 20-40k / 40-70k / 70-120k / 120-200k / 200k+ / prefer-not-to-say`) come from the plan's defaults; confirm before launch.
- Cross-browser handoff (e.g. desktop signup, mobile email) is **not** supported — `localStorage` is per-profile.
- The slot's percentile is **interpolated** from `p25/p50/p75`, not exact. With <50 respondents per slice the BenchmarkPanel hides numbers behind "not enough data" copy.
