-- ============================================================
-- Status AI — Initial Schema
-- ============================================================

-- 1. Assessment Types
-- ------------------------------------------------------------
create table assessment_types (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_es text not null,
  description_en text,
  description_es text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Dimensions (company assessment)
-- ------------------------------------------------------------
create table dimensions (
  id text primary key,
  assessment_type_id text not null references assessment_types(id),
  name_en text not null,
  name_es text not null,
  sort_order smallint not null default 0,
  created_at timestamptz default now()
);

create index dimensions_assessment_type_idx on dimensions (assessment_type_id);

-- 3. Roles
-- ------------------------------------------------------------
create table roles (
  id text primary key,
  name_en text not null,
  name_es text not null,
  is_active boolean default true,
  sort_order smallint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Questions
-- ------------------------------------------------------------
create table questions (
  id uuid primary key default gen_random_uuid(),
  assessment_type_id text not null references assessment_types(id),
  role_id text references roles(id),
  dimension_id text references dimensions(id),
  level smallint not null check (level between 0 and 4),
  level_label_en text not null,
  level_label_es text not null,
  statement_en text not null,
  statement_es text not null,
  options jsonb not null default '[
    {"value":0,"label_en":"Never done this","label_es":"Nunca he hecho esto"},
    {"value":1,"label_en":"Tried it once or twice","label_es":"Lo probé una o dos veces"},
    {"value":2,"label_en":"Done it a few times, still figuring it out","label_es":"Lo hago a veces, todavía lo estoy aprendiendo"},
    {"value":3,"label_en":"Do it regularly and it works well","label_es":"Lo hago regularmente y me funciona bien"},
    {"value":4,"label_en":"Do it daily, confidently — could teach someone else","label_es":"Lo hago diario con confianza — podría enseñárselo a alguien"}
  ]'::jsonb,
  sort_order smallint not null default 0,
  is_active boolean default true,
  is_new boolean default false,
  metadata jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index questions_assessment_type_idx on questions (assessment_type_id, sort_order)
  where is_active = true;

create index questions_role_idx on questions (role_id, sort_order)
  where role_id is not null and is_active = true;

create index questions_dimension_idx on questions (dimension_id, sort_order)
  where dimension_id is not null and is_active = true;

-- 5. Submissions
-- ------------------------------------------------------------
create table submissions (
  id uuid primary key default gen_random_uuid(),
  assessment_type_id text not null references assessment_types(id),
  role_id text references roles(id),
  language text not null check (language in ('en', 'es')),
  email text,
  country text,
  salary_range text,
  company_type text,
  industry text,
  total_score smallint not null,
  max_score smallint not null,
  result_level smallint not null check (result_level between 0 and 4),
  dimension_scores jsonb,
  completed_at timestamptz default now(),
  created_at timestamptz default now()
);

create index submissions_benchmark_idx on submissions (assessment_type_id, country, company_type, industry);

create index submissions_role_benchmark_idx on submissions (assessment_type_id, role_id)
  where role_id is not null;

create index submissions_email_idx on submissions (email)
  where email is not null;

create index submissions_completed_at_idx on submissions (completed_at desc);

-- 6. Submission Answers
-- ------------------------------------------------------------
create table submission_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  question_id uuid not null references questions(id),
  answer_value smallint not null check (answer_value between 0 and 4),
  created_at timestamptz default now()
);

create index submission_answers_submission_idx on submission_answers (submission_id);
create index submission_answers_question_idx on submission_answers (question_id, answer_value);

-- 7. Benchmark Aggregates
-- ------------------------------------------------------------
create table benchmark_aggregates (
  id uuid primary key default gen_random_uuid(),
  assessment_type_id text not null references assessment_types(id),
  role_id text references roles(id),
  segment_type text not null check (segment_type in ('overall', 'country', 'company_type', 'industry')),
  segment_value text not null,
  submission_count int not null default 0,
  score_sum bigint not null default 0,
  score_buckets jsonb not null default '[]',
  percentile_data jsonb not null default '{}',
  updated_at timestamptz default now(),
  unique (assessment_type_id, role_id, segment_type, segment_value)
);

create index benchmark_lookup_idx on benchmark_aggregates (assessment_type_id, segment_type, segment_value)
  include (submission_count, percentile_data);

-- 8. Admin Sessions
-- ------------------------------------------------------------
create table admin_sessions (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  created_at timestamptz default now(),
  expires_at timestamptz not null
);

create index admin_sessions_expires_idx on admin_sessions (expires_at);

-- ============================================================
-- Helper functions for benchmark trigger
-- ============================================================

-- Update histogram buckets
create or replace function update_score_buckets(
  buckets jsonb, score_pct int, bucket_size int
) returns jsonb
language plpgsql immutable
as $$
declare
  bucket_min int := (score_pct / bucket_size) * bucket_size;
  bucket_max int := bucket_min + bucket_size;
  found boolean := false;
  result jsonb := '[]'::jsonb;
  elem jsonb;
begin
  for elem in select * from jsonb_array_elements(buckets) loop
    if (elem->>'min')::int = bucket_min then
      result := result || jsonb_build_array(
        jsonb_build_object('min', bucket_min, 'max', bucket_max, 'count', (elem->>'count')::int + 1)
      );
      found := true;
    else
      result := result || jsonb_build_array(elem);
    end if;
  end loop;

  if not found then
    result := result || jsonb_build_array(
      jsonb_build_object('min', bucket_min, 'max', bucket_max, 'count', 1)
    );
  end if;

  return result;
end;
$$;

-- Compute percentile data from histogram buckets
create or replace function compute_percentile_data(
  buckets jsonb, total_count int, bucket_size int
) returns jsonb
language plpgsql immutable
as $$
declare
  sorted_buckets jsonb;
  percentiles int[] := array[10, 25, 50, 75, 90];
  result jsonb := '{}'::jsonb;
  p int;
  target_count numeric;
  running_count int;
  elem jsonb;
begin
  select jsonb_agg(b order by (b->>'min')::int)
  into sorted_buckets
  from jsonb_array_elements(buckets) as b;

  if sorted_buckets is null then
    return result;
  end if;

  foreach p in array percentiles loop
    target_count := total_count * (p::numeric / 100.0);
    running_count := 0;

    for elem in select * from jsonb_array_elements(sorted_buckets) loop
      running_count := running_count + (elem->>'count')::int;
      if running_count >= target_count then
        result := result || jsonb_build_object(
          'p' || p,
          ((elem->>'min')::int + (elem->>'max')::int) / 2
        );
        exit;
      end if;
    end loop;
  end loop;

  return result;
end;
$$;

-- ============================================================
-- Benchmark trigger function
-- ============================================================
create or replace function update_benchmark_aggregates()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  score_pct int;
  bucket_size constant int := 5;
  segments text[][] := array[
    array['overall', '_all'],
    array['country', coalesce(new.country, '_skip')],
    array['company_type', coalesce(new.company_type, '_skip')],
    array['industry', coalesce(new.industry, '_skip')]
  ];
  seg text[];
  new_buckets jsonb;
  new_count int;
begin
  score_pct := case when new.max_score > 0
    then round((new.total_score::numeric / new.max_score) * 100)
    else 0 end;

  foreach seg slice 1 in array segments loop
    -- Skip segments where user didn't provide demographics
    if seg[2] = '_skip' then continue; end if;

    insert into public.benchmark_aggregates (
      assessment_type_id, role_id, segment_type, segment_value,
      submission_count, score_sum, score_buckets, percentile_data
    ) values (
      new.assessment_type_id, new.role_id, seg[1], seg[2],
      1, score_pct,
      jsonb_build_array(jsonb_build_object(
        'min', (score_pct / bucket_size) * bucket_size,
        'max', ((score_pct / bucket_size) + 1) * bucket_size,
        'count', 1
      )),
      '{}'::jsonb
    )
    on conflict (assessment_type_id, role_id, segment_type, segment_value)
    do update set
      submission_count = public.benchmark_aggregates.submission_count + 1,
      score_sum = public.benchmark_aggregates.score_sum + score_pct,
      score_buckets = public.update_score_buckets(
        public.benchmark_aggregates.score_buckets, score_pct, bucket_size
      ),
      percentile_data = public.compute_percentile_data(
        public.update_score_buckets(
          public.benchmark_aggregates.score_buckets, score_pct, bucket_size
        ),
        public.benchmark_aggregates.submission_count + 1,
        bucket_size
      ),
      updated_at = now();
  end loop;

  return new;
end;
$$;

create trigger on_submission_insert
  after insert on submissions
  for each row
  execute function update_benchmark_aggregates();

-- ============================================================
-- Auto-update updated_at
-- ============================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger questions_updated_at
  before update on questions
  for each row execute function set_updated_at();

create trigger roles_updated_at
  before update on roles
  for each row execute function set_updated_at();

create trigger assessment_types_updated_at
  before update on assessment_types
  for each row execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table assessment_types enable row level security;
alter table dimensions enable row level security;
alter table roles enable row level security;
alter table questions enable row level security;
alter table submissions enable row level security;
alter table submission_answers enable row level security;
alter table benchmark_aggregates enable row level security;
alter table admin_sessions enable row level security;

-- Public read access (anon key)
create policy "Public can read active assessment types"
  on assessment_types for select to anon
  using (is_active = true);

create policy "Public can read dimensions"
  on dimensions for select to anon
  using (true);

create policy "Public can read active roles"
  on roles for select to anon
  using (is_active = true);

create policy "Public can read active questions"
  on questions for select to anon
  using (is_active = true);

create policy "Public can read benchmark aggregates"
  on benchmark_aggregates for select to anon
  using (true);

-- Public write access (anon key — insert only)
create policy "Public can insert submissions"
  on submissions for insert to anon
  with check (true);

create policy "Public can insert answers"
  on submission_answers for insert to anon
  with check (true);

-- No select policy on submissions/submission_answers for anon = blocked
-- Admin uses service_role key which bypasses RLS
