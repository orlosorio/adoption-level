import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Language } from '@/lib/content';
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
  const copy = getQuizCopy(slug, 'en');
  return {
    title: `${copy.title} | Accionables`,
    description: copy.subtitle ?? copy.title,
    robots: { index: false, follow: false },
  };
}

export default async function AssessmentSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language: Language = lang === 'en' ? 'en' : 'es';

  const quiz = await getQuizBySlug(slug, language);
  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} language={language} />;
}
