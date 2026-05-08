import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getActiveQuizSlugs, getQuizBySlug } from '@/lib/supabase/queries/getQuizBySlug';
import { getQuizCopy } from '@/lib/quizCopy';
import QuizRunner from '@/app/assessment/_components/quiz-runner';

export async function generateStaticParams() {
  const slugs = await getActiveQuizSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const copy = getQuizCopy(slug, locale);
  return {
    title: `${copy.title} | Accionables`,
    description: copy.subtitle ?? copy.title,
    robots: { index: false, follow: false },
  };
}

export default async function AssessmentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;

  const quiz = await getQuizBySlug(slug, locale);
  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} />;
}
