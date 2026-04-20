'use client';

import { useRouter } from 'next/navigation';

interface StickyAssessmentBarProps {
  lang: 'en' | 'es';
}

const COPY = {
  en: {
    text: 'Ready to find out your real AI adoption level?',
    button: 'Take the free assessment \u2192',
  },
  es: {
    text: '\u00bfListo para saber tu nivel real de adopci\u00f3n de IA?',
    button: 'Tomar el assessment gratuito \u2192',
  },
} as const;

export default function StickyAssessmentBar({ lang }: StickyAssessmentBarProps) {
  const router = useRouter();
  const copy = COPY[lang];

  return (
    <div className="about-sticky-bar">
      <p className="about-sticky-text">{copy.text}</p>
      <button type="button" onClick={() => router.push('/assessment')} className="about-sticky-btn">
        {copy.button}
      </button>
    </div>
  );
}
