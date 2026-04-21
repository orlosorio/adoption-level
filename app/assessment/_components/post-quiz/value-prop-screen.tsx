'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import styles from './value-prop-screen.module.css';

interface ValuePropScreenProps {
  language: Language;
  onContinue: () => void;
  onSkip: () => void;
}

export default function ValuePropScreen({ language, onContinue, onSkip }: ValuePropScreenProps) {
  const copy = UI.valueProp[language];

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[520px] text-center">
        <h2 className="font-sans text-xl font-bold text-[#1f36a9] sm:text-2xl">{copy.heading}</h2>
        <p className="mt-3 font-sans text-[15px] font-semibold text-[#1f36a9]/70">{copy.sub1}</p>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#4d5b9a]">{copy.sub2}</p>

        <div className="mt-6 space-y-2.5 sm:mt-8">
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden>
              📧
            </span>
            <div>
              <p className={styles.title}>{copy.card1Title}</p>
              <p className={styles.desc}>{copy.card1Desc}</p>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden>
              📊
            </span>
            <div>
              <p className={styles.title}>{copy.card2Title}</p>
              <p className={styles.desc}>{copy.card2Desc}</p>
            </div>
          </div>
        </div>

        <button type="button" onClick={onContinue} className={`${styles.cta} mt-6 sm:mt-8`}>
          {copy.cta}
        </button>

        <button type="button" onClick={onSkip} className={`${styles.skip} mt-4`}>
          {copy.skip}
        </button>

        <p className={`${styles.liveCounter} mt-4`}>{copy.liveCounter(1247)}</p>
      </div>
    </div>
  );
}

export { styles as valuePropStyles };
