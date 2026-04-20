'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import { SEED_BENCHMARK } from '@/lib/benchmarkMock';
import BenchmarkPanel from './BenchmarkPanel';

interface BenchmarkTeaserProps {
  language: Language;
  onUnlock: () => void;
  onSkip: () => void;
}

export default function BenchmarkTeaser({ language, onUnlock, onSkip }: BenchmarkTeaserProps) {
  const copy = UI.benchmark[language];

  const mockLabels = {
    country: language === 'es' ? 'México' : 'Mexico',
    companyType: language === 'es' ? 'Startup' : 'Startup',
    industry: language === 'es' ? 'SaaS / Software' : 'SaaS / Software',
  };

  return (
    <div className="bench-teaser-wrapper">
      {/* Blurred benchmark preview */}
      <div className="bench-teaser-blur" aria-hidden>
        <BenchmarkPanel language={language} data={SEED_BENCHMARK} labels={mockLabels} />
      </div>

      {/* Lock overlay */}
      <div className="bench-teaser-overlay">
        <div className="bench-teaser-lock-icon">🔒</div>
        <p className="bench-teaser-lock-title">{copy.teaserLockLabel}</p>
        <p className="bench-teaser-lock-sub">{copy.teaserLockSub}</p>
      </div>

      {/* CTA section below */}
      <div className="bench-teaser-cta-section">
        <p className="font-sans text-[16px] font-bold text-[#1f36a9] sm:text-[18px]">
          {copy.teaserHeading}
        </p>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#4d5b9a] sm:text-[14px]">
          {copy.teaserBody}
        </p>
        <button type="button" onClick={onUnlock} className="bench-teaser-cta mt-5">
          {copy.teaserCta}
        </button>
        <button type="button" onClick={onSkip} className="bench-teaser-skip mt-3">
          {copy.teaserSkip}
        </button>
      </div>
    </div>
  );
}
