'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import type { RoleId } from '@/lib/roles';
import TypeSelector, { type AssessmentType } from './type-selector';
import RoleSelector from './role-selector';
import ToolsMarquee from './tools-marquee';
import HeroAI, { heroAiStyles } from './hero-ai';
import glass from './glass.module.css';

type Screen = 'type-selector' | 'language' | 'role-selector';

export default function AssessmentEntry({ errorParam }: { errorParam?: string | null }) {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('language');
  const [language, setLanguage] = useState<Language | null>(null);

  const pickLanguage = (lang: Language) => {
    setLanguage(lang);
    setScreen('type-selector');
  };

  const selectAssessmentType = (type: AssessmentType) => {
    const lang = language ?? 'es';
    if (type === 'general') {
      router.push(`/assessment/general?lang=${lang}`);
    } else if (type === 'company') {
      router.push(`/assessment/company?lang=${lang}`);
    } else {
      setScreen('role-selector');
    }
  };

  const selectRole = (roleId: RoleId) => {
    const lang = language ?? 'es';
    router.push(`/assessment/role/${roleId}?lang=${lang}`);
  };

  return (
    <>
      {errorParam === 'invalid-role' && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-center text-sm text-red-700 backdrop-blur">
          That role doesn&apos;t exist. Please choose from the options below.
        </div>
      )}

      {screen === 'type-selector' && (
        <TypeSelector
          language={language ?? 'es'}
          onSelect={selectAssessmentType}
          onLanguageChange={setLanguage}
        />
      )}

      {screen === 'language' && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-[500px] text-center">
            <h1 className="mb-[clamp(8px,1.5vh,20px)] flex flex-col items-center text-center">
              <HeroAI />
              <span className={heroAiStyles.adoption}>Adoption</span>
              <hr className={heroAiStyles.rule} />
              <span className={heroAiStyles.subtitle}>Self-Assessment</span>
            </h1>
            <p className="mb-[clamp(10px,2vh,24px)] font-sans text-[14px] leading-relaxed text-[#4d5b9a] sm:text-[15px]">
              {UI.language.subtitle}
            </p>
            <p className="mb-[clamp(14px,2.5vh,28px)] font-sans text-[13px] font-semibold text-[#365cff]/80">
              {UI.language.meta}
            </p>
            <div className="flex flex-row justify-center gap-4 sm:gap-5">
              <button type="button" onClick={() => pickLanguage('en')} className={glass.cta}>
                <span className={glass.ctaLabel}>{UI.language.en}</span>
              </button>
              <button type="button" onClick={() => pickLanguage('es')} className={glass.cta}>
                <span className={glass.ctaLabel}>{UI.language.es}</span>
              </button>
            </div>
            <div className="relative left-1/2 mt-[clamp(20px,4vh,48px)] -ml-[50vw] w-screen">
              <ToolsMarquee language="en" />
            </div>
          </div>
        </div>
      )}

      {screen === 'role-selector' && (
        <RoleSelector language={language ?? 'es'} onSelect={selectRole} />
      )}
    </>
  );
}
