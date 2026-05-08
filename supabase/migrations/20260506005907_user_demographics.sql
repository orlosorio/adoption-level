-- ============================================================================
-- Demographics move from per-attempt to per-user.
-- New: public.user_demographics (EAV at the user level), filled at signup.
-- New: public.quiz_attempts.demographics_snapshot jsonb — frozen demographics
-- captured at submit time so historical benchmarks stay stable when a user
-- later edits their profile.
-- Drop: public.quiz_attempt_demographics (empty in prod, no migration needed).
-- ============================================================================

create table public.user_demographics (
  user_id uuid not null references auth.users(id) on delete cascade,
  field_id uuid not null references public.demographic_fields(id) on delete cascade,
  option_id uuid references public.demographic_options(id) on delete set null,
  text_value text,
  numeric_value numeric,
  updated_at timestamptz not null default now(),
  primary key (user_id, field_id)
);

create index user_demographics_field_idx on public.user_demographics(field_id);

alter table public.user_demographics enable row level security;

create policy "user_demographics_select_own" on public.user_demographics
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "user_demographics_insert_own" on public.user_demographics
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "user_demographics_update_own" on public.user_demographics
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "user_demographics_delete_own" on public.user_demographics
  for delete to authenticated using ((select auth.uid()) = user_id);

create trigger user_demographics_set_updated_at
  before update on public.user_demographics
  for each row execute function public.set_updated_at();

-- Snapshot column on attempts. JSON shape:
--   [{ "field_id": uuid, "option_id": uuid|null,
--      "text_value": text|null, "numeric_value": numeric|null }, ...]
-- Populated by submit_attempt from user_demographics at the moment of submit.
alter table public.quiz_attempts
  add column demographics_snapshot jsonb;

-- Drop the old per-attempt EAV table. quiz_attempt_demographics is empty —
-- nothing to migrate. RLS policy on it is dropped via cascade.
drop table public.quiz_attempt_demographics;
