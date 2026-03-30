"use client";

import type { Language } from "@/lib/content";
import { SCALE_LABELS } from "@/lib/scaleLabels";

interface ScaleButtonsProps {
  onChange: (value: number) => void;
  language: Language;
}

export default function ScaleButtons({ onChange, language }: ScaleButtonsProps) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {SCALE_LABELS.map((label, val) => (
        <button
          key={val}
          type="button"
          onClick={() => onChange(val)}
          className="scale-option-btn"
        >
          {label[language]}
        </button>
      ))}
    </div>
  );
}
