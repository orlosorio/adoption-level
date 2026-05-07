'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import type { Locale } from '@/i18n/routing';
import type { RoleId } from '@/lib/roles';
import { ROLE_NAMES } from '@/lib/roles';
import glass from './glass.module.css';
import styles from './role-selector.module.css';

interface RoleSelectorProps {
  onSelect: (roleId: RoleId) => void;
}

const ROLE_ORDER: RoleId[] = [
  'product-manager',
  'founder-executive',
  'full-stack-developer',
  'ux-ui-design',
  'product-designer',
  'growth-marketing',
  'sales-bdr',
  'customer-success',
  'data-analytics',
  'video-editor',
  'social-media',
  'writers-editors',
  'paid-marketing',
  'hr-people-ops',
  'finance-accounting',
  'seo-specialist',
  'webflow-developer',
];

export default function RoleSelector({ onSelect }: RoleSelectorProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('assessment.roleSelector');
  const [selected, setSelected] = useState<RoleId | null>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[720px] text-center">
        <h2 className="mb-3 font-sans text-sm font-semibold text-[#1f36a9] sm:mb-5 sm:text-base">
          {t('heading')}
        </h2>

        <div className={styles.grid}>
          {ROLE_ORDER.map((roleId) => (
            <button
              key={roleId}
              type="button"
              role="button"
              tabIndex={0}
              aria-pressed={selected === roleId}
              onClick={() => setSelected(roleId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(roleId);
                }
              }}
              className={cn(styles.card, selected === roleId && styles.cardSelected)}
            >
              {ROLE_NAMES[roleId][locale]}
            </button>
          ))}
        </div>

        <div
          className="mt-4 transition-all duration-300 ease-out sm:mt-6"
          style={{
            opacity: selected ? 1 : 0,
            transform: selected ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: selected ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            onClick={() => selected && onSelect(selected)}
            className={cn(glass.answerBtn, glass.answerYes, 'px-8')}
          >
            {t('start')}
          </button>
        </div>
      </div>
    </div>
  );
}
