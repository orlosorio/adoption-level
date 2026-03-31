import type { Language } from "@/lib/content";

export interface SalaryRange {
  id: string;
  label: Record<Language, string>;
}

export const SALARY_RANGES: SalaryRange[] = [
  { id: "under-20k", label: { en: "Under $20K", es: "Menos de $20K" } },
  { id: "20k-50k", label: { en: "$20K – $50K", es: "$20K – $50K" } },
  { id: "50k-100k", label: { en: "$50K – $100K", es: "$50K – $100K" } },
  { id: "100k-150k", label: { en: "$100K – $150K", es: "$100K – $150K" } },
  { id: "150k-plus", label: { en: "$150K+", es: "$150K+" } },
];
