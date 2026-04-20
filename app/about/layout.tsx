import type { Metadata } from 'next';
import BackgroundScene from '@/components/BackgroundScene';

export const metadata: Metadata = {
  title: 'About this Survey | Accionables AI Adoption Assessment',
  description:
    'Why we built the global AI adoption self-assessment — and why understanding your real adoption level matters right now.',
  openGraph: {
    title: "Something Big Is Happening. Most People Don't Know Yet.",
    description:
      'The global AI adoption survey that shows you where you actually stand — and what the people ahead of you are already doing.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="assessment-shell about-grid-bg flex min-h-dvh flex-col px-4 py-[clamp(0.5rem,1.5vh,2rem)] sm:px-6">
      <BackgroundScene />
      <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-1 flex-col lg:max-w-[1020px]">
        {children}
      </div>
    </div>
  );
}
