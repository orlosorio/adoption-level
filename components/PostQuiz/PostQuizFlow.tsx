"use client";

import { useCallback, useState } from "react";
import type { Language } from "@/lib/content";
import { UI } from "@/lib/content";
import type { BenchmarkResult } from "@/lib/benchmarkMock";
import { computeMockBenchmark } from "@/lib/benchmarkMock";

interface SubmissionAnswer {
  questionId?: number;
  sortOrder?: number;
  value: number;
}
import { COUNTRIES } from "@/lib/demographics";
import { COMPANY_TYPES_V2 } from "@/lib/companyTypesV2";
import { INDUSTRIES } from "@/lib/industries";
import ValuePropScreen from "./ValuePropScreen";
import PostQuizEmailScreen from "./PostQuizEmailScreen";
import DemographicsScreen, { type DemographicsData } from "./DemographicsScreen";
import BenchmarkPanel from "./BenchmarkPanel";
import BenchmarkTeaser from "./BenchmarkTeaser";

type PostQuizScreen =
  | "value-prop"
  | "email"
  | "demographics"
  | "results"
  | "calculating";

interface PostQuizFlowProps {
  language: Language;
  assessmentType: "general" | "role" | "company";
  roleId?: string | null;
  score: number;
  maxScore: number;
  totalQuestions: number;
  resultLevel: number;
  resultsContent: React.ReactNode;
  onRestart: () => void;
  onEmailSubmit?: (payload: Record<string, unknown>) => Promise<void>;
  answers?: SubmissionAnswer[];
  dimensionScores?: { dim: string; score: number; max: number }[] | null;
}

export default function PostQuizFlow({
  language,
  assessmentType,
  roleId,
  score,
  maxScore,
  totalQuestions,
  resultLevel,
  resultsContent,
  onRestart,
  onEmailSubmit,
  answers: submissionAnswers,
  dimensionScores,
}: PostQuizFlowProps) {
  const [screen, setScreen] = useState<PostQuizScreen>("value-prop");
  const [email, setEmail] = useState<string | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkResult | null>(null);
  const [hasCompletedDemographics, setHasCompletedDemographics] = useState(false);

  const changeScreen = useCallback((next: PostQuizScreen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSkipToResults = useCallback(() => {
    // Submit without demographics (best-effort)
    if (submissionAnswers && submissionAnswers.length > 0) {
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentTypeId: assessmentType,
          roleId: roleId || null,
          language,
          email: email || null,
          totalScore: score,
          maxScore,
          resultLevel,
          dimensionScores: dimensionScores || null,
          answers: submissionAnswers,
        }),
      }).catch(() => {});
    }
    changeScreen("results");
  }, [assessmentType, roleId, language, email, score, maxScore, resultLevel, submissionAnswers, dimensionScores, changeScreen]);

  const handleEmailSubmit = useCallback(
    async (submittedEmail: string) => {
      setEmail(submittedEmail);
      if (onEmailSubmit) {
        try {
          await onEmailSubmit({
            email: submittedEmail,
            language,
            assessmentType,
            roleId,
            totalScore: score,
            maxScore,
            averageScore: (score / totalQuestions).toFixed(1),
            resultLevel,
          });
        } catch {
          /* advance regardless */
        }
      }
      changeScreen("demographics");
    },
    [language, assessmentType, roleId, score, maxScore, totalQuestions, resultLevel, onEmailSubmit, changeScreen],
  );

  const handleDemographicsSubmit = useCallback(
    async (data: DemographicsData) => {
      setDemographics(data);
      setHasCompletedDemographics(true);
      changeScreen("calculating");

      // 1. Submit to API (best-effort, don't block results)
      if (submissionAnswers && submissionAnswers.length > 0) {
        try {
          await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assessmentTypeId: assessmentType,
              roleId: roleId || null,
              language,
              email: email || null,
              country: data.country || null,
              salaryRange: data.salaryRange || null,
              companyType: data.companyType || null,
              industry: data.industry || null,
              totalScore: score,
              maxScore,
              resultLevel,
              dimensionScores: dimensionScores || null,
              answers: submissionAnswers,
            }),
          });
        } catch {
          // Submission failed — continue to show results anyway
        }
      }

      // 2. Fetch real benchmarks, fall back to mock
      try {
        const params = new URLSearchParams({
          type: assessmentType,
          score: String(score),
          maxScore: String(maxScore),
        });
        if (roleId) params.set("roleId", roleId);
        if (data.country) params.set("country", data.country);
        if (data.companyType) params.set("companyType", data.companyType);
        if (data.industry) params.set("industry", data.industry);

        const res = await fetch(`/api/benchmarks?${params}`);
        if (res.ok) {
          const benchmark: BenchmarkResult = await res.json();
          // Only use real data if we have enough submissions
          if (benchmark.totalRespondents >= 10) {
            setBenchmarkData(benchmark);
            changeScreen("results");
            return;
          }
        }
      } catch {
        // Benchmark fetch failed — fall back to mock
      }

      // Fallback to mock benchmark
      const benchmark = computeMockBenchmark(
        score,
        maxScore,
        data.country,
        data.companyType,
        data.industry,
      );
      setBenchmarkData(benchmark);
      changeScreen("results");
    },
    [score, maxScore, assessmentType, roleId, language, email, resultLevel, submissionAnswers, dimensionScores, changeScreen],
  );

  const handleUnlockFromResults = useCallback(() => {
    changeScreen("email");
  }, [changeScreen]);

  const getLabels = () => {
    if (!demographics) return { country: "", companyType: "", industry: "" };
    const countryEntry = COUNTRIES.find((c) => c.value === demographics.country);
    const companyEntry = COMPANY_TYPES_V2.find((c) => c.id === demographics.companyType);
    const industryEntry = INDUSTRIES.find((i) => i.id === demographics.industry);
    return {
      country: countryEntry?.[language] ?? demographics.country,
      companyType: companyEntry?.title[language] ?? demographics.companyType,
      industry: industryEntry?.label[language] ?? demographics.industry,
    };
  };

  if (screen === "value-prop") {
    return (
      <ValuePropScreen
        language={language}
        onContinue={() => changeScreen("email")}
        onSkip={handleSkipToResults}
      />
    );
  }

  if (screen === "email") {
    return (
      <PostQuizEmailScreen
        language={language}
        onSubmit={(e) => void handleEmailSubmit(e)}
        onSkip={handleSkipToResults}
        step={1}
        totalSteps={2}
      />
    );
  }

  if (screen === "demographics") {
    return (
      <DemographicsScreen
        language={language}
        onSubmit={handleDemographicsSubmit}
        onSkip={handleSkipToResults}
        step={2}
        totalSteps={2}
      />
    );
  }

  if (screen === "calculating") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-center">
          <div className="bench-calculating-spinner" />
          <p className="mt-4 font-sans text-[15px] font-semibold text-[#1f36a9]">
            {UI.benchmark[language].calculating}
          </p>
        </div>
      </div>
    );
  }

  // Screen: results
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[960px]">
        {/* Results content passed from the quiz component */}
        {resultsContent}

        {/* Benchmark section */}
        {hasCompletedDemographics && benchmarkData ? (
          <div className="bench-reveal mt-4">
            <BenchmarkPanel
              language={language}
              data={benchmarkData}
              labels={getLabels()}
            />
          </div>
        ) : (
          <div className="mt-4">
            <BenchmarkTeaser
              language={language}
              onUnlock={handleUnlockFromResults}
              onSkip={() => {}}
            />
          </div>
        )}

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
