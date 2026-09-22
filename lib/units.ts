export type WeightUnit = 'kg' | 'lb';
export type MassUnit = 'mg' | 'mcg' | 'g';
export type VolumeUnit = 'mL' | 'L';

export const KG_PER_LB = 0.45359237;

export function lbToKg(lb: number) { return lb * KG_PER_LB; }
export function kgToLb(kg: number) { return kg / KG_PER_LB; }

export function toKg(value: number, unit: WeightUnit): number {
  return unit === 'kg' ? value : lbToKg(value);
}

export function toMg(value: number, unit: MassUnit): number {
  switch (unit) {
    case 'mg': return value;
    case 'mcg': return value / 1000;
    case 'g': return value * 1000;
  }
}

export function toMgPerMl(value: number, unit: 'mg/mL' | 'mcg/mL' | 'g/mL'): number {
  switch (unit) {
    case 'mg/mL': return value;
    case 'mcg/mL': return value / 1000;
    case 'g/mL': return value * 1000;
  }
}

export function formatNumber(n: number, digits = 3): string {
  if (!Number.isFinite(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 1) return n.toFixed(digits);
  if (abs >= 0.01) return n.toFixed(digits + 1);
  return n.toExponential(2);
}