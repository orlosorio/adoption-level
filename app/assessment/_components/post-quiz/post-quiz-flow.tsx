'use client';

import { useCallback, useState } from 'react';
import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import ValuePropScreen from './value-prop-screen';
import ResultsBenchmarkSlot from './results-benchmark-slot';

type PostQuizScreen = 'value-prop' | 'results';

interface PostQuizFlowProps {
  language: Language;
  score: number;
  maxScore: number;
  resultsContent: React.ReactNode;
  onRestart: () => void;
  quizId: string;
  responses: { question_id: string; value: number }[];
  locale: Language;
}

export default function PostQuizFlow({
  language,
  score,
  maxScore,
  resultsContent,
  onRestart,
  quizId,
  responses,
  locale,
}: PostQuizFlowProps) {
  const [screen, setScreen] = useState<PostQuizScreen>('value-prop');

  const changeScreen = useCallback((next: PostQuizScreen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (screen === 'value-prop') {
    return (
      <ValuePropScreen
        language={language}
        onContinue={() => changeScreen('results')}
        onSkip={() => changeScreen('results')}
      />
    );
  }

  // Screen: results
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[960px]">
        {resultsContent}
        <div className="mt-4">
          <ResultsBenchmarkSlot
            language={language}
            quizId={quizId}
            responses={responses}
            locale={locale}
            score={score}
            maxScore={maxScore}
          />
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-6 w-full text-center font-sans text-sm text-[#999] underline"
        >
          {UI.results[language].again}
        </button>
      </div>
    </div>
  );
}
