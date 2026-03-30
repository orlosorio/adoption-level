"use client";

import type { Language } from "@/lib/content";

export type AssessmentType = "general" | "role" | "company";

interface TypeSelectorProps {
  language: Language;
  onSelect: (type: AssessmentType) => void;
  onLanguageChange?: (lang: Language) => void;
}

const HEADING: Record<Language, string> = {
  en: "Choose your assessment",
  es: "Elige tu evaluación",
};

const RECOMMENDED_LABEL: Record<Language, string> = {
  en: "Recommended",
  es: "Recomendado",
};

const cards: {
  type: AssessmentType;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  stats: Record<Language, string>;
  recommended?: boolean;
  icon: string;
}[] = [
  {
    type: "general",
    title: { en: "General Assessment", es: "Evaluación General" },
    desc: {
      en: "How well are you using AI across your entire work life.",
      es: "Qué tan bien estás usando IA en toda tu vida laboral.",
    },
    stats: { en: "15 questions · ~5 min", es: "15 preguntas · ~5 min" },
    icon: "👤",
  },
  {
    type: "role",
    title: { en: "Role-Specific Assessment", es: "Evaluación por Rol" },
    desc: {
      en: "How well are you using AI in your specific discipline.",
      es: "Qué tan bien estás usando IA en tu disciplina específica.",
    },
    stats: {
      en: "33 questions · ~7 min",
      es: "33 preguntas · ~7 min",
    },
    recommended: true,
    icon: "🎯",
  },
  {
    type: "company",
    title: { en: "Company Assessment", es: "Evaluación Empresarial" },
    desc: {
      en: "How ready is your organization for AI adoption across 7 key dimensions.",
      es: "Qué tan preparada está tu organización para adoptar IA en 7 dimensiones clave.",
    },
    stats: { en: "35 questions · ~8 min", es: "35 preguntas · ~8 min" },
    icon: "🏢",
  },
];

export default function TypeSelector({
  language,
  onSelect,
  onLanguageChange,
}: TypeSelectorProps) {
  const other: Language = language === "es" ? "en" : "es";

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[920px] text-center">
        <h2 className="mb-6 font-sans text-lg font-semibold text-[#1f36a9]">
          {HEADING[language]}
        </h2>

        {onLanguageChange && (
          <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-[#1f36a9]/10 bg-white/40 p-1 text-[13px] font-medium backdrop-blur-md">
            <button
              type="button"
              onClick={() => onLanguageChange("es")}
              className={`rounded-full px-4 py-1.5 transition-all ${
                language === "es"
                  ? "bg-[#1f36a9] text-white shadow-sm"
                  : "text-[#1f36a9]/50 hover:text-[#1f36a9]/80"
              }`}
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-4 py-1.5 transition-all ${
                language === "en"
                  ? "bg-[#1f36a9] text-white shadow-sm"
                  : "text-[#1f36a9]/50 hover:text-[#1f36a9]/80"
              }`}
            >
              English
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <button
              key={card.type}
              type="button"
              role="button"
              tabIndex={0}
              onClick={() => onSelect(card.type)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(card.type);
                }
              }}
              className={`type-selector-card relative ${card.recommended ? "type-selector-card-recommended" : ""}`}
            >
              {card.recommended && (
                <span className="absolute -top-3 right-4 rounded-full bg-[#365cff] px-3 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-sm">
                  {RECOMMENDED_LABEL[language]}
                </span>
              )}
              <p className="mb-1 text-2xl" aria-hidden>{card.icon}</p>
              <p className="font-sans text-lg font-semibold text-[#1f36a9]">
                {card.title[language]}
              </p>
              <p className="mt-3 font-sans text-[15px] leading-[1.6] text-[#2a2a2a]/65">
                {card.desc[language]}
              </p>
              <p className="mt-4 font-sans text-sm text-[#1f36a9]/40">
                {card.stats[language]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
