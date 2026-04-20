'use client';

import { useEffect, useState } from 'react';

const COPY = {
  es: {
    live: 'EN VIVO',
    sub1: 'de los profesionales usa IA como verdadero experto.',
    sub2: '¿Eres uno de ellos?',
  },
  en: {
    live: 'LIVE',
    sub1: 'of professionals are using AI at an expert level.',
    sub2: 'Are you one of them?',
  },
} as const;

export default function FomoCounter({ language = 'en' }: { language?: 'es' | 'en' }) {
  const [ticks, setTicks] = useState(0);
  const copy = COPY[language];

  useEffect(() => {
    const id = setInterval(() => setTicks((t) => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const value = (1 + ticks * 0.00001).toFixed(5);

  return (
    <section className="fomo-counter" aria-label="AI expert adoption counter">
      <div className="fomo-inner">
        <div className="fomo-left">
          <p className="fomo-live-label">
            <span className="fomo-live-dot" />
            {copy.live}
          </p>
          <p className="fomo-number" role="timer">
            {value}
            <span className="fomo-percent">%</span>
          </p>
        </div>
        <p className="fomo-subtitle">
          {copy.sub1}
          <br />
          <em>{copy.sub2}</em>
        </p>
      </div>
    </section>
  );
}
