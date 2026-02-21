export function nextDifficulty(current: number, score?: number) {
  if (typeof score !== 'number') return current;
  if (score >= 8.5) return Math.min(current + 1, 5);
  if (score <= 5.5) return Math.max(current - 1, 1);
  return current;
}
