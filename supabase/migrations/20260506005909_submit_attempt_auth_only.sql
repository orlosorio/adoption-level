-- ============================================================================
-- submit_attempt: tighten to authenticated-only writes and snapshot demographics
-- from public.user_demographics into the new quiz_attempts.demographics_snapshot
-- column. The signature drops `p_demographics` (per-attempt EAV is gone) and
-- the `p_anon_token` / `p_email` / `p_email_consent` / `p_session_id` knobs
-- (auth-only flows don't need them).
-- ============================================================================

-- Drop the old function signature so we can change params cleanly.
drop function if exists public.submit_attempt(uuid, text, uuid, jsonb, jsonb, text, boolean, text);

create function public.submit_attempt(
  p_quiz_id uuid,
  p_locale text,
  p_responses jsonb
)
returns table (attempt_id uuid, score int, max_score int, score_pct numeric)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_attempt_id uuid;
  v_score int := 0;
  v_max_score int := 0;
  v_response_count int;
  v_question_count int;
  v_snapshot jsonb;
begin
  if v_uid is null then
    raise exception 'authentication required to submit an attempt';
  end if;

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

  -- Response set must match the active question set exactly.
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

  -- Freeze the user's demographics at submit time so historical benchmarks
  -- stay stable when the user later edits their profile.
  select coalesce(
    jsonb_agg(jsonb_build_object(
      'field_id', ud.field_id,
      'option_id', ud.option_id,
      'text_value', ud.text_value,
      'numeric_value', ud.numeric_value
    )),
    '[]'::jsonb
  )
  into v_snapshot
  from public.user_demographics ud
  where ud.user_id = v_uid;

  insert into public.quiz_attempts (
    quiz_id, user_id, locale, is_complete, completed_at, demographics_snapshot
  ) values (
    p_quiz_id, v_uid, p_locale, true, now(), v_snapshot
  )
  returning id into v_attempt_id;

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

  return query
    select v_attempt_id, v_score, v_max_score,
      case when v_max_score = 0 then 0::numeric
           else (v_score::numeric / v_max_score) * 100 end;
end;
$$;

revoke all on function public.submit_attempt(uuid, text, jsonb) from public;
revoke execute on function public.submit_attempt(uuid, text, jsonb) from anon;
grant execute on function public.submit_attempt(uuid, text, jsonb) to authenticated;
