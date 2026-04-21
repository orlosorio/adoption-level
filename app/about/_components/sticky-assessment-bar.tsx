'use client';

import { useRouter } from 'next/navigation';

interface StickyAssessmentBarProps {
  lang: 'en' | 'es';
}

const COPY = {
  en: {
    text: 'Ready to find out your real AI adoption level?',
    button: 'Take the free assessment →',
  },
  es: {
    text: '¿Listo para saber tu nivel real de adopción de IA?',
    button: 'Tomar el assessment gratuito →',
  },
} as const;

export default function StickyAssessmentBar({ lang }: StickyAssessmentBarProps) {
  const router = useRouter();
  const copy = COPY[lang];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] flex items-center justify-center gap-4 border-t border-white/45 bg-white/25 px-6 py-4 backdrop-blur-[16px] backdrop-saturate-[1.6] max-sm:flex-col max-sm:gap-3 max-sm:px-5 max-sm:py-3.5 max-sm:text-center lg:hidden">
      <p className="text-brand-700 font-sans text-[15px] font-medium max-sm:text-sm">{copy.text}</p>
      <button
        type="button"
        onClick={() => router.push('/assessment')}
        className="bg-brand-700 hover:bg-brand-600 shrink-0 cursor-pointer rounded-lg border border-[rgba(31,54,169,0.2)] px-5 py-2.5 font-sans text-sm font-semibold whitespace-nowrap text-white transition-[background,box-shadow] duration-200 hover:shadow-[0_4px_16px_rgba(31,54,169,0.2)] max-sm:w-full"
      >
        {copy.button}
      </button>
    </div>
  );
}
