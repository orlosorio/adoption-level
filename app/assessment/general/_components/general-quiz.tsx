'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Language, LEVEL_LABELS, QUESTIONS, RESULT_COPY, UI } from '@/lib/content';
import { getResultLevel } from '@/lib/scoring';
import { BEEHIIV_ENDPOINT } from '@/lib/config';
import { clearPersistedState, loadPersistedState, savePersistedState } from '@/lib/sessionState';
import ScaleButtons from '@/app/assessment/_components/scale-buttons';
import PostQuizFlow from '@/app/assessment/_components/post-quiz/post-quiz-flow';
import glass from '@/app/assessment/_components/glass.module.css';

type Screen = 'quiz' | 'post-quiz';

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(' — ');
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(' — ') };
  }
  return { number: label, name: '' };
}

export default function GeneralQuiz({ initialLanguage }: { initialLanguage: Language }) {
  const router = useRouter();
  const [language] = useState<Language>(initialLanguage);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [screen, setScreen] = useState<Screen>('quiz');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (
      persisted &&
      persisted.assessmentType === 'general' &&
      persisted.answers.length > 0 &&
      persisted.answers.length < QUESTIONS.length
    ) {
      setCurrentQuestion(persisted.currentQuestion);
      setAnswers(persisted.answers);
    }
    setHydrated(true);
  }, []);

  const totalQuestions = QUESTIONS.length;

  const persist = useCallback(
    (q: number, a: number[]) => {
      savePersistedState({
        assessmentType: 'general',
        roleId: null,
        language,
        currentQuestion: q,
        answers: a,
      });
    },
    [language],
  );

  const answerQuestion = useCallback(
    (value: number) => {
      const nextAnswers = [...answers, value];
      const nextQ = currentQuestion + 1;
      setAnswers(nextAnswers);
      if (nextQ >= totalQuestions) {
        persist(nextQ, nextAnswers);
        clearPersistedState();
        setScreen('post-quiz');
      } else {
        setCurrentQuestion(nextQ);
        persist(nextQ, nextAnswers);
        window.history.replaceState(null, '', window.location.href);
      }
    },
    [answers, currentQuestion, totalQuestions, persist],
  );

  const goBack = useCallback(() => {
    if (currentQuestion <= 0) return;
    const prevQ = currentQuestion - 1;
    const prevAnswers = answers.slice(0, -1);
    setCurrentQuestion(prevQ);
    setAnswers(prevAnswers);
    persist(prevQ, prevAnswers);
  }, [currentQuestion, answers, persist]);

  const score = answers.reduce((sum, v) => sum + v, 0);
  const maxScore = totalQuestions * 4;
  const resultLevel = answers.length > 0 ? getResultLevel(score, maxScore) : 0;
  const resultLabel = LEVEL_LABELS[resultLevel]![language];
  const { number: resultLevelNumber, name: resultLevelName } = splitLevelLabel(resultLabel);

  const quizProgressPct = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const currentQ = QUESTIONS[currentQuestion];

  const restart = () => {
    clearPersistedState();
    router.push('/assessment');
  };

  const handleEmailSubmit = async (payload: Record<string, unknown>) => {
    if (BEEHIIV_ENDPOINT && BEEHIIV_ENDPOINT !== 'YOUR_BEEHIIV_ENDPOINT') {
      await fetch(BEEHIIV_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
  };

  if (!hydrated) return null;

  const resultsContent = (
    <div className="rounded-2xl bg-white px-5 py-6 text-left sm:px-10 sm:py-11">
      <div className="border-b border-[#eee] pb-8 text-center">
        <p className="font-serif text-3xl font-bold text-[#1f36a9] sm:text-4xl">
          {resultLevelNumber}
        </p>
        <p className="mt-2 font-sans text-[15px] font-semibold text-[#4e6bff] italic">
          {resultLevelName}
        </p>
      </div>

      <div className="mt-8 rounded-[10px] bg-[#eef1ff] px-5 py-4">
        <div className="mb-3 flex items-center justify-between text-[15px]">
          <span className="text-[#333]">
            {language === 'es' ? 'Puntuación total' : 'Total score'}
          </span>
          <span className="font-bold text-[#111]">
            {score} / {maxScore}
          </span>
        </div>
        <div className="h-[5px] w-full rounded-full bg-[#d7ddfb]">
          <div
            className="h-[5px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
            style={{
              width: maxScore > 0 ? `${(score / maxScore) * 100}%` : '0%',
            }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-[10px] bg-[#eef1ff] px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-[14px]">
          <span className="text-[#555]">
            {language === 'es' ? 'Promedio por pregunta' : 'Average score per question'}
          </span>
          <span className="font-bold text-[#111]">{(score / totalQuestions).toFixed(1)} / 4.0</span>
        </div>
        <div className="h-[4px] w-full rounded-full bg-[#d7ddfb]">
          <div
            className="h-[4px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-[#999]">
          {Math.round((score / maxScore) * 100)}%
        </p>
      </div>

      <p className="mt-8 font-sans text-[15px] leading-relaxed text-[#333]">
        {RESULT_COPY[resultLevel]!.description[language]}
      </p>

      <div className="mt-8">
        <p className="font-sans text-sm font-bold text-[#111]">
          {UI.results[language].nextStepHeading}
        </p>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#333]">
          {RESULT_COPY[resultLevel]!.nextStep[language]}
        </p>
      </div>
    </div>
  );

  return (
    <div className="quiz-in-progress contents">
      {screen === 'quiz' && currentQ && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px]">
            <header className="mb-3 w-full shrink-0 sm:mb-5">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#365cff] sm:mb-2 sm:text-[14px]">
                <span>
                  {UI.quiz[language].levelOf(
                    (QUESTIONS[currentQuestion] as { level: number }).level + 1,
                  )}
                </span>
                <span>{UI.quiz[language].questionOf(currentQuestion + 1, totalQuestions)}</span>
              </div>
              <div
                className="h-1 w-full rounded-sm bg-[#d8defa]"
                role="progressbar"
                aria-valuenow={currentQuestion + 1}
                aria-valuemin={1}
                aria-valuemax={totalQuestions}
              >
                <div
                  className="h-1 rounded-sm bg-[#365cff] transition-[width] duration-[350ms] ease-out"
                  style={{ width: `${quizProgressPct}%` }}
                />
              </div>
            </header>

            <div className="mx-auto w-full max-w-[600px]">
              <div className={`${glass.quizCard} px-5 py-6 sm:px-8 sm:py-8`}>
                {(() => {
                  const q = QUESTIONS[currentQuestion]!;
                  const full = LEVEL_LABELS[q.level]![language];
                  const { number, name } = splitLevelLabel(full);
                  const text = language === 'es' ? q.es : q.en;
                  return (
                    <>
                      <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0">
                        <p className="font-serif text-[20px] leading-tight font-bold text-[#1f36a9] sm:text-[28px]">
                          {number}
                        </p>
                        <p className="font-sans text-[13px] font-semibold text-[#4e6bff]/50 italic sm:mt-1 sm:text-[15px]">
                          {name}
                        </p>
                      </div>
                      <p className="mt-3 font-sans text-[14px] leading-[1.6] font-semibold text-[#1f36a9] sm:mt-6 sm:min-h-14 sm:text-[20px]">
                        {text}
                      </p>
                      <ScaleButtons onChange={answerQuestion} language={language} />
                      {currentQuestion > 0 && (
                        <button
                          type="button"
                          onClick={goBack}
                          className="quiz-back-link mt-3 sm:mt-6"
                        >
                          {UI.quiz[language].back}
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'post-quiz' && (
        <PostQuizFlow
          language={language}
          assessmentType="general"
          score={score}
          maxScore={maxScore}
          totalQuestions={totalQuestions}
          resultLevel={resultLevel}
          resultsContent={resultsContent}
          onRestart={restart}
          onEmailSubmit={handleEmailSubmit}
        />
      )}
    </div>
  );
}
