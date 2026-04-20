'use client';

import { useState } from 'react';
import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import { COUNTRIES } from '@/lib/demographics';
import { SALARY_RANGES } from '@/lib/salaryRanges';
import { COMPANY_TYPES_V2 } from '@/lib/companyTypesV2';
import { INDUSTRIES } from '@/lib/industries';

export interface DemographicsData {
  country: string;
  salaryRange: string;
  companyType: string;
  industry: string;
}

interface DemographicsScreenProps {
  language: Language;
  onSubmit: (data: DemographicsData) => void;
  onSkip: () => void;
  step: number;
  totalSteps: number;
}

export default function DemographicsScreen({
  language,
  onSubmit,
  onSkip,
  step,
  totalSteps,
}: DemographicsScreenProps) {
  const copy = UI.postQuizDemographics[language];
  const [country, setCountry] = useState('');
  const [salary, setSalary] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [industry, setIndustry] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const next: Record<string, boolean> = {};
    if (!country) next.country = true;
    if (!salary) next.salary = true;
    if (!companyType) next.companyType = true;
    if (!industry) next.industry = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ country, salaryRange: salary, companyType, industry });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[560px]">
        <div className="pq-step-indicator mb-5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <span key={i} className={`pq-step-dot ${i < step ? 'pq-step-active' : ''}`} />
          ))}
          <span className="pq-step-label">{copy.step(step, totalSteps)}</span>
        </div>

        <div className="glass-quiz-card px-5 py-6 sm:px-8 sm:py-8">
          <h2 className="font-sans text-lg font-bold text-[#1f36a9] sm:text-xl">{copy.heading}</h2>
          <p className="mt-2 font-sans text-[13px] leading-[1.6] text-[#2a2a2a]/70 sm:text-[14px]">
            {copy.subtitle}
          </p>

          {/* Field 1 — Country */}
          <div className="demo-field mt-5">
            <label className="demo-label">{copy.countryLabel}</label>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setErrors((p) => ({ ...p, country: false }));
              }}
              className={`demo-select ${!country ? 'placeholder' : ''} ${errors.country ? 'demo-error' : ''}`}
            >
              <option value="" disabled>
                {copy.countryPlaceholder}
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Field 2 — Salary Range */}
          <div className="demo-field mt-4">
            <label className="demo-label">{copy.salaryLabel}</label>
            <p className="demo-helper">{copy.salaryHelper}</p>
            <div className="demo-salary-group" role="radiogroup" aria-label={copy.salaryLabel}>
              {SALARY_RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={salary === r.id}
                  onClick={() => {
                    setSalary(r.id);
                    setErrors((p) => ({ ...p, salary: false }));
                  }}
                  className={`demo-salary-btn ${salary === r.id ? 'demo-salary-selected' : ''} ${errors.salary ? 'demo-error' : ''}`}
                >
                  {r.label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Field 3 — Company Type */}
          <div className="demo-field mt-4">
            <label className="demo-label">{copy.companyLabel}</label>
            <div className="demo-company-grid" role="radiogroup" aria-label={copy.companyLabel}>
              {COMPANY_TYPES_V2.map((ct) => (
                <button
                  key={ct.id}
                  type="button"
                  role="radio"
                  aria-checked={companyType === ct.id}
                  onClick={() => {
                    setCompanyType(ct.id);
                    setErrors((p) => ({ ...p, companyType: false }));
                  }}
                  className={`demo-company-card ${companyType === ct.id ? 'demo-company-selected' : ''} ${errors.companyType ? 'demo-error' : ''}`}
                >
                  <span className="demo-company-icon">{ct.icon}</span>
                  <span className="demo-company-title">{ct.title[language]}</span>
                  <span className="demo-company-subtitle">{ct.subtitle[language]}</span>
                  <span className="demo-company-desc">{ct.desc[language]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Field 4 — Industry */}
          <div className="demo-field mt-4">
            <label className="demo-label">{copy.industryLabel}</label>
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setErrors((p) => ({ ...p, industry: false }));
              }}
              className={`demo-select ${!industry ? 'placeholder' : ''} ${errors.industry ? 'demo-error' : ''}`}
            >
              <option value="" disabled>
                {copy.industryPlaceholder}
              </option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.label[language]}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={handleSubmit} className="vprop-cta mt-6 w-full">
            {copy.submit}
          </button>
        </div>

        <button type="button" onClick={onSkip} className="vprop-skip mt-5">
          {copy.skip}
        </button>
      </div>
    </div>
  );
}
