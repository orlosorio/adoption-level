"use client";

import { useCallback, useState } from "react";
import type { Language } from "@/lib/content";
import { UI } from "@/lib/content";
import type { BenchmarkResult } from "@/lib/benchmarkMock";
import { computeMockBenchmark } from "@/lib/benchmarkMock";
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
    changeScreen("results");
  }, [changeScreen]);

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
    (data: DemographicsData) => {
      setDemographics(data);
      setHasCompletedDemographics(true);

      const benchmark = computeMockBenchmark(
        score,
        maxScore,
        data.country,
        data.companyType,
        data.industry,
      );

      changeScreen("calculating");

      setTimeout(() => {
        setBenchmarkData(benchmark);
        changeScreen("results");
      }, 1500);
    },
    [score, maxScore, changeScreen],
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
