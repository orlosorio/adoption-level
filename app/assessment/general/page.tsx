import type { Metadata } from 'next';
import type { Language } from '@/lib/content';
import GeneralQuiz from './_components/general-quiz';

export const metadata: Metadata = {
  title: 'General AI Assessment | Accionables',
  description: '15 yes/no questions to discover your real AI adoption level at work.',
  robots: { index: false, follow: false },
};

export default async function GeneralPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const language: Language = lang === 'en' ? 'en' : 'es';
  return <GeneralQuiz initialLanguage={language} />;
}
