"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Language } from "@/lib/content";
import { UI } from "@/lib/content";
import type { RoleId } from "@/lib/roles";
import TypeSelector from "@/components/TypeSelector";
import RoleSelector from "@/components/RoleSelector";
import ToolsMarquee from "@/components/ToolsMarquee";
import HeroAI from "@/components/HeroAI";

type Screen = "type-selector" | "language" | "role-selector";
type AssessmentType = "general" | "role";

export default function AssessmentEntry({
  errorParam,
}: {
  errorParam?: string | null;
}) {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("language");
  const [assessmentType, setAssessmentType] = useState<AssessmentType>("general");

  const selectAssessmentType = (type: AssessmentType) => {
    setAssessmentType(type);
    if (type === "role") {
      setScreen("role-selector");
    } else {
      setScreen("language");
    }
  };

  const startGeneral = (lang: Language) => {
    router.push(`/assessment/general?lang=${lang}`);
  };

  const selectRole = (roleId: RoleId) => {
    router.push(`/assessment/role/${roleId}`);
  };

  return (
    <>
      {errorParam === "invalid-role" && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-center text-sm text-red-700 backdrop-blur">
          That role doesn&apos;t exist. Please choose from the options below.
        </div>
      )}

      {screen === "type-selector" && (
        <TypeSelector onSelect={selectAssessmentType} />
      )}

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
                onClick={() => startGeneral("es")}
                className="glass-cta"
              >
                <span className="glass-cta-label">{UI.language.es}</span>
              </button>
              <button
                type="button"
                onClick={() => startGeneral("en")}
                className="glass-cta"
              >
                <span className="glass-cta-label">{UI.language.en}</span>
              </button>
            </div>
            <div className="relative left-1/2 mt-12 -ml-[50vw] w-screen">
              <ToolsMarquee language="en" />
            </div>
            <button
              type="button"
              onClick={() => setScreen("role-selector")}
              className="mt-10 cursor-pointer font-sans text-[13px] text-[#365cff]/40 underline decoration-[#365cff]/15 transition-colors hover:text-[#365cff]/70"
            >
              Or take a role-specific assessment &rarr;
            </button>
          </div>
        </div>
      )}

      {screen === "role-selector" && (
        <RoleSelector language="es" onSelect={selectRole} />
      )}
    </>
  );
}
