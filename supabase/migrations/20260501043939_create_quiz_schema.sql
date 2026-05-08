-- ============================================================================
-- Quiz schema: content tables, demographics (EAV), attempts/responses, insights.
-- All universal scoring (5-pt scale, 0/20/40/60/80 thresholds) lives in lib/.
-- This schema groups questions per quiz and stores answered attempts.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- Content tables (admin-write via service role, public-read via RLS).
-- ────────────────────────────────────────────────────────────────────────────

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.question_tiers (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  ordinal int not null,
  sort_order int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quiz_id, ordinal)
);

create table public.question_tier_translations (
  tier_id uuid not null references public.question_tiers(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  short_label text not null,
  name text,
  primary key (tier_id, locale)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  tier_id uuid references public.question_tiers(id) on delete set null,
  sort_order int not null,
  weight numeric not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quiz_id, sort_order)
);

create index questions_quiz_id_idx on public.questions(quiz_id) where is_active;

create table public.question_translations (
  question_id uuid not null references public.questions(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  statement text not null,
  help_text text,
  primary key (question_id, locale)
);

-- Result-band copy. Flat: keyed by (quiz, ordinal, locale). Thresholds hardcoded
-- in lib/scoring.ts as 0/20/40/60/80; band_ordinal = min(floor(score_pct/20), 4).
create table public.result_band_copies (
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  ordinal smallint not null check (ordinal between 0 and 4),
  locale text not null check (locale in ('es', 'en')),
  short_label text,
  description text not null,
  next_step text not null,
  primary key (quiz_id, ordinal, locale)
);

-- ────────────────────────────────────────────────────────────────────────────
-- Demographics (EAV — extensible without migrations).
-- ────────────────────────────────────────────────────────────────────────────

create table public.demographic_fields (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  field_kind text not null check (field_kind in ('select', 'range', 'number', 'text')),
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.demographic_field_translations (
  field_id uuid not null references public.demographic_fields(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  label text not null,
  placeholder text,
  helper text,
  primary key (field_id, locale)
);

create table public.demographic_options (
  id uuid primary key default gen_random_uuid(),
  field_id uuid not null references public.demographic_fields(id) on delete cascade,
  slug text not null,
  sort_order int not null default 0,
  min_val numeric,
  max_val numeric,
  created_at timestamptz not null default now(),
  unique (field_id, slug)
);

create table public.demographic_option_translations (
  option_id uuid not null references public.demographic_options(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  label text not null,
  primary key (option_id, locale)
);

-- ────────────────────────────────────────────────────────────────────────────
-- Response tables (anon-insert via RPC only, owner-read).
-- ────────────────────────────────────────────────────────────────────────────

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id),
  user_id uuid references auth.users(id) on delete set null,
  anon_token uuid,
  session_id text,
  locale text not null check (locale in ('es', 'en')),
  score int not null default 0,
  max_score int not null default 0,
  score_pct numeric generated always as (
    case when max_score = 0 then 0 else score::numeric / max_score * 100 end
  ) stored,
  quiz_version int not null default 1,
  email text,
  email_consent boolean not null default false,
  is_complete boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quiz_attempts_user_id_idx on public.quiz_attempts(user_id) where user_id is not null;
create index quiz_attempts_anon_token_idx on public.quiz_attempts(anon_token) where anon_token is not null;
create index quiz_attempts_complete_idx on public.quiz_attempts(quiz_id, completed_at)
  where is_complete;

create table public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id),
  value smallint not null check (value between 0 and 4),
  weight numeric not null default 1,
  answered_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

create table public.quiz_attempt_demographics (
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  field_id uuid not null references public.demographic_fields(id),
  option_id uuid references public.demographic_options(id),
  text_value text,
  numeric_value numeric,
  primary key (attempt_id, field_id)
);

-- ────────────────────────────────────────────────────────────────────────────
-- Insights (read-only public; populated by scheduled job).
-- ────────────────────────────────────────────────────────────────────────────

create table public.quiz_insights (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  segment_field_id uuid references public.demographic_fields(id) on delete cascade,
  segment_option_id uuid references public.demographic_options(id) on delete cascade,
  band_ordinal smallint check (band_ordinal between 0 and 4),
  sample_size int not null default 0,
  avg_score numeric,
  p25 numeric,
  p50 numeric,
  p75 numeric,
  updated_at timestamptz not null default now()
);

create unique index quiz_insights_segment_idx on public.quiz_insights (
  quiz_id,
  coalesce(segment_field_id, '00000000-0000-0000-0000-000000000000'::uuid),
  coalesce(segment_option_id, '00000000-0000-0000-0000-000000000000'::uuid),
  coalesce(band_ordinal, -1)
);

-- ────────────────────────────────────────────────────────────────────────────
-- updated_at triggers (reuse public.set_updated_at from profiles migration).
-- ────────────────────────────────────────────────────────────────────────────

create trigger quizzes_set_updated_at
  before update on public.quizzes
  for each row execute function public.set_updated_at();

create trigger question_tiers_set_updated_at
  before update on public.question_tiers
  for each row execute function public.set_updated_at();

create trigger questions_set_updated_at
  before update on public.questions
  for each row execute function public.set_updated_at();

create trigger demographic_fields_set_updated_at
  before update on public.demographic_fields
  for each row execute function public.set_updated_at();

create trigger quiz_attempts_set_updated_at
  before update on public.quiz_attempts
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────────────────────
-- Row-level security.
-- ────────────────────────────────────────────────────────────────────────────

alter table public.quizzes enable row level security;
alter table public.question_tiers enable row level security;
alter table public.question_tier_translations enable row level security;
alter table public.questions enable row level security;
alter table public.question_translations enable row level security;
alter table public.result_band_copies enable row level security;
alter table public.demographic_fields enable row level security;
alter table public.demographic_field_translations enable row level security;
alter table public.demographic_options enable row level security;
alter table public.demographic_option_translations enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_responses enable row level security;
alter table public.quiz_attempt_demographics enable row level security;
alter table public.quiz_insights enable row level security;

-- Content tables: public read.
create policy "quizzes_read" on public.quizzes
  for select to anon, authenticated using (is_active);
create policy "question_tiers_read" on public.question_tiers
  for select to anon, authenticated using (true);
create policy "question_tier_translations_read" on public.question_tier_translations
  for select to anon, authenticated using (true);
create policy "questions_read" on public.questions
  for select to anon, authenticated using (is_active);
create policy "question_translations_read" on public.question_translations
  for select to anon, authenticated using (true);
create policy "result_band_copies_read" on public.result_band_copies
  for select to anon, authenticated using (true);
create policy "demographic_fields_read" on public.demographic_fields
  for select to anon, authenticated using (is_active);
create policy "demographic_field_translations_read" on public.demographic_field_translations
  for select to anon, authenticated using (true);
create policy "demographic_options_read" on public.demographic_options
  for select to anon, authenticated using (true);
create policy "demographic_option_translations_read" on public.demographic_option_translations
  for select to anon, authenticated using (true);

-- quiz_attempts: owner-read only. Anon attempts are read via RPC by anon_token.
create policy "quiz_attempts_select_own" on public.quiz_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

-- quiz_responses: read scoped to attempts the caller owns.
create policy "quiz_responses_select_own" on public.quiz_responses
  for select to authenticated using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = quiz_responses.attempt_id and a.user_id = (select auth.uid())
    )
  );

