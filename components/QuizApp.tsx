'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type Language, LEVEL_LABELS, QUESTIONS, RESULT_COPY, UI } from '@/lib/content';
import { getResultLevel, getRoleResultLevel } from '@/lib/scoring';
import { BEEHIIV_ENDPOINT } from '@/lib/config';
import { ROLE_ASSESSMENTS, ROLE_NAMES, type RoleId } from '@/lib/roles';
import { ROLE_RESULT_COPY } from '@/lib/roleResults';
import { COMPANY_QUESTIONS, DIMENSION_NAMES, DIMENSION_ORDER } from '@/lib/companyAssessment';
import { COMPANY_RESULT_COPY } from '@/lib/companyResults';
import ToolsMarquee from '@/components/ToolsMarquee';
import FomoCounter from '@/components/FomoCounter';
import HeroAI from '@/components/HeroAI';
import BackgroundScene from '@/components/BackgroundScene';
import TypeSelector, { type AssessmentType } from '@/components/TypeSelector';
import RoleSelector from '@/components/RoleSelector';
import ScaleButtons from '@/components/ScaleButtons';

type Screen = 'type-selector' | 'language' | 'role-selector' | 'quiz' | 'email' | 'results';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(' — ');
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(' — ') };
  }
  return { number: label, name: '' };
}

