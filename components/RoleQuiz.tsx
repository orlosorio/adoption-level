"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type Language,
  LEVEL_LABELS,
  UI,
} from "@/lib/content";
import { getRoleResultLevel } from "@/lib/scoring";
import { BEEHIIV_ENDPOINT } from "@/lib/config";
import { COUNTRIES, COMPANY_TYPES, AGE_RANGES } from "@/lib/demographics";
import { ROLE_ASSESSMENTS, ROLE_NAMES, type RoleId } from "@/lib/roles";
import { ROLE_RESULT_COPY } from "@/lib/roleResults";
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
} from "@/lib/sessionState";
import ScaleButtons from "@/components/ScaleButtons";
import HeroAI from "@/components/HeroAI";
import ToolsMarquee from "@/components/ToolsMarquee";

type Screen = "language" | "quiz" | "email" | "results" | "demographics" | "coming-soon";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitLevelLabel(label: string): { number: string; name: string } {
  const parts = label.split(" — ");
  if (parts.length >= 2) {
    return { number: parts[0]!, name: parts.slice(1).join(" — ") };
  }
  return { number: label, name: "" };
}

export default function RoleQuiz({
  roleId,
  initialLanguage,
}: {
  roleId: RoleId;
  initialLanguage: Language | null;
}) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language | null>(initialLanguage);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [screen, setScreen] = useState<Screen>(
    initialLanguage ? "quiz" : "language",
  );
  const [hydrated, setHydrated] = useState(false);
  const [demoCountry, setDemoCountry] = useState("");
  const [demoCompany, setDemoCompany] = useState("");
  const [demoAge, setDemoAge] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  const roleAssessment = ROLE_ASSESSMENTS[roleId];
  const roleQuestions = roleAssessment.questions;
  const totalQuestions = roleQuestions.length;

  useEffect(() => {
    const persisted = loadPersistedState();
    if (
      persisted &&
      persisted.assessmentType === "role" &&
      persisted.roleId === roleId &&
      persisted.answers.length > 0 &&
      persisted.answers.length < totalQuestions
    ) {
      setLanguage(persisted.language);
      setCurrentQuestion(persisted.currentQuestion);
      setAnswers(persisted.answers);
      setScreen("quiz");
    }
    setHydrated(true);
  }, [roleId, totalQuestions]);

  const changeScreen = useCallback((next: Screen) => {
    setScreen(next);
    window.history.replaceState(null, "", window.location.href);
  }, []);

  const persist = useCallback(
    (q: number, a: number[]) => {
      if (!language) return;
      savePersistedState({
        assessmentType: "role",
        roleId,
        language,
        currentQuestion: q,
        answers: a,
      });
    },
    [language, roleId],
  );

  const startQuiz = (lang: Language) => {
    setLanguage(lang);
    setCurrentQuestion(0);
    setAnswers([]);
    changeScreen("quiz");
  };

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
  const resultLevel =
    answers.length > 0 ? getRoleResultLevel(score, maxScore) : 0;
  const resultLabel = language != null ? LEVEL_LABELS[resultLevel]![language] : "";
  const { number: resultLevelNumber, name: resultLevelName } =
    splitLevelLabel(resultLabel);

  const quizProgressPct =
    totalQuestions > 0
      ? ((currentQuestion + 1) / totalQuestions) * 100
      : 0;

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
            assessmentType: "role",
            roleId,
            roleName: language ? ROLE_NAMES[roleId][language] : "",
            totalScore: score,
            maxScore,
            averageScore: (score / totalQuestions).toFixed(1),
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

  const submitDemographics = async () => {
    if (
      BEEHIIV_ENDPOINT &&
      BEEHIIV_ENDPOINT !== "YOUR_BEEHIIV_ENDPOINT"
    ) {
      try {
        await fetch(BEEHIIV_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "demographics",
            language,
            assessmentType: "role",
            roleId,
            roleName: language ? ROLE_NAMES[roleId][language] : "",
            totalScore: score,
            maxScore,
            averageScore: (score / totalQuestions).toFixed(1),
            resultLevel,
            country: demoCountry,
            companyType: demoCompany,
            ageRange: demoAge,
          }),
        });
      } catch {
        /* advance regardless */
      }
    }
    changeScreen("coming-soon");
  };

  const skipDemographics = () => {
    changeScreen("coming-soon");
  };

  const restart = () => {
    clearPersistedState();
    router.push("/assessment");
  };

  if (!hydrated) return null;

  return (
    <div className="quiz-in-progress contents">
      {screen === "language" && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px] text-center">
            <h1 className="hero-title mb-[clamp(8px,1.5vh,20px)]">
              <HeroAI />
              <span className="hero-title-adoption">Adoption</span>
              <hr className="hero-title-rule" />
              <span className="hero-title-assessment">Self-Assessment</span>
            </h1>
            <p className="mb-[clamp(4px,1vh,16px)] font-sans text-[15px] leading-relaxed text-[#4d5b9a] sm:text-base">
              {ROLE_NAMES[roleId].en} / {ROLE_NAMES[roleId].es}
            </p>
            <p className="mb-[clamp(8px,1.5vh,20px)] font-sans text-sm font-semibold text-[#365cff]/80">
              33 questions &middot; ~4 min &middot; Confidence scale
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <button
                type="button"
                onClick={() => startQuiz("en")}
                className="glass-cta"
              >
                <span className="glass-cta-label">{UI.language.en}</span>
              </button>
              <button
                type="button"
                onClick={() => startQuiz("es")}
                className="glass-cta"
              >
                <span className="glass-cta-label">{UI.language.es}</span>
              </button>
            </div>
            <div className="relative left-1/2 mt-[clamp(8px,2vh,24px)] -ml-[50vw] w-screen">
              <ToolsMarquee language="en" />
            </div>
          </div>
        </div>
      )}

      {screen === "quiz" && language && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[600px]">
            <header className="mb-5 w-full shrink-0">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[14px] text-[#365cff]">
                <span>
                  {UI.quiz[language].levelOf(
                    roleQuestions[currentQuestion]!.level + 1,
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
              <div className="glass-quiz-card px-5 py-6 sm:px-8 sm:py-8">
                {(() => {
                  const q = roleQuestions[currentQuestion]!;
                  const { number, name } = splitLevelLabel(
                    q.levelLabel[language],
                  );
                  const text = q.statement[language];
                  return (
                    <>
                      <p className="font-serif text-[28px] font-bold leading-tight text-[#1f36a9]">
                        {number}
                      </p>
                      <p className="mt-1 font-sans text-[15px] font-semibold italic text-[#4e6bff]/50">
                        {name}
                      </p>
                      <p className="mt-6 min-h-14 font-sans text-[15px] font-semibold leading-[1.6] text-[#1f36a9] sm:min-h-14 sm:text-[20px]">
                        {text}
                      </p>
                      <ScaleButtons
                        onChange={answerQuestion}
                        language={language}
                      />
                      {currentQuestion > 0 && (
                        <button
                          type="button"
                          onClick={goBack}
                          className="quiz-back-link mt-6"
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

      {screen === "email" && language && (
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

      {screen === "results" && language && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="grid w-full max-w-[960px] grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
            {/* Left column -- results */}
            <div className="rounded-2xl bg-white px-6 py-8 text-left sm:px-10 sm:py-11">
              <div className="border-b border-[#eee] pb-8 text-center">
                <p className="font-serif text-3xl font-bold text-[#1f36a9] sm:text-4xl">
                  {resultLevelNumber}
                </p>
                <p className="mt-2 font-sans text-[15px] font-semibold italic text-[#4e6bff]">
                  {resultLevelName}
                </p>
                <p className="mt-2 font-sans text-xs tracking-[0.08em] text-[#8a9ff0]">
                  {ROLE_NAMES[roleId][language]}
                  {" · "}
                  {language === "es" ? "Escala de confianza" : "Confidence Scale"}
                </p>
              </div>

              <div className="mt-8 rounded-[10px] bg-[#eef1ff] px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-[15px]">
                  <span className="text-[#333]">
                    {language === "es" ? "Puntuación total" : "Total score"}
                  </span>
                  <span className="font-bold text-[#111]">
                    {score} / {maxScore}
                  </span>
                </div>
                <div className="h-[5px] w-full rounded-full bg-[#d7ddfb]">
                  <div
                    className="h-[5px] rounded-full bg-[#365cff] transition-[width] duration-[350ms] ease-out"
                    style={{
                      width:
                        maxScore > 0
                          ? `${(score / maxScore) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="avg-score-card">
                <div className="mb-2 flex items-center justify-between text-[14px]">
                  <span className="text-[#555]">
                    {language === "es"
                      ? "Promedio por pregunta"
                      : "Average score per question"}
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

              <p className="mt-8 font-sans text-[15px] leading-relaxed text-[#333]">
                {ROLE_RESULT_COPY[resultLevel]!.description[language]}
              </p>

              <div className="mt-8">
                <p className="font-sans text-sm font-bold text-[#111]">
                  {UI.results[language].nextStepHeading}
                </p>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#333]">
                  {ROLE_RESULT_COPY[resultLevel]!.nextStep[language]}
                </p>
              </div>
            </div>

            {/* Right column -- conversion */}
            <div className="results-cta-column flex flex-col gap-5">
              <div className="results-cta-card">
                <p className="font-sans text-lg font-bold text-[#1f36a9]">
                  {UI.results[language].ctaHeading}
                </p>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#555]">
                  {UI.results[language].ctaBody}
                </p>
                <p className="mt-5 font-sans text-[13px] font-semibold text-[#1f36a9]">
                  {UI.results[language].benchmarkTitle}
                </p>
                <p className="mt-1 font-sans text-[13px] text-[#777]">
                  {UI.results[language].benchmarkSubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => changeScreen("demographics")}
                  className="results-cta-btn mt-5"
                >
                  {UI.results[language].benchmarkCta}
                </button>
              </div>

              <button
                type="button"
                onClick={restart}
                className="w-full text-center font-sans text-sm text-[#999] underline"
              >
                {UI.results[language].again}
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "demographics" && language && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="glass-quiz-card w-full max-w-[600px] px-6 py-8 sm:px-10 sm:py-11">
            <h2 className="font-sans text-2xl font-bold text-[#1f36a9]">
              {UI.demographics[language].title}
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#2a2a2a]/70">
              {UI.demographics[language].subtitle}
            </p>

            <label className="mt-6 block">
              <span className="mb-1.5 block font-sans text-sm font-medium text-[#333]">
                {UI.demographics[language].countryLabel}
              </span>
              <select
                value={demoCountry}
                onChange={(e) => setDemoCountry(e.target.value)}
                className={`glass-select${demoCountry === "" ? " placeholder" : ""}`}
              >
                <option value="" disabled>
                  {UI.demographics[language].countryPlaceholder}
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c[language]}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-sans text-sm font-medium text-[#333]">
                {UI.demographics[language].companyLabel}
              </span>
              <select
                value={demoCompany}
                onChange={(e) => setDemoCompany(e.target.value)}
                className={`glass-select${demoCompany === "" ? " placeholder" : ""}`}
              >
                <option value="" disabled>
                  {UI.demographics[language].companyPlaceholder}
                </option>
                {COMPANY_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c[language]}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-sans text-sm font-medium text-[#333]">
                {UI.demographics[language].ageLabel}
              </span>
              <select
                value={demoAge}
                onChange={(e) => setDemoAge(e.target.value)}
                className={`glass-select${demoAge === "" ? " placeholder" : ""}`}
              >
                <option value="" disabled>
                  {UI.demographics[language].agePlaceholder}
                </option>
                {AGE_RANGES.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a[language]}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => void submitDemographics()}
              className="glass-answer-btn glass-answer-yes mt-8 w-full justify-center"
            >
              {UI.demographics[language].submit}
            </button>
            <button
              type="button"
              onClick={skipDemographics}
              className="mt-6 w-full text-center font-sans text-sm text-[#1f36a9]/30 underline decoration-[#1f36a9]/15 transition-colors hover:text-[#1f36a9]/50"
            >
              {UI.demographics[language].skip}
            </button>
          </div>
        </div>
      )}

      {screen === "coming-soon" && language && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="glass-quiz-card w-full max-w-[600px] px-6 py-8 text-center sm:px-10 sm:py-11">
            <p className="font-serif text-3xl font-bold text-[#1f36a9]">
              {UI.comingSoon[language].title}
            </p>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#2a2a2a]/80">
              {UI.comingSoon[language].body}
            </p>

            <div className="mt-8 rounded-[12px] border border-[#d8defa] bg-[#f5f7ff] px-5 py-5 text-center">
              <p className="font-sans text-[14px] font-semibold text-[#1f36a9]">
                {UI.comingSoon[language].shareHeading}
              </p>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#555]">
                {UI.comingSoon[language].shareBody}
              </p>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(window.location.origin + "/assessment");
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2500);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-[#365cff]/20 bg-white px-5 py-2.5 font-sans text-[14px] font-semibold text-[#365cff] transition-all hover:border-[#365cff]/40 hover:bg-[#f0f3ff]"
              >
                {shareCopied
                  ? UI.comingSoon[language].shareCopied
                  : UI.comingSoon[language].shareCta}
              </button>
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
    </div>
  );
}
