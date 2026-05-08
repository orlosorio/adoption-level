'use client';

import { useTranslations } from 'next-intl';
import styles from './scale-buttons.module.css';

interface ScaleButtonsProps {
  onChange: (value: number) => void;
}

export default function ScaleButtons({ onChange }: ScaleButtonsProps) {
  const t = useTranslations('assessment');
  const labels = t.raw('scaleLabels') as string[];

  return (
    <div className="mt-4 flex flex-col gap-1.5 sm:mt-6 sm:gap-2">
      {labels.map((label, val) => (
        <button key={val} type="button" onClick={() => onChange(val)} className={styles.option}>
          {label}
        </button>
      ))}
    </div>
  );
}
