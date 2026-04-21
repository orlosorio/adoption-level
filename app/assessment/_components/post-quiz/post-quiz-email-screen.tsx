'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { valuePropStyles } from './value-prop-screen';
import stepStyles from './step-indicator.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PostQuizEmailScreenProps {
  language: Language;
  onSubmit: (email: string) => void;
  onSkip: () => void;
  step: number;
  totalSteps: number;
}

export default function PostQuizEmailScreen({
  language,
  onSubmit,
  onSkip,
  step,
  totalSteps,
}: PostQuizEmailScreenProps) {
  const copy = UI.postQuizEmail[language];
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    setTimeout(() => {
      onSubmit(trimmed);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[520px]">
        <div className={`${stepStyles.root} mb-5`}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <span key={i} className={cn(stepStyles.dot, i < step && stepStyles.active)} />
          ))}
          <span className={stepStyles.label}>{copy.step(step, totalSteps)}</span>
        </div>

        <div className={`${glass.quizCard} px-5 py-6 sm:px-8 sm:py-8`}>
          <h2 className="font-sans text-lg font-bold text-[#1f36a9] sm:text-xl">{copy.heading}</h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={copy.placeholder}
              className={cn(glass.input, 'flex-1', error && '!border-red-400')}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={cn(
                glass.answerBtn,
                glass.answerYes,
                'shrink-0 justify-center whitespace-nowrap',
              )}
            >
              {loading ? '...' : copy.submit}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{copy.invalidEmail}</p>}

          <p className="mt-4 text-center text-xs leading-relaxed text-[#1f36a9]/35">
            {copy.privacy}
          </p>
        </div>

        <button type="button" onClick={onSkip} className={`${valuePropStyles.skip} mt-5`}>
          {UI.valueProp[language].skip}
        </button>
      </div>
    </div>
  );
}