-- quiz_attempt_demographics: same.
create policy "quiz_attempt_demographics_select_own" on public.quiz_attempt_demographics
  for select to authenticated using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = quiz_attempt_demographics.attempt_id and a.user_id = (select auth.uid())
    )
  );

-- Insights: public read (sample-size floor enforced by RPC, not RLS).
create policy "quiz_insights_read" on public.quiz_insights
  for select to anon, authenticated using (true);

-- No insert/update/delete policies anywhere — admin uses the service role,
-- anon writes go through SECURITY DEFINER RPCs below.

-- ────────────────────────────────────────────────────────────────────────────
-- RPCs.
-- ────────────────────────────────────────────────────────────────────────────

-- submit_attempt: validates, snapshots weights, computes score, inserts.
-- responses payload: jsonb array of { question_id: uuid, value: smallint }
-- demographics payload: optional jsonb array of
--   { field_id: uuid, option_id?: uuid, text_value?: text, numeric_value?: numeric }
create function public.submit_attempt(
  p_quiz_id uuid,
  p_locale text,
  p_anon_token uuid,
  p_responses jsonb,
  p_demographics jsonb default null,
  p_email text default null,
  p_email_consent boolean default false,
  p_session_id text default null
)
returns table (attempt_id uuid, score int, max_score int, score_pct numeric)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt_id uuid;
  v_score int := 0;
  v_max_score int := 0;
  v_response_count int;
  v_question_count int;
