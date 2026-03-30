export function getResultLevel(score: number, total: number): number {
  if (total <= 0) return 0;
  const pct = score / total;
  if (pct < 0.25) return 0;
  if (pct < 0.5) return 1;
  if (pct < 0.75) return 2;
  if (pct < 0.875) return 3;
  return 4;
}
