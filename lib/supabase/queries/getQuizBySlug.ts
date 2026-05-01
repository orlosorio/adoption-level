import 'server-only';
import { unstable_cache as nextCache } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/database.types';
import type { Language } from '@/lib/content';

// Build-time / no-cookie client for static reads (generateStaticParams, ISR).
function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  );
}

export interface QuizDef {
  id: string;
  slug: string;
  locale: Language;
  tiers: Array<{ id: string; ordinal: number; shortLabel: string }>;
  questions: Array<{
    id: string;
    sortOrder: number;
    weight: number;
    statement: string;
    helpText: string | null;
    tier: { ordinal: number; shortLabel: string } | null;
  }>;
  resultBands: Array<{
    ordinal: number;
    shortLabel: string | null;
    description: string;
    nextStep: string;
  }>;
}

async function fetchQuiz(slug: string, locale: Language): Promise<QuizDef | null> {
  const supabase = createPublicClient();

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id, slug')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (!quiz) return null;

  const [tiersRes, questionsRes, bandsRes] = await Promise.all([
    supabase
      .from('question_tiers')
      .select('id, ordinal, sort_order, question_tier_translations!inner(short_label, locale)')
      .eq('quiz_id', quiz.id)
      .eq('question_tier_translations.locale', locale)
      .order('sort_order', { ascending: true }),
    supabase
      .from('questions')
      .select(
        'id, sort_order, weight, tier_id, question_translations!inner(statement, help_text, locale)',
      )
      .eq('quiz_id', quiz.id)
      .eq('is_active', true)
      .eq('question_translations.locale', locale)
      .order('sort_order', { ascending: true }),
    supabase
      .from('result_band_copies')
      .select('ordinal, short_label, description, next_step')
      .eq('quiz_id', quiz.id)
      .eq('locale', locale)
      .order('ordinal', { ascending: true }),
  ]);

  if (tiersRes.error || questionsRes.error || bandsRes.error) return null;

  const tiers = (tiersRes.data ?? []).map((t) => {
    const tr = Array.isArray(t.question_tier_translations)
      ? t.question_tier_translations[0]
      : t.question_tier_translations;
    return {
      id: t.id,
      ordinal: t.ordinal,
      shortLabel: tr?.short_label ?? '',
    };
  });
  const tiersById = new Map(tiers.map((t) => [t.id, t]));

  const questions = (questionsRes.data ?? []).map((q) => {
    const qt = Array.isArray(q.question_translations)
      ? q.question_translations[0]
      : q.question_translations;
    const tier = q.tier_id ? (tiersById.get(q.tier_id) ?? null) : null;
    return {
      id: q.id,
      sortOrder: q.sort_order,
      weight: Number(q.weight),
      statement: qt?.statement ?? '',
      helpText: qt?.help_text ?? null,
      tier: tier ? { ordinal: tier.ordinal, shortLabel: tier.shortLabel } : null,
    };
  });

  return {
    id: quiz.id,
    slug: quiz.slug,
    locale,
    tiers,
    questions,
    resultBands: (bandsRes.data ?? []).map((b) => ({
      ordinal: b.ordinal,
      shortLabel: b.short_label,
      description: b.description,
      nextStep: b.next_step,
    })),
  };
}

export const getQuizBySlug = nextCache(
  async (slug: string, locale: Language) => fetchQuiz(slug, locale),
  ['quiz-by-slug'],
  { revalidate: 3600, tags: ['quizzes'] },
);

export async function getActiveQuizSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from('quizzes').select('slug').eq('is_active', true);
  return (data ?? []).map((r) => r.slug);
}
