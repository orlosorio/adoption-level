// Universal band thresholds — all quizzes use 0/20/40/60/80/100.
export const BAND_THRESHOLDS_PCT = [0, 20, 40, 60, 80, 100] as const;

export type BandOrdinal = 0 | 1 | 2 | 3 | 4;

export function getBandOrdinal(score: number, max: number): BandOrdinal {
  if (max <= 0) return 0;
  const pct = (score / max) * 100;
  return Math.min(Math.floor(pct / 20), 4) as BandOrdinal;
}
