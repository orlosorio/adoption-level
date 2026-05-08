-- ============================================================================
-- Precompute quiz_insights synchronously after every completed submit.
--
--   recompute_quiz_insights(p_quiz_id) wipes all rows for that quiz and
--   reinserts:
--     - one overall row (segment_field_id null, segment_option_id null)
--     - one row per (field_id, option_id) used in any attempt's snapshot
--   p25/p50/p75 via percentile_cont, avg via avg(score_pct).
--
--   trg_recompute_quiz_insights fires AFTER INSERT on quiz_attempts when
--   is_complete = true and runs recompute_quiz_insights(new.quiz_id).
--
-- claim_attempt is dropped — auth-only flows make it dead code.
-- ============================================================================

-- Index to make the per-quiz aggregate fast.
create index if not exists quiz_attempts_quiz_complete_idx
  on public.quiz_attempts(quiz_id) where is_complete;

create or replace function public.recompute_quiz_insights(p_quiz_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.quiz_insights where quiz_id = p_quiz_id;

  -- Overall slice: every completed attempt for this quiz.
  insert into public.quiz_insights (
    quiz_id, segment_field_id, segment_option_id, band_ordinal,
    sample_size, avg_score, p25, p50, p75
  )
  select
    p_quiz_id,
    null::uuid,
    null::uuid,
    null::smallint,
    count(*),
    avg(score_pct),
    percentile_cont(0.25) within group (order by score_pct),
    percentile_cont(0.50) within group (order by score_pct),
    percentile_cont(0.75) within group (order by score_pct)
  from public.quiz_attempts
  where quiz_id = p_quiz_id and is_complete
  having count(*) > 0;

  -- Per-(field, option) slices, derived from each attempt's frozen snapshot.
  -- The WHERE clause already excludes null/empty option_ids, so the SELECT
  -- and GROUP BY expressions can be byte-identical (Postgres requires that
  -- to satisfy 42803 — `nullif(...)` in the SELECT would not match the bare
  -- `(d->>'option_id')::uuid` in GROUP BY).
  insert into public.quiz_insights (
    quiz_id, segment_field_id, segment_option_id, band_ordinal,
    sample_size, avg_score, p25, p50, p75
  )
  select
    p_quiz_id,
    (d->>'field_id')::uuid,
    (d->>'option_id')::uuid,
    null::smallint,
    count(*),
    avg(a.score_pct),
    percentile_cont(0.25) within group (order by a.score_pct),
    percentile_cont(0.50) within group (order by a.score_pct),
    percentile_cont(0.75) within group (order by a.score_pct)
  from public.quiz_attempts a
  cross join lateral jsonb_array_elements(coalesce(a.demographics_snapshot, '[]'::jsonb)) d
  where a.quiz_id = p_quiz_id
    and a.is_complete
    and (d->>'field_id') is not null
    and (d->>'option_id') is not null
    and (d->>'option_id') <> ''
  group by (d->>'field_id')::uuid, (d->>'option_id')::uuid
  having count(*) > 0;
end;
$$;

revoke all on function public.recompute_quiz_insights(uuid) from public;
-- Trigger calls this with definer rights; no app-facing grants needed.

create or replace function public.trg_recompute_quiz_insights()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.recompute_quiz_insights(new.quiz_id);
  return null;
end;
$$;

drop trigger if exists quiz_attempts_recompute_insights on public.quiz_attempts;
create trigger quiz_attempts_recompute_insights
  after insert on public.quiz_attempts
  for each row when (new.is_complete)
  execute function public.trg_recompute_quiz_insights();

-- claim_attempt is dead under auth-only submits.
drop function if exists public.claim_attempt(uuid);
