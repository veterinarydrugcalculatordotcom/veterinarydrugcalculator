import { toKg, toMg, toMgPerMl, WeightUnit, MassUnit } from './units';

export interface DoseInput {
  weight: number;
  weightUnit: WeightUnit;
  dosePerKg: number;
  doseUnit: MassUnit;
  concentration: number;
  concentrationUnit: 'mg/mL' | 'mcg/mL' | 'g/mL';
}

export interface DoseResult {
  weightKg: number;
  totalMg: number;
  concentrationMgPerMl: number;
  volumeMl: number | null;
}

export function calculateDose(input: DoseInput): DoseResult | { error: string } {
  const { weight, weightUnit, dosePerKg, doseUnit, concentration, concentrationUnit } = input;

  if (!Number.isFinite(weight) || weight <= 0) return { error: 'Weight must be a positive number.' };
  if (!Number.isFinite(dosePerKg) || dosePerKg <= 0) return { error: 'Dose must be a positive number.' };

  const weightKg = toKg(weight, weightUnit);
  const doseMgPerKg = toMg(dosePerKg, doseUnit);
  const totalMg = doseMgPerKg * weightKg;

  const concMgPerMl = toMgPerMl(concentration, concentrationUnit);
  const volumeMl = concMgPerMl > 0 ? totalMg / concMgPerMl : null;

  return {
    weightKg,
    totalMg,
    concentrationMgPerMl: concMgPerMl,
    volumeMl,
  };
}

export function calculateFluidRate(weightKg: number, mlPerKgPerDay: number, hours: number) {
  if (!(weightKg > 0) || !(mlPerKgPerDay > 0) || !(hours > 0)) return null;
  const totalPerDay = weightKg * mlPerKgPerDay;
  return totalPerDay / hours;
}

export function calculateCRI(params: {
  weightKg: number;
  doseMcgPerKgPerMin: number;
  concentrationMgPerMl: number;
}): number | null {
  const { weightKg, doseMcgPerKgPerMin, concentrationMgPerMl } = params;
  if (!(weightKg > 0) || !(doseMcgPerKgPerMin > 0) || !(concentrationMgPerMl > 0)) return null;
  const mgPerMin = (doseMcgPerKgPerMin * weightKg) / 1000;
  const mlPerMin = mgPerMin / concentrationMgPerMl;
  return mlPerMin * 60;
}