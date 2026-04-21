'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Language, LEVEL_LABELS, UI } from '@/lib/content';
import { getRoleResultLevel } from '@/lib/scoring';
import { BEEHIIV_ENDPOINT } from '@/lib/config';
import { COMPANY_QUESTIONS, DIMENSION_NAMES, DIMENSION_ORDER } from '@/lib/companyAssessment';
import { COMPANY_RESULT_COPY } from '@/lib/companyResults';
import { clearPersistedState, loadPersistedState, savePersistedState } from '@/lib/sessionState';
import ScaleButtons from '@/app/assessment/_components/scale-buttons';
import HeroAI from '@/app/assessment/_components/hero-ai';
import ToolsMarquee from '@/app/assessment/_components/tools-marquee';
import PostQuizFlow from '@/app/assessment/_components/post-quiz/post-quiz-flow';

type Screen = 'language' | 'quiz' | 'post-quiz';

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(' — ');
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(' — ') };
  }
  return { number: label, name: '' };
}

function computeDimensionScores(answers: number[]) {
  return DIMENSION_ORDER.map((dimId) => {
    const indices = COMPANY_QUESTIONS.map((q, i) => (q.dimension === dimId ? i : -1)).filter(
      (i) => i >= 0,
    );
    const dimScore = indices.reduce((s, i) => s + (answers[i] ?? 0), 0);
    const dimMax = indices.length * 4;
    return { dimId, score: dimScore, max: dimMax };
  });
}

