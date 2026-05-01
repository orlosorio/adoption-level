'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import { SEED_BENCHMARK } from '@/lib/benchmarkMock';
import BenchmarkPanel, { benchmarkStyles } from './benchmark-panel';

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
    <div className={benchmarkStyles.teaserWrapper}>
      {/* Blurred benchmark preview */}
      <div className={benchmarkStyles.teaserBlur} aria-hidden>
        <BenchmarkPanel language={language} data={SEED_BENCHMARK} labels={mockLabels} />
      </div>

      {/* Lock overlay */}
      <div className={benchmarkStyles.teaserOverlay}>
        <div className={benchmarkStyles.teaserLockIcon}>🔒</div>
        <p className={benchmarkStyles.teaserLockTitle}>{copy.teaserLockLabel}</p>
        <p className={benchmarkStyles.teaserLockSub}>{copy.teaserLockSub}</p>
      </div>

      {/* CTA section below */}
      <div className={benchmarkStyles.teaserCtaSection}>
        <p className="font-sans text-[16px] font-bold text-[#1f36a9] sm:text-[18px]">
          {copy.teaserHeading}
        </p>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#4d5b9a] sm:text-[14px]">
          {copy.teaserBody}
        </p>
        <button type="button" onClick={onUnlock} className={`${benchmarkStyles.teaserCta} mt-5`}>
          {copy.teaserCta}
        </button>
        <button type="button" onClick={onSkip} className={`${benchmarkStyles.teaserSkip} mt-3`}>
          {copy.teaserSkip}
        </button>
      </div>
    </div>
  );
}
