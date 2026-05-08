'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import styles from './type-selector.module.css';

export type AssessmentType = 'general' | 'role' | 'company';

interface TypeSelectorProps {
  onSelect: (type: AssessmentType) => void;
}

const cards: { type: AssessmentType; recommended?: boolean; icon: string }[] = [
  { type: 'general', icon: '👤' },
  { type: 'role', icon: '🎯', recommended: true },
  { type: 'company', icon: '🏢' },
];

export default function TypeSelector({ onSelect }: TypeSelectorProps) {
  const t = useTranslations('assessment.typeSelector');

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[920px] text-center">
        <h2 className="mb-3 font-sans text-base font-semibold text-[#1f36a9] sm:mb-6 sm:text-lg">
          {t('heading')}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          {cards.map((card) => (
            <button
              key={card.type}
              type="button"
              role="button"
              tabIndex={0}
              onClick={() => onSelect(card.type)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(card.type);
                }
              }}
              className={cn(styles.card, 'relative', card.recommended && styles.recommended)}
            >
              {card.recommended && (
                <span className="absolute -top-3 right-4 rounded-full bg-[#365cff] px-3 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-sm">
                  {t('recommended')}
                </span>
              )}
              <p className="mb-1 hidden text-2xl sm:block" aria-hidden>
                {card.icon}
              </p>
              <p className="font-sans text-base font-semibold text-[#1f36a9] sm:text-lg">
                <span className="mr-2 text-xl sm:hidden" aria-hidden>
                  {card.icon}
                </span>
                {t(`${card.type}.title`)}
              </p>
              <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-[#2a2a2a]/65 sm:mt-3 sm:text-[15px] sm:leading-[1.6]">
                {t(`${card.type}.desc`)}
              </p>
              <p className="mt-2 font-sans text-xs text-[#1f36a9]/40 sm:mt-4 sm:text-sm">
                {t(`${card.type}.stats`)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
