'use client';

import type { Language } from '@/lib/content';
import { SCALE_LABELS } from '@/lib/scaleLabels';

interface ScaleButtonsProps {
  onChange: (value: number) => void;
  language: Language;
}

export default function ScaleButtons({ onChange, language }: ScaleButtonsProps) {
  return (
    <div className="mt-4 flex flex-col gap-1.5 sm:mt-6 sm:gap-2">
      {SCALE_LABELS.map((label, val) => (
        <button key={val} type="button" onClick={() => onChange(val)} className="scale-option-btn">
          {label[language]}
        </button>
      ))}
    </div>
  );
}