begin
  if p_responses is null or jsonb_typeof(p_responses) <> 'array' then
    raise exception 'p_responses must be a jsonb array';
  end if;

  if p_locale not in ('es', 'en') then
    raise exception 'invalid locale %', p_locale;
  end if;

  -- Validate quiz exists and is active.
  if not exists (select 1 from public.quizzes where id = p_quiz_id and is_active) then
    raise exception 'quiz % not found or inactive', p_quiz_id;
  end if;

  -- Validate every response references an active question on this quiz, and
  -- that the response set covers exactly the active question set (no dupes,
  -- no missing, no foreign questions).
  select count(*) into v_response_count from jsonb_array_elements(p_responses);
  select count(*) into v_question_count
    from public.questions where quiz_id = p_quiz_id and is_active;

  if v_response_count <> v_question_count then
    raise exception
      'response count mismatch: got %, expected %', v_response_count, v_question_count;
  end if;

  if exists (
    select 1
    from jsonb_array_elements(p_responses) r
    left join public.questions q
      on q.id = (r->>'question_id')::uuid
      and q.quiz_id = p_quiz_id
      and q.is_active
    where q.id is null
  ) then
    raise exception 'response references a question not in quiz %', p_quiz_id;
  end if;

  -- Insert attempt.
  insert into public.quiz_attempts (
    quiz_id, anon_token, session_id, locale,
    email, email_consent, is_complete, completed_at
  ) values (
    p_quiz_id, p_anon_token, p_session_id, p_locale,
    p_email, p_email_consent, true, now()
  )
  returning id into v_attempt_id;

  -- Snapshot responses with question weight; aggregate score.
  with inserted as (
    insert into public.quiz_responses (attempt_id, question_id, value, weight)
    select
      v_attempt_id,
      (r->>'question_id')::uuid,
      (r->>'value')::smallint,
      q.weight
    from jsonb_array_elements(p_responses) r
    join public.questions q on q.id = (r->>'question_id')::uuid
    returning value, weight
  )
  select
    coalesce(sum(value * weight), 0)::int,
    coalesce(sum(4 * weight), 0)::int
  into v_score, v_max_score
  from inserted;

  update public.quiz_attempts
    set score = v_score, max_score = v_max_score
    where id = v_attempt_id;

  -- Optional demographics.
  if p_demographics is not null and jsonb_typeof(p_demographics) = 'array' then
    insert into public.quiz_attempt_demographics (
      attempt_id, field_id, option_id, text_value, numeric_value
    )
    select
      v_attempt_id,
      (d->>'field_id')::uuid,
      nullif(d->>'option_id','')::uuid,
      nullif(d->>'text_value',''),
      nullif(d->>'numeric_value','')::numeric
    from jsonb_array_elements(p_demographics) d
    on conflict (attempt_id, field_id) do update
      set option_id = excluded.option_id,
          text_value = excluded.text_value,
          numeric_value = excluded.numeric_value;
  end if;

  return query
    select v_attempt_id, v_score, v_max_score,
      case when v_max_score = 0 then 0::numeric
           else (v_score::numeric / v_max_score) * 100 end;
end;
$$;

revoke all on function public.submit_attempt(uuid, text, uuid, jsonb, jsonb, text, boolean, text)
  from public;
grant execute on function public.submit_attempt(uuid, text, uuid, jsonb, jsonb, text, boolean, text)
  to anon, authenticated;

-- claim_attempt: link prior anon attempts to the now-authenticated user.
create function public.claim_attempt(p_token uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_count int;
begin
  if v_uid is null then
    raise exception 'must be authenticated to claim attempts';
  end if;
  if p_token is null then
    return 0;
  end if;
  update public.quiz_attempts
    set user_id = v_uid
    where anon_token = p_token and user_id is null;
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.claim_attempt(uuid) from public;
grant execute on function public.claim_attempt(uuid) to authenticated;
