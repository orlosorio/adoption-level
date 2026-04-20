'use client';

import { useState } from 'react';
import type { Language } from '@/lib/content';
import type { RoleId } from '@/lib/roles';
import { ROLE_NAMES } from '@/lib/roles';

interface RoleSelectorProps {
  language: Language;
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

const UI_TEXT = {
  es: {
    heading: 'Elige tu rol profesional',
    start: 'Iniciar evaluación →',
  },
  en: {
    heading: 'Select your professional role',
    start: 'Start Assessment →',
  },
} as const;

export default function RoleSelector({ language, onSelect }: RoleSelectorProps) {
  const [selected, setSelected] = useState<RoleId | null>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[720px] text-center">
        <h2 className="mb-3 font-sans text-sm font-semibold text-[#1f36a9] sm:mb-5 sm:text-base">
          {UI_TEXT[language].heading}
        </h2>

        <div className="role-grid">
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
              className={`role-card ${selected === roleId ? 'role-card-selected' : ''}`}
            >
              {ROLE_NAMES[roleId][language]}
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
            className="glass-answer-btn glass-answer-yes px-8"
          >
            {UI_TEXT[language].start}
          </button>
        </div>
      </div>
    </div>
  );
}
