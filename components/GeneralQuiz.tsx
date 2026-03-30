"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type Language,
  LEVEL_LABELS,
  QUESTIONS,
  RESULT_COPY,
  UI,
} from "@/lib/content";
import { getResultLevel } from "@/lib/scoring";
import { BEEHIIV_ENDPOINT, NEWSLETTER_URL } from "@/lib/config";
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
} from "@/lib/sessionState";

type Screen = "quiz" | "email" | "results";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(" — ");
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(" — ") };
  }
  return { number: label, name: "" };
}

export default function GeneralQuiz({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const router = useRouter();
  const [language] = useState<Language>(initialLanguage);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [screen, setScreen] = useState<Screen>("quiz");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (
      persisted &&
      persisted.assessmentType === "general" &&
      persisted.answers.length > 0 &&
      persisted.answers.length < QUESTIONS.length
    ) {
      setCurrentQuestion(persisted.currentQuestion);
      setAnswers(persisted.answers);
    }
    setHydrated(true);
  }, []);

  const totalQuestions = QUESTIONS.length;

  const changeScreen = useCallback((next: Screen) => {
    setScreen(next);
    window.history.replaceState(null, "", window.location.href);
  }, []);

  const persist = useCallback(
    (q: number, a: number[]) => {
      savePersistedState({
        assessmentType: "general",
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
        changeScreen("email");
      } else {
        setCurrentQuestion(nextQ);
        persist(nextQ, nextAnswers);
        window.history.replaceState(null, "", window.location.href);
      }
    },
    [answers, currentQuestion, totalQuestions, persist, changeScreen],
  );

  const score = answers.reduce((sum, v) => sum + v, 0);
  const resultLevel =
    answers.length > 0 ? getResultLevel(score, answers.length) : 0;
  const resultLabel = LEVEL_LABELS[resultLevel]![language];
  const { number: resultLevelNumber, name: resultLevelName } =
    splitLevelLabel(resultLabel);

  const quizProgressPct =
    totalQuestions > 0
      ? ((currentQuestion + 1) / totalQuestions) * 100
      : 0;

  const currentQ = QUESTIONS[currentQuestion];

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
          body: JSON.stringify({
            email: trimmed,
            language,
            assessmentType: "general",
            score,
            resultLevel,
          }),
        });
      } catch {
        /* advance regardless */
      }
    }
    clearPersistedState();
    changeScreen("results");
  };

  const skipEmail = () => {
    clearPersistedState();
    changeScreen("results");
  };

  const restart = () => {
    clearPersistedState();
    router.push("/assessment");
  };

  if (!hydrated) return null;

  return (
    <>
      {screen === "quiz" && currentQ && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px]">
            <header className="mb-5 w-full shrink-0">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[14px] text-[#365cff]">
                <span>
                  {UI.quiz[language].levelOf(
                    (QUESTIONS[currentQuestion] as { level: number }).level + 1,
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
              <div className="glass-quiz-card px-6 py-8 sm:px-10 sm:py-11">
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
                      <p className="mt-6 min-h-14 font-sans text-[15px] font-normal leading-[1.6] text-[#2a2a2a]/80 sm:min-h-14 sm:text-[17px]">
                        {text}
                      </p>
                      <div className="mt-10 flex flex-wrap justify-center gap-[14px]">
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
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "email" && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="glass-quiz-card w-full max-w-[600px] px-6 py-8 sm:px-10 sm:py-11">
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
              <p className="mt-2 text-sm text-red-600">
                {UI.email[language].invalidEmail}
              </p>
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

      {screen === "results" && (
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
              onClick={restart}
              className="mt-8 w-full text-center font-sans text-sm text-[#999] underline"
            >
              {UI.results[language].again}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