export default function QuizApp() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [screen, setScreen] = useState<Screen>('type-selector');
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('general');
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);

  const isRoleQuiz = assessmentType === 'role';
  const isCompanyQuiz = assessmentType === 'company';
  const roleQuestions =
    isRoleQuiz && selectedRole ? ROLE_ASSESSMENTS[selectedRole].questions : null;
  const companyQuestions = isCompanyQuiz ? COMPANY_QUESTIONS : null;
  const activeQuestions = isCompanyQuiz
    ? COMPANY_QUESTIONS
    : isRoleQuiz && roleQuestions
      ? roleQuestions
      : QUESTIONS;
  const totalQuestions = activeQuestions.length;

  const selectAssessmentType = (type: AssessmentType) => {
    setAssessmentType(type);
    setScreen('language');
  };

  const startQuiz = (lang: Language) => {
    setLanguage(lang);
    setCurrentQuestion(0);
    setAnswers([]);
    if (assessmentType === 'role') {
      setScreen('role-selector');
    } else {
      setScreen('quiz');
    }
  };

  const isScaleQuiz = isRoleQuiz || isCompanyQuiz;

  const selectRole = (roleId: RoleId) => {
    setSelectedRole(roleId);
    setCurrentQuestion(0);
    setAnswers([]);
    setScreen('quiz');
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setEmailInput('');
    setEmailError(false);
    setAssessmentType('general');
    setSelectedRole(null);
    setLanguage(null);
    setScreen('type-selector');
  };

  const answerQuestion = (value: number) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);
    if (currentQuestion + 1 >= totalQuestions) {
      setScreen('email');
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion <= 0) return;
    setCurrentQuestion((q) => q - 1);
    setAnswers((a) => a.slice(0, -1));
  };

  const submitEmail = async () => {
    const trimmed = emailInput.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    if (BEEHIIV_ENDPOINT && BEEHIIV_ENDPOINT !== 'YOUR_BEEHIIV_ENDPOINT') {
      const payload = isCompanyQuiz
        ? {
            email: trimmed,
            language,
            assessmentType: 'company' as const,
            totalScore: score,
            maxScore: totalQuestions * 4,
            averageScore: (score / totalQuestions).toFixed(1),
            resultLevel,
            dimensionScores: dimensionScores?.map((d) => ({
              dimension: d.dimId,
              score: d.score,
              max: d.max,
            })),
          }
        : isRoleQuiz
          ? {
              email: trimmed,
              language,
              assessmentType: 'role' as const,
              roleId: selectedRole,
              roleName: selectedRole && language ? ROLE_NAMES[selectedRole][language] : '',
              totalScore: score,
              maxScore: totalQuestions * 4,
              averageScore: (score / totalQuestions).toFixed(1),
              resultLevel,
            }
          : {
              email: trimmed,
              language,
              assessmentType: 'general' as const,
              score,
              resultLevel,
            };
      try {
        await fetch(BEEHIIV_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        /* advance regardless */
      }
    }
    setScreen('results');
  };

  const skipEmail = () => {
    setEmailError(false);
    setScreen('results');
  };

  const score = answers.reduce((sum, v) => sum + v, 0);
  const maxScore = isScaleQuiz ? totalQuestions * 4 : totalQuestions;
  const resultLevel =
    answers.length > 0
      ? isScaleQuiz
        ? getRoleResultLevel(score, maxScore)
        : getResultLevel(score, answers.length)
      : 0;
  const resultLabel = language != null ? LEVEL_LABELS[resultLevel]![language] : '';
  const { number: resultLevelNumber, name: resultLevelName } = splitLevelLabel(resultLabel);

  const resultCopy = isCompanyQuiz
    ? COMPANY_RESULT_COPY
    : isRoleQuiz
      ? ROLE_RESULT_COPY
      : RESULT_COPY;

  const dimensionScores = isCompanyQuiz
    ? DIMENSION_ORDER.map((dimId) => {
        const indices = COMPANY_QUESTIONS.map((q, i) => (q.dimension === dimId ? i : -1)).filter(
          (i) => i >= 0,
        );
        const dimScore = indices.reduce((s, i) => s + (answers[i] ?? 0), 0);
        const dimMax = indices.length * 4;
        return { dimId, score: dimScore, max: dimMax, count: indices.length };
      })
    : null;

  const quizProgressPct = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const currentQ = activeQuestions[currentQuestion];

  return (
    <div className="quiz-grid-bg flex min-h-screen flex-col px-4 py-4 sm:px-6 sm:py-12">
      <BackgroundScene />

      <div className="relative z-10 flex w-full items-center justify-center pt-2">
        {screen === 'type-selector' || screen === 'language' ? (
          <Link
            href="/"
            className="absolute left-0 flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-[13px] font-medium text-[#1f36a9]/60 backdrop-blur-md transition-all hover:bg-white/40 hover:text-[#1f36a9]"
            aria-label="Back to home"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={restartQuiz}
            className="absolute left-0 flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-[13px] font-medium text-[#1f36a9]/60 backdrop-blur-md transition-all hover:bg-white/40 hover:text-[#1f36a9]"
            aria-label="Back to home"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </button>
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-1 flex-col">
        {screen === 'type-selector' && (
          <TypeSelector language="es" onSelect={selectAssessmentType} />
        )}

        {screen === 'language' && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px] text-center">
              <h1 className="hero-title mb-6 sm:mb-10">
                <HeroAI />
                <span className="hero-title-adoption">Adoption</span>
                <hr className="hero-title-rule" />
                <span className="hero-title-assessment">Self-Assessment</span>
              </h1>
              <p className="mb-8 font-sans text-[15px] leading-relaxed text-[#4d5b9a] sm:text-base">
                {UI.language.subtitle}
              </p>
              <p className="mb-8 font-sans text-sm font-semibold text-[#365cff]/80">
                {UI.language.meta}
              </p>
              <div className="flex flex-row justify-center gap-4 sm:gap-6">
                <button type="button" onClick={() => startQuiz('en')} className="glass-cta">
                  <span className="glass-cta-label">{UI.language.en}</span>
                </button>
                <button type="button" onClick={() => startQuiz('es')} className="glass-cta">
                  <span className="glass-cta-label">{UI.language.es}</span>
                </button>
              </div>
              <div className="relative left-1/2 mt-6 -ml-[50vw] w-screen sm:mt-12">
                <ToolsMarquee language="en" />
              </div>
            </div>
          </div>
        )}

        {screen === 'role-selector' && language && (
          <RoleSelector language={language} onSelect={selectRole} />
        )}

        {screen === 'quiz' && language && currentQ && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px]">
              <header className="mb-3 w-full shrink-0 sm:mb-5">
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#365cff] sm:mb-2 sm:text-[14px]">
                  <span>
                    {isCompanyQuiz && companyQuestions
                      ? UI.quiz[language].levelOf(companyQuestions[currentQuestion]!.level + 1)
                      : isRoleQuiz && roleQuestions
                        ? UI.quiz[language].levelOf(roleQuestions[currentQuestion]!.level + 1)
                        : UI.quiz[language].levelOf(
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
                <div className="glass-quiz-card px-6 py-8 sm:px-10 sm:py-11">
                  {(() => {
                    if (isCompanyQuiz && companyQuestions) {
                      const q = companyQuestions[currentQuestion]!;
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
                            <p className="font-sans text-[13px] font-semibold text-[#4e6bff] italic sm:mt-1 sm:text-[15px]">
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
                    }

                    if (isRoleQuiz && roleQuestions) {
                      const q = roleQuestions[currentQuestion]!;
                      const { number, name } = splitLevelLabel(q.levelLabel[language]);
                      const text = q.statement[language];
                      return (
                        <>
                          <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0">
                            <p className="font-serif text-[20px] leading-tight font-bold text-[#1f36a9] sm:text-[28px]">
                              {number}
                            </p>
                            <p className="font-sans text-[13px] font-semibold text-[#4e6bff] italic sm:mt-1 sm:text-[15px]">
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
                    }

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
                          <p className="font-sans text-[13px] font-semibold text-[#4e6bff] italic sm:mt-1 sm:text-[15px]">
                            {name}
                          </p>
                        </div>
                        <p className="mt-3 font-sans text-[14px] leading-[1.6] font-semibold text-[#1f36a9] sm:mt-6 sm:min-h-14 sm:text-[20px]">
                          {text}
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-[14px] sm:mt-10">
                          <button
                            type="button"
                            onClick={() => answerQuestion(1)}
                            className="glass-answer-btn glass-answer-yes"
                          >
                            {UI.quiz[language].yes}
                          </button>
                          <button
                            type="button"
                            onClick={() => answerQuestion(0)}
                            className="glass-answer-btn glass-answer-no"
                          >
                            {UI.quiz[language].no}
                          </button>
                        </div>
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

        {screen === 'email' && language && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="glass-quiz-card w-full max-w-[600px] px-5 py-6 sm:px-10 sm:py-11">
              <h2 className="font-sans text-2xl font-bold text-[#1f36a9]">
                {UI.email[language].title}
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#2a2a2a]/80">
                {UI.email[language].body}
              </p>
              <input
                type="email"
                autoComplete="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError(false);
                }}
                placeholder={UI.email[language].placeholder}
                className="glass-input mt-6 w-full"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{UI.email[language].invalidEmail}</p>
              )}
              <button
                type="button"
                onClick={() => void submitEmail()}
                className="glass-answer-btn glass-answer-yes mt-6 w-full justify-center"
              >
                {UI.email[language].submit}
              </button>
              <p className="mt-4 text-center text-xs leading-relaxed text-[#1f36a9]/35">
                {UI.email[language].privacy}
              </p>
              <button
                type="button"
                onClick={skipEmail}
                className="mt-6 w-full text-center font-sans text-sm text-[#1f36a9]/30 underline decoration-[#1f36a9]/15 transition-colors hover:text-[#1f36a9]/50"
              >
                {UI.email[language].skip}
              </button>
            </div>
          </div>
        )}

        {screen === 'results' && language && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px] rounded-2xl bg-white px-6 py-8 text-left sm:px-10 sm:py-11">
              <div className="border-b border-[#eee] pb-8 text-center">
                <p className="font-serif text-3xl font-bold text-[#1f36a9] sm:text-4xl">
                  {resultLevelNumber}
                </p>
                <p className="mt-2 font-sans text-[15px] font-semibold text-[#4e6bff] italic">
                  {resultLevelName}
                </p>
                {isRoleQuiz && selectedRole && (
                  <p className="mt-2 font-sans text-xs tracking-[0.08em] text-[#8a9ff0]">
                    {ROLE_NAMES[selectedRole][language]}
                    {' · '}
                    {language === 'es' ? 'Escala de confianza' : 'Confidence Scale'}
                  </p>
                )}
              </div>

              <div className="mt-8 rounded-[10px] bg-[#eef1ff] px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-[15px]">
                  <span className="text-[#333]">
                    {isRoleQuiz
                      ? language === 'es'
                        ? 'Puntuación total'
                        : 'Total score'
                      : UI.results[language].affirmativeLabel}
                  </span>
                  <span className="font-bold text-[#111]">
                    {isRoleQuiz
                      ? `${score} / ${maxScore}`
                      : UI.results[language].scoreOf(score, answers.length)}
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

              {isScaleQuiz && (
                <div className="avg-score-card">
                  <div className="mb-2 flex items-center justify-between text-[14px]">
                    <span className="text-[#555]">
                      {language === 'es' ? 'Promedio por pregunta' : 'Average score per question'}
                    </span>
                    <span className="font-bold text-[#111]">
                      {(score / totalQuestions).toFixed(1)} / 4.0
                    </span>
                  </div>
                  <div className="h-[4px] w-full rounded-full bg-[#d7ddfb]">
                    <div
                      className="h-[4px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
                      style={{
                        width: `${(score / (totalQuestions * 4)) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-right text-xs text-[#999]">
                    {Math.round((score / (totalQuestions * 4)) * 100)}%
                  </p>
                </div>
              )}

              {isCompanyQuiz && dimensionScores && language && (
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
              )}

              <p className="mt-8 font-sans text-[15px] leading-relaxed text-[#333]">
                {resultCopy[resultLevel]!.description[language]}
              </p>

              <div className="mt-8">
                <p className="font-sans text-sm font-bold text-[#111]">
                  {UI.results[language].nextStepHeading}
                </p>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#333]">
                  {resultCopy[resultLevel]!.nextStep[language]}
                </p>
              </div>

              <div className="mt-10 rounded-[10px] border border-[#d8defa] px-5 py-[18px]">
                <p className="font-sans text-[15px] font-semibold text-[#1f36a9]">
                  {UI.results[language].benchmarkTitle}
                </p>
                <p className="mt-1 font-sans text-sm text-[#555]">
                  {UI.results[language].benchmarkSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={restartQuiz}
                className="mt-8 w-full text-center font-sans text-sm text-[#999] underline"
              >
                {UI.results[language].again}
              </button>
            </div>
          </div>
        )}
      </div>
      <FomoCounter language={language ?? 'en'} />
    </div>
  );
}