export default function CompanyQuiz({ initialLanguage }: { initialLanguage: Language | null }) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language | null>(initialLanguage);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [screen, setScreen] = useState<Screen>(initialLanguage ? 'quiz' : 'language');
  const [hydrated, setHydrated] = useState(false);

  const totalQuestions = COMPANY_QUESTIONS.length;

  useEffect(() => {
    const persisted = loadPersistedState();
    if (
      persisted &&
      persisted.assessmentType === 'company' &&
      persisted.answers.length > 0 &&
      persisted.answers.length < totalQuestions
    ) {
      setLanguage(persisted.language);
      setCurrentQuestion(persisted.currentQuestion);
      setAnswers(persisted.answers);
      setScreen('quiz');
    }
    setHydrated(true);
  }, [totalQuestions]);

  const persist = useCallback(
    (q: number, a: number[]) => {
      if (!language) return;
      savePersistedState({
        assessmentType: 'company',
        roleId: null,
        language,
        currentQuestion: q,
        answers: a,
      });
    },
    [language],
  );

  const startQuiz = (lang: Language) => {
    setLanguage(lang);
    setCurrentQuestion(0);
    setAnswers([]);
    setScreen('quiz');
  };

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
  const resultLevel = answers.length > 0 ? getRoleResultLevel(score, maxScore) : 0;
  const resultLabel = language != null ? LEVEL_LABELS[resultLevel]![language] : '';
  const { number: resultLevelNumber, name: resultLevelName } = splitLevelLabel(resultLabel);

  const quizProgressPct = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const dimensionScores = computeDimensionScores(answers);

  const restart = () => {
    clearPersistedState();
    router.push('/assessment');
  };

  const handleEmailSubmit = async (payload: Record<string, unknown>) => {
    if (BEEHIIV_ENDPOINT && BEEHIIV_ENDPOINT !== 'YOUR_BEEHIIV_ENDPOINT') {
      await fetch(BEEHIIV_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          dimensionScores: dimensionScores.map((d) => ({
            dimension: d.dimId,
            score: d.score,
            max: d.max,
          })),
        }),
      });
    }
  };

  if (!hydrated) return null;

  const resultsContent = language ? (
    <div className="rounded-2xl bg-white px-5 py-6 text-left sm:px-10 sm:py-11">
      <div className="border-b border-[#eee] pb-8 text-center">
        <p className="font-serif text-3xl font-bold text-[#1f36a9] sm:text-4xl">
          {resultLevelNumber}
        </p>
        <p className="mt-2 font-sans text-[15px] font-semibold text-[#4e6bff] italic">
          {resultLevelName}
        </p>
        <p className="mt-2 font-sans text-xs tracking-[0.08em] text-[#8a9ff0]">
          {language === 'es'
            ? 'Evaluación Empresarial · 7 Dimensiones'
            : 'Company Assessment · 7 Dimensions'}
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

      <div className="mt-6 rounded-[10px] border border-[#d8defa] px-5 py-5">
        <p className="mb-4 font-sans text-sm font-bold text-[#1f36a9]">
          {language === 'es' ? 'Puntuación por dimensión' : 'Score by dimension'}
        </p>
        <div className="space-y-3">
          {dimensionScores.map(({ dimId, score: ds, max: dm }) => (
            <div key={dimId}>
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span className="text-[#444]">{DIMENSION_NAMES[dimId][language]}</span>
                <span className="font-semibold text-[#111]">
                  {ds}/{dm}
                  <span className="ml-1 text-[#999]">
                    ({dm > 0 ? Math.round((ds / dm) * 100) : 0}%)
                  </span>
                </span>
              </div>
              <div className="h-[4px] w-full rounded-full bg-[#e8ebf8]">
                <div
                  className="h-[4px] rounded-full transition-[width] duration-[350ms] ease-out"
                  style={{
                    width: dm > 0 ? `${(ds / dm) * 100}%` : '0%',
                    backgroundColor:
                      dm > 0 && ds / dm >= 0.7
                        ? '#22c55e'
                        : dm > 0 && ds / dm >= 0.4
                          ? '#f59e0b'
                          : '#ef4444',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 font-sans text-[15px] leading-relaxed text-[#333]">
        {COMPANY_RESULT_COPY[resultLevel]!.description[language]}
      </p>

      <div className="mt-8">
        <p className="font-sans text-sm font-bold text-[#111]">
          {UI.results[language].nextStepHeading}
        </p>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#333]">
          {COMPANY_RESULT_COPY[resultLevel]!.nextStep[language]}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <div className="quiz-in-progress contents">
      {screen === 'language' && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px] text-center">
            <h1 className="hero-title mb-5">
              <HeroAI />
              <span className="hero-title-adoption">Adoption</span>
              <hr className="hero-title-rule" />
              <span className="hero-title-assessment">Company Assessment</span>
            </h1>
            <p className="mb-3 font-sans text-[15px] leading-relaxed text-[#4d5b9a] sm:text-base">
              AI Company Readiness &middot; 7 Dimensions
            </p>
            <p className="mb-5 font-sans text-sm font-semibold text-[#365cff]/80">
              35 questions &middot; ~4 min &middot; Confidence scale
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <button type="button" onClick={() => startQuiz('en')} className="glass-cta">
                <span className="glass-cta-label">{UI.language.en}</span>
              </button>
              <button type="button" onClick={() => startQuiz('es')} className="glass-cta">
                <span className="glass-cta-label">{UI.language.es}</span>
              </button>
            </div>
            <div className="relative left-1/2 mt-6 -ml-[50vw] w-screen">
              <ToolsMarquee language="en" />
            </div>
          </div>
        </div>
      )}

      {screen === 'quiz' && language && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px]">
            <header className="mb-3 w-full shrink-0 sm:mb-5">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#365cff] sm:mb-2 sm:text-[14px]">
                <span>
                  {UI.quiz[language].levelOf(COMPANY_QUESTIONS[currentQuestion]!.level + 1)}
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
              <div className="glass-quiz-card px-5 py-6 sm:px-8 sm:py-8">
                {(() => {
                  const q = COMPANY_QUESTIONS[currentQuestion]!;
                  const { number, name } = splitLevelLabel(q.levelLabel[language]);
                  const text = q.statement[language];
                  const dimName = DIMENSION_NAMES[q.dimension][language];
                  return (
                    <>
                      <span className="mb-2 inline-block rounded-full bg-[#eef1ff] px-3 py-0.5 text-[11px] font-semibold tracking-wide text-[#365cff] sm:mb-3 sm:py-1 sm:text-[12px]">
                        {dimName}
                      </span>
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

      {screen === 'post-quiz' && language && (
        <PostQuizFlow
          language={language}
          assessmentType="company"
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
