import type { Metadata } from 'next';
import BackgroundScene from '@/components/layout/background-scene';
import FomoCounter from './_components/fomo-counter';
import AssessmentNav from './_components/assessment-nav';

export const metadata: Metadata = {
  title: 'AI Adoption Self-Assessment | Accionables',
  description:
    'Discover your real AI adoption level at work. Free quiz available in Spanish and English.',
  openGraph: {
    title: 'AI Adoption Self-Assessment | Accionables',
    description:
      'Discover your real AI adoption level at work. Free quiz available in Spanish and English.',
  },
};

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="assessment-shell quiz-grid-bg flex min-h-dvh flex-col px-4 py-[clamp(0.5rem,1.5vh,2rem)] sm:px-6">
      <BackgroundScene />
      <AssessmentNav />
      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-1 flex-col">
        {children}
      </div>
      <FomoCounter />
    </div>
  );
}
