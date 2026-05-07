'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import ValuePropScreen from './value-prop-screen';
import ResultsBenchmarkSlot from './results-benchmark-slot';

type PostQuizScreen = 'value-prop' | 'results';

interface PostQuizFlowProps {
  score: number;
  maxScore: number;
  resultsContent: React.ReactNode;
  onRestart: () => void;
  quizId: string;
  responses: { question_id: string; value: number }[];
}

export default function PostQuizFlow({
  score,
  maxScore,
  resultsContent,
  onRestart,
  quizId,
  responses,
}: PostQuizFlowProps) {
  const t = useTranslations('results');
  const [screen, setScreen] = useState<PostQuizScreen>('value-prop');

  const changeScreen = useCallback((next: PostQuizScreen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (screen === 'value-prop') {
    return (
      <ValuePropScreen
        onContinue={() => changeScreen('results')}
        onSkip={() => changeScreen('results')}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[960px]">
        {resultsContent}
        <div className="mt-4">
          <ResultsBenchmarkSlot
            quizId={quizId}
            responses={responses}
            score={score}
            maxScore={maxScore}
          />
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-6 w-full text-center font-sans text-sm text-[#999] underline"
        >
          {t('again')}
        </button>
      </div>
    </div>
  );
}
