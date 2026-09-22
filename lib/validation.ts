export function requirePositive(value: unknown, label: string): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) throw new Error(`${label} must be a number.`);
  if (n <= 0) throw new Error(`${label} must be greater than zero.`);
  return n;
}

export function safeNumber(value: unknown, fallback = NaN): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}