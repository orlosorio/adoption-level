export interface BenchmarkResult {
  totalRespondents: number;
  overall: number;
  country: number;
  companyType: number;
  industry: number;
}

/**
 * Seed values used for the blurred teaser (BenchmarkTeaser).
 * Deliberately non-round to appear realistic.
 */
export const SEED_BENCHMARK: BenchmarkResult = {
  totalRespondents: 1247,
  overall: 71,
  country: 81,
  companyType: 74,
  industry: 68,
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic "mock" benchmark based on user score and demographics.
 * Phase 1 only — replaced by real DB percentile in Phase 2.
 */
export function computeMockBenchmark(
  score: number,
  maxScore: number,
  country: string,
  companyType: string,
  industry: string,
): BenchmarkResult {
  const pct = maxScore > 0 ? score / maxScore : 0;
  const base = Math.round(pct * 60 + 20);

  const clamp = (n: number) => Math.max(12, Math.min(97, n));

  const overallOffset = (hash("overall" + score) % 11) - 5;
  const countryOffset = (hash(country + score) % 13) - 6;
  const companyOffset = (hash(companyType + score) % 11) - 5;
  const industryOffset = (hash(industry + score) % 15) - 7;

  return {
    totalRespondents: 1247 + (hash(country) % 300),
    overall: clamp(base + overallOffset),
    country: clamp(base + countryOffset + 3),
    companyType: clamp(base + companyOffset - 2),
    industry: clamp(base + industryOffset + 1),
  };
}
