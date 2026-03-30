"use client";

import { useState } from "react";
import {
  type Language,
  LEVEL_LABELS,
  QUESTIONS,
  RESULT_COPY,
  UI,
} from "@/lib/content";
import { getResultLevel } from "@/lib/scoring";
import { BEEHIIV_ENDPOINT, NEWSLETTER_URL } from "@/lib/config";
import ToolsMarquee from "@/components/ToolsMarquee";
import FomoCounter from "@/components/FomoCounter";
import HeroAI from "@/components/HeroAI";
import BackgroundScene from "@/components/BackgroundScene";

type Screen = "language" | "quiz" | "email" | "results";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(" — ");
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(" — ") };
  }
  return { number: label, name: "" };
}

export default function QuizApp() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [screen, setScreen] = useState<Screen>("language");

  const totalQuestions = QUESTIONS.length;

  const startQuiz = (lang: Language) => {
    setLanguage(lang);
    setCurrentQuestion(0);
    setAnswers([]);
    setScreen("quiz");
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setEmailInput("");
    setEmailError(false);
    setScreen("language");
  };

  const answerQuestion = (yes: boolean) => {
    const nextAnswers = [...answers, yes];
    setAnswers(nextAnswers);
    if (currentQuestion + 1 >= totalQuestions) {
      setScreen("email");
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const submitEmail = async () => {
    const trimmed = emailInput.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    if (
      BEEHIIV_ENDPOINT &&
      BEEHIIV_ENDPOINT !== "YOUR_BEEHIIV_ENDPOINT"
    ) {
      try {
        await fetch(BEEHIIV_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
      } catch {
        /* advance regardless */
      }
    }
    setScreen("results");
  };

  const skipEmail = () => {
    setEmailError(false);
    setScreen("results");
  };

  const score = answers.filter(Boolean).length;
  const resultLevel =
    answers.length > 0 ? getResultLevel(score, answers.length) : 0;
  const resultLabel =
    language != null ? LEVEL_LABELS[resultLevel]![language] : "";
  const { number: resultLevelNumber, name: resultLevelName } =
    splitLevelLabel(resultLabel);

  const quizProgressPct =
    totalQuestions > 0
      ? ((currentQuestion + 1) / totalQuestions) * 100
      : 0;

  return (
    <div className="quiz-grid-bg flex min-h-screen flex-col px-4 py-10 sm:px-6 sm:py-12">
      <BackgroundScene />

      <div className="relative z-10 flex w-full justify-center pt-2">
        <p className="tech-brand" data-text={UI.brand}>
          <span className="tech-brand-inner">{UI.brand}</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-1 flex-col">
        {screen === "language" && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px] text-center">
              <h1 className="hero-title mb-10">
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
              <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-6">
                <button
                  type="button"
                  onClick={() => startQuiz("es")}
                  className="glass-cta"
                >
                  <span className="glass-cta-label">{UI.language.es}</span>
                </button>
                <button
                  type="button"
                  onClick={() => startQuiz("en")}
                  className="glass-cta"
                >
                  <span className="glass-cta-label">{UI.language.en}</span>
                </button>
              </div>
              <div className="mt-12 w-screen -ml-[50vw] left-1/2 relative">
                <ToolsMarquee language="en" />
              </div>
            </div>
          </div>
        )}

        {screen === "quiz" && language && QUESTIONS[currentQuestion] && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px]">
            <header className="mb-5 w-full shrink-0">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[14px] text-[#365cff]">
                <span>
                  {UI.quiz[language].levelOf(
                    QUESTIONS[currentQuestion]!.level + 1,
                  )}
                </span>
                <span>
                  {UI.quiz[language].questionOf(
                    currentQuestion + 1,
                    totalQuestions,
                  )}
                </span>
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
              <div className="rounded-2xl bg-white px-6 py-8 sm:px-10 sm:py-11">
                {(() => {
                  const q = QUESTIONS[currentQuestion]!;
                  const full = LEVEL_LABELS[q.level]![language];
                  const { number, name } = splitLevelLabel(full);
                  const text = language === "es" ? q.es : q.en;
                  return (
                    <>
                      <p className="font-serif text-[28px] font-bold leading-tight text-[#1f36a9]">
                        {number}
                      </p>
                      <p className="mt-1 font-sans text-[15px] font-semibold italic text-[#4e6bff]">
                        {name}
                      </p>
                      <p className="mt-6 min-h-14 font-sans text-[15px] font-normal leading-[1.6] text-[#2a2a2a] sm:min-h-14 sm:text-[17px]">
                        {text}
                      </p>
                      <div className="mt-10 flex flex-wrap justify-center gap-[14px]">
                        <button
                          type="button"
                          onClick={() => answerQuestion(true)}
                          className="rounded-[10px] bg-[#365cff] px-8 py-3 text-[15px] font-bold tracking-[0.07em] text-white transition-colors hover:bg-[#2b4cf0] sm:px-12 sm:py-[14px]"
                        >
                          {UI.quiz[language].yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => answerQuestion(false)}
                          className="rounded-[10px] border-[1.5px] border-[#cbd2f4] bg-white px-8 py-3 text-[15px] font-bold tracking-[0.07em] text-[#22348a] transition-colors hover:bg-[#f2f4ff] sm:px-12 sm:py-[14px]"
                        >
                          {UI.quiz[language].no}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            </div>
          </div>
        )}

        {screen === "email" && language && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px] rounded-2xl bg-white px-6 py-8 sm:px-10 sm:py-11">
              <h2 className="font-sans text-2xl font-bold text-[#1f36a9]">
                {UI.email[language].title}
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#333]">
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
                className="mt-6 w-full rounded-lg border border-[#d2d8f4] px-4 py-3 font-sans text-[15px] text-[#111] outline-none focus-visible:ring-2 focus-visible:ring-[#365cff] focus-visible:ring-offset-2"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">
                  {UI.email[language].invalidEmail}
                </p>
              )}
              <button
                type="button"
                onClick={() => void submitEmail()}
                className="mt-6 w-full rounded-[10px] bg-[#365cff] py-[14px] text-[15px] font-bold tracking-[0.07em] text-white transition-colors hover:bg-[#2b4cf0]"
              >
                {UI.email[language].submit}
              </button>
              <p className="mt-4 text-center text-xs leading-relaxed text-[#666]">
                {UI.email[language].privacy}
              </p>
              <button
                type="button"
                onClick={skipEmail}
                className="mt-6 w-full text-center font-sans text-sm text-[#999] underline"
              >
                {UI.email[language].skip}
              </button>
            </div>
          </div>
        )}

        {screen === "results" && language && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[600px] rounded-2xl bg-white px-6 py-8 text-left sm:px-10 sm:py-11">
              <div className="border-b border-[#eee] pb-8 text-center">
                <p className="font-serif text-3xl font-bold text-[#1f36a9] sm:text-4xl">
                  {resultLevelNumber}
                </p>
                <p className="mt-2 font-sans text-[15px] font-semibold italic text-[#4e6bff]">
                  {resultLevelName}
                </p>
              </div>

              <div className="mt-8 rounded-[10px] bg-[#eef1ff] px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-[15px]">
                  <span className="text-[#333]">
                    {UI.results[language].affirmativeLabel}
                  </span>
                  <span className="font-bold text-[#111]">
                    {UI.results[language].scoreOf(score, answers.length)}
                  </span>
                </div>
                <div className="h-[5px] w-full rounded-full bg-[#d7ddfb]">
                  <div
                    className="h-[5px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
                    style={{
                      width:
                        answers.length > 0
                          ? `${(score / answers.length) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
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

              <div className="mt-10 rounded-[10px] border border-[#d8defa] px-5 py-[18px]">
                <p className="font-sans text-[15px] font-semibold text-[#1f36a9]">
                  {UI.results[language].newsletterTitle}
                </p>
                <p className="mt-1 font-sans text-sm text-[#555]">
                  {UI.results[language].newsletterSubtitle}
                </p>
                <a
                  href={NEWSLETTER_URL}
                  className="mt-4 flex w-full items-center justify-center rounded-[10px] bg-[#365cff] py-3 text-center text-[15px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  {UI.results[language].newsletterCta}
                </a>
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
      <FomoCounter language={language ?? "en"} />
    </div>
  );
}
