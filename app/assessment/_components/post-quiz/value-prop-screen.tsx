'use client';

import { useTranslations } from 'next-intl';
import styles from './value-prop-screen.module.css';

interface ValuePropScreenProps {
  onContinue: () => void;
  onSkip: () => void;
}

export default function ValuePropScreen({ onContinue, onSkip }: ValuePropScreenProps) {
  const t = useTranslations('valueProp');

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[520px] text-center">
        <h2 className="font-sans text-xl font-bold text-[#1f36a9] sm:text-2xl">{t('heading')}</h2>
        <p className="mt-3 font-sans text-[15px] font-semibold text-[#1f36a9]/70">{t('sub1')}</p>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#4d5b9a]">{t('sub2')}</p>

        <div className="mt-6 space-y-2.5 sm:mt-8">
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden>
              📧
            </span>
            <div>
              <p className={styles.title}>{t('card1Title')}</p>
              <p className={styles.desc}>{t('card1Desc')}</p>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden>
              📊
            </span>
            <div>
              <p className={styles.title}>{t('card2Title')}</p>
              <p className={styles.desc}>{t('card2Desc')}</p>
            </div>
          </div>
        </div>

        <button type="button" onClick={onContinue} className={`${styles.cta} mt-6 sm:mt-8`}>
          {t('cta')}
        </button>

        <button type="button" onClick={onSkip} className={`${styles.skip} mt-4`}>
          {t('skip')}
        </button>

        <p className={`${styles.liveCounter} mt-4`}>{t('liveCounter', { n: 1247 })}</p>
      </div>
    </div>
  );
}

export { styles as valuePropStyles };
