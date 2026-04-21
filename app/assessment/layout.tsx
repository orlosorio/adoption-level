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
      <a
        href="/about"
        className="fixed top-5 right-5 z-50 cursor-pointer rounded-lg border border-white/25 bg-white/[0.12] px-3.5 py-2 font-mono text-[11px] font-normal tracking-[0.08em] text-[rgba(31,54,169,0.5)] uppercase no-underline transition-[background,color] duration-200 hover:bg-white/70 hover:text-[#1f36a9] max-sm:top-auto max-sm:right-2 max-sm:bottom-2 max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[10px] max-sm:opacity-50"
      >
        About &middot; Sobre
      </a>
      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-1 flex-col">
        {children}
      </div>
      <FomoCounter />
    </div>
  );
}
