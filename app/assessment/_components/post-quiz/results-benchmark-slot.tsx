'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { useUser } from '@/lib/auth/use-user';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { createClient } from '@/lib/supabase/client';
import { loadSavedAttemptId, persistSavedAttemptId } from '@/lib/sessionState';
import BenchmarkPanel, { benchmarkStyles, type BenchmarkRow } from './benchmark-panel';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface ResultsBenchmarkSlotProps {
  quizId: string;
  responses: { question_id: string; value: number }[];
  score: number;
  maxScore: number;
}

interface RealBenchmark {
  totalRespondents: number;
  rows: BenchmarkRow[];
}

// Linear-interpolation estimate of where userPct sits in the slice's
// distribution given the p25/p50/p75 markers from quiz_insights.
function estimatePercentile(userPct: number, p25: number, p50: number, p75: number): number {
  if (userPct <= p25) return Math.max(0, Math.round((userPct / Math.max(p25, 1)) * 25));
  if (userPct <= p50) return Math.round(25 + ((userPct - p25) / Math.max(p50 - p25, 1)) * 25);
  if (userPct <= p75) return Math.round(50 + ((userPct - p50) / Math.max(p75 - p50, 1)) * 25);
  return Math.min(100, Math.round(75 + ((userPct - p75) / Math.max(100 - p75, 1)) * 25));
}

async function loadBenchmark(
  supabase: ReturnType<typeof createClient>,
  quizId: string,
  userId: string,
  userPct: number,
  locale: Locale,
  formatBenchmarkRow: (pct: number, segment: string) => string,
  overallLabel: string,
): Promise<RealBenchmark | null> {
  // Pull the user's per-field demographics so we know which insight slices
  // apply. Anonymous users (no userId) only get the overall slice.
  const { data: ud } = await supabase
    .from('user_demographics')
    .select('field_id, option_id, demographic_fields!inner(slug)')
    .eq('user_id', userId);

  const userPairs = new Set<string>(
    (ud ?? []).filter((r) => r.option_id).map((r) => `${r.field_id}::${r.option_id}`),
  );

  const { data: insights } = await supabase
    .from('quiz_insights')
    .select(
      `sample_size, avg_score, p25, p50, p75,
       segment_field_id, segment_option_id,
       field:demographic_fields!quiz_insights_segment_field_id_fkey(slug,
         demographic_field_translations!inner(label, locale)),
       option:demographic_options!quiz_insights_segment_option_id_fkey(slug,
         demographic_option_translations!inner(label, locale))`,
    )
    .eq('quiz_id', quizId)
    .eq('field.demographic_field_translations.locale', locale)
    .eq('option.demographic_option_translations.locale', locale);

  if (!insights) return null;

  let totalRespondents = 0;
  const rows: BenchmarkRow[] = [];

  for (const row of insights) {
    if (row.segment_field_id == null && row.segment_option_id == null) {
      // Overall row.
      totalRespondents = row.sample_size ?? 0;
      const pct = estimatePercentile(
        userPct,
        Number(row.p25 ?? 0),
        Number(row.p50 ?? 0),
        Number(row.p75 ?? 0),
      );
      rows.unshift({
        label: overallLabel,
        statement: formatBenchmarkRow(pct, ''),
        percentile: pct,
      });
      continue;
    }

    const key = `${row.segment_field_id}::${row.segment_option_id}`;
    if (!userPairs.has(key)) continue;

    const field = Array.isArray(row.field) ? row.field[0] : row.field;
    const option = Array.isArray(row.option) ? row.option[0] : row.option;
    const fieldTr = field
      ? Array.isArray(field.demographic_field_translations)
        ? field.demographic_field_translations[0]
        : field.demographic_field_translations
      : null;
    const optionTr = option
      ? Array.isArray(option.demographic_option_translations)
        ? option.demographic_option_translations[0]
        : option.demographic_option_translations
      : null;

    const fieldLabel = fieldTr?.label ?? field?.slug ?? '';
    const optionLabel = optionTr?.label ?? option?.slug ?? '';
    const pct = estimatePercentile(
      userPct,
      Number(row.p25 ?? 0),
      Number(row.p50 ?? 0),
      Number(row.p75 ?? 0),
    );

    rows.push({
      label: `${fieldLabel} · ${optionLabel}`,
      statement: formatBenchmarkRow(pct, optionLabel),
      percentile: pct,
    });
  }

  return { totalRespondents, rows };
}

