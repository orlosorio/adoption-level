'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import { BEEHIIV_ENDPOINT } from '@/lib/config';
import { getBandOrdinal } from '@/lib/scoring';
import { clearPersistedState, loadPersistedState, savePersistedState } from '@/lib/sessionState';
import type { QuizDef } from '@/lib/supabase/queries/getQuizBySlug';
import ScaleButtons from '@/app/assessment/_components/scale-buttons';
import PostQuizFlow from '@/app/assessment/_components/post-quiz/post-quiz-flow';
import glass from '@/app/assessment/_components/glass.module.css';

type Screen = 'quiz' | 'post-quiz';

function splitTierLabel(label: string): { number: string; name: string } {
  const parts = label.split(' — ');
  if (parts.length >= 2) return { number: parts[0]!, name: parts.slice(1).join(' — ') };
  return { number: label, name: '' };
}

interface QuizRunnerProps {
  quiz: QuizDef;
  language: Language;
}

export default function QuizRunner({ quiz, language }: QuizRunnerProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [screen, setScreen] = useState<Screen>('quiz');
  const [hydrated, setHydrated] = useState(false);

  const totalQuestions = quiz.questions.length;

  useEffect(() => {
    const persisted = loadPersistedState();
    if (
      persisted &&
      persisted.quizSlug === quiz.slug &&
      persisted.answers.length > 0 &&
      persisted.answers.length < totalQuestions
    ) {
      setCurrentQuestion(persisted.currentQuestion);
      setAnswers(persisted.answers);
    }
    setHydrated(true);
  }, [quiz.slug, totalQuestions]);

  const persist = useCallback(
    (q: number, a: number[]) => {
      savePersistedState({
        quizSlug: quiz.slug,
        language,
        currentQuestion: q,
        answers: a,
      });
    },
    [quiz.slug, language],
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

  const score = answers.reduce((sum, v, i) => sum + v * (quiz.questions[i]?.weight ?? 1), 0);
  const maxScore = quiz.questions.reduce((sum, q) => sum + 4 * q.weight, 0);
  const resultLevel = answers.length > 0 ? getBandOrdinal(score, maxScore) : 0;
  const band = quiz.resultBands.find((b) => b.ordinal === resultLevel) ?? null;

  const quizProgressPct = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const currentQ = quiz.questions[currentQuestion];

  const restart = () => {
    clearPersistedState();
    router.push('/assessment');
  };

  const handleEmailSubmit = async (payload: Record<string, unknown>) => {
    if (BEEHIIV_ENDPOINT && BEEHIIV_ENDPOINT !== 'YOUR_BEEHIIV_ENDPOINT') {
      await fetch(BEEHIIV_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, quizSlug: quiz.slug }),
      });
    }
  };

  if (!hydrated) return null;

  const tierLabelForResult =
    band?.shortLabel ?? quiz.tiers.find((t) => t.ordinal === resultLevel)?.shortLabel ?? '';
  const { number: resultLevelNumber, name: resultLevelName } = splitTierLabel(tierLabelForResult);

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
            {Math.round(score)} / {Math.round(maxScore)}
          </span>
        </div>
        <div className="h-[5px] w-full rounded-full bg-[#d7ddfb]">
          <div
            className="h-[5px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
            style={{ width: maxScore > 0 ? `${(score / maxScore) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {band && (
        <>
          <p className="mt-8 font-sans text-[15px] leading-relaxed text-[#333]">
            {band.description}
          </p>
          <div className="mt-8">
            <p className="font-sans text-sm font-bold text-[#111]">
              {UI.results[language].nextStepHeading}
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#333]">
              {band.nextStep}
            </p>
          </div>
        </>
      )}
    </div>
  );

  if (!currentQ) return null;

  const tierShort = currentQ.tier?.shortLabel ?? '';
  const { number: tierNumber, name: tierName } = splitTierLabel(tierShort);
  const tierDisplayOrdinal = (currentQ.tier?.ordinal ?? 0) + 1;

  const assessmentTypeForFlow: 'general' | 'company' | 'role' =
    quiz.slug === 'general' ? 'general' : quiz.slug === 'company' ? 'company' : 'role';
  const roleIdForFlow = quiz.slug.startsWith('role-') ? quiz.slug.slice('role-'.length) : null;

  return (
    <div className="quiz-in-progress contents">
      {screen === 'quiz' && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px]">
            <header className="mb-3 w-full shrink-0 sm:mb-5">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#365cff] sm:mb-2 sm:text-[14px]">
                <span>{UI.quiz[language].levelOf(tierDisplayOrdinal)}</span>
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
                <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0">
                  <p className="font-serif text-[20px] leading-tight font-bold text-[#1f36a9] sm:text-[28px]">
                    {tierNumber}
                  </p>
                  <p className="font-sans text-[13px] font-semibold text-[#4e6bff]/50 italic sm:mt-1 sm:text-[15px]">
                    {tierName}
                  </p>
                </div>
                <p className="mt-3 font-sans text-[14px] leading-[1.6] font-semibold text-[#1f36a9] sm:mt-6 sm:min-h-14 sm:text-[20px]">
                  {currentQ.statement}
                </p>
                <ScaleButtons onChange={answerQuestion} language={language} />
                {currentQuestion > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mt-3 block w-full cursor-pointer border-none bg-transparent py-0.5 text-center font-sans text-[13px] font-medium text-[rgba(23,23,23,0.3)] transition-colors duration-200 hover:text-[#1f36a9]/60 sm:mt-6"
                  >
                    {UI.quiz[language].back}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'post-quiz' && (
        <PostQuizFlow
          language={language}
          assessmentType={assessmentTypeForFlow}
          roleId={roleIdForFlow}
          score={Math.round(score)}
          maxScore={Math.round(maxScore)}
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