export default function ResultsBenchmarkSlot({
  quizId,
  responses,
  score,
  maxScore,
}: ResultsBenchmarkSlotProps) {
  const locale = useLocale() as Locale;
  const tBenchmark = useTranslations('benchmark');
  const tSave = useTranslations('saveAndBenchmark');
  const tResults = useTranslations('results');
  const { user, isLoading } = useUser();
  const openAuthModal = useAuthModal((s) => s.open);

  const [status, setStatus] = useState<SaveStatus>('idle');
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [benchmark, setBenchmark] = useState<RealBenchmark | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const existing = loadSavedAttemptId();
    if (existing) {
      setAttemptId(existing);
      setStatus('saved');
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;
    if (status !== 'idle') return;

    setStatus('saving');
    const supabase = createClient();
    supabase
      .rpc('submit_attempt', {
        p_quiz_id: quizId,
        p_locale: locale,
        p_responses: responses,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error('[submit_attempt] failed', error);
          setStatus('error');
          return;
        }
        const id = data?.[0]?.attempt_id ?? null;
        setAttemptId(id);
        if (id) persistSavedAttemptId(id);
        setStatus('saved');
      });
  }, [user, isLoading, status, quizId, locale, responses]);

  // Once submitted, fetch the precomputed insights for this user's slices.
  useEffect(() => {
    if (status !== 'saved' || !user) return;
    const supabase = createClient();
    const userPct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const formatRow = (pct: number, segment: string) =>
      tBenchmark('percentileText', { pct, segment });
    void loadBenchmark(
      supabase,
      quizId,
      user.id,
      userPct,
      locale,
      formatRow,
      tBenchmark('overallLabel'),
    ).then(setBenchmark);
  }, [status, user, quizId, score, maxScore, locale, tBenchmark]);

  async function handleEmailMe() {
    if (!attemptId || !benchmark) return;
    setEmailStatus('sending');
    const supabase = createClient();
    const { error } = await supabase.functions.invoke('send-result-email', {
      body: {
        attempt_id: attemptId,
        benchmark: {
          totalRespondents: benchmark.totalRespondents,
          rows: benchmark.rows,
        },
      },
    });
    if (error) {
      // FunctionsHttpError swallows the body — pull it off the underlying Response.
      const ctx = (error as { context?: Response }).context;
      let detail: unknown = null;
      if (ctx && typeof ctx.text === 'function') {
        try {
          const raw = await ctx.text();
          try {
            detail = JSON.parse(raw);
          } catch {
            detail = raw;
          }
        } catch {
          /* noop */
        }
      }
      console.error('[send-result-email] failed', {
        message: (error as Error).message,
        status: ctx?.status,
        detail,
      });
      setEmailStatus('error');
      return;
    }
    setEmailStatus('sent');
  }

  if (isLoading) return null;

  if (!user && status === 'idle') {
    return (
      <div className={benchmarkStyles.panel}>
        <p className={benchmarkStyles.heading}>🔒 {tSave('signInCtaTitle')}</p>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#4d5b9a]">
          {tSave('signInCtaBody')}
        </p>
        <button
          type="button"
          onClick={() => openAuthModal('login')}
          className={`${benchmarkStyles.teaserCta} mt-5`}
        >
          {tSave('signInCtaButton')}
        </button>
      </div>
    );
  }

  if (user && status === 'saving') {
    return (
      <div className="flex items-center justify-center py-8">
        <div className={benchmarkStyles.spinner} />
        <p className="ml-3 font-sans text-[15px] font-semibold text-[#1f36a9]">{tSave('saving')}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={benchmarkStyles.panel}>
        <p className="font-sans text-[15px] text-[#b3261e]">{tSave('error')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={`${benchmarkStyles.teaserCta} mt-3`}
        >
          {tSave('retry')}
        </button>
      </div>
    );
  }

  // status === 'saved' — show benchmark (or a minimal fallback) + email button.
  const rows = benchmark?.rows ?? [];
  const total = benchmark?.totalRespondents ?? 0;

  return (
    <div className="flex flex-col gap-3">
      {benchmark === null ? (
        <div className="flex items-center justify-center py-6">
          <div className={benchmarkStyles.spinner} />
        </div>
      ) : (
        <BenchmarkPanel totalRespondents={total} rows={rows} />
      )}
      <button
        type="button"
        className={benchmarkStyles.teaserCta}
        onClick={handleEmailMe}
        disabled={!attemptId || !benchmark || emailStatus === 'sending' || emailStatus === 'sent'}
      >
        {emailStatus === 'sending'
          ? tResults('emailMeSending')
          : emailStatus === 'sent'
            ? tResults('emailMeSent')
            : emailStatus === 'error'
              ? tResults('emailMeError')
              : tResults('emailMeButton')}
      </button>
    </div>
  );
}
