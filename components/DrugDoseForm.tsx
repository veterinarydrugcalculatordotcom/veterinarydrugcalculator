'use client';

import { useMemo, useState } from 'react';
import { DoseEntry, DrugRecord, Route, Species } from '@/lib/drugs';
import { calculateDose, DoseResult } from '@/lib/calculations';
import { formatNumber } from '@/lib/units';
import SafetyNotice from './SafetyNotice';
import ReferenceBox from './ReferenceBox';

interface Props {
  drug: DrugRecord;
  doses: DoseEntry[];
}

export default function DrugDoseForm({ drug, doses }: Props) {
  const availableSpecies = useMemo(
    () => Array.from(new Set(doses.map((d) => d.species))),
    [doses]
  );
  const [species, setSpecies] = useState<Species | ''>(availableSpecies[0] ?? '');
  const routes = useMemo(
    () =>
      species
        ? Array.from(new Set(doses.filter((d) => d.species === species).map((d) => d.route)))
        : [],
    [doses, species]
  );
  const [route, setRoute] = useState<Route | ''>('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [doseRate, setDoseRate] = useState('');
  const [concentration, setConcentration] = useState('');
  const [concUnit, setConcUnit] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mg/mL');
  const [result, setResult] = useState<DoseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const referenceEntry = useMemo(() => {
    if (!species) return undefined;
    return doses.find((d) => d.species === species && (!route || d.route === route) && d.verified);
  }, [doses, species, route]);

  if (!availableSpecies.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-slate-700">
        This information is not currently available in our verified reference database.
      </div>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!species) { setError('Select a species.'); return; }
    if (!route) { setError('Select a verified route.'); return; }
    if (!referenceEntry) {
      setError('No verified reference dose is available for this species and route.');
      return;
    }

    const w = Number(weight);
    const d = Number(doseRate);
    const c = Number(concentration);

    if (!Number.isFinite(w) || w <= 0) { setError('Enter a valid positive weight.'); return; }
    if (!Number.isFinite(d) || d <= 0) { setError('Enter a valid positive dose.'); return; }
    if (!Number.isFinite(c) || c <= 0) { setError('Enter a valid positive concentration.'); return; }

    const out = calculateDose({
      weight: w,
      weightUnit,
      dosePerKg: d,
      doseUnit: 'mg',
      concentration: c,
      concentrationUnit: concUnit,
    });

    if ('error' in out) { setError(out.error); return; }
    setResult(out);
  }

  function onReset() {
    setWeight('');
    setDoseRate('');
    setConcentration('');
    setResult(null);
    setError(null);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-800">Species</span>
          <select
            required
            value={species}
            onChange={(e) => { setSpecies(e.target.value as Species); setRoute(''); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {availableSpecies.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-800">Route (verified)</span>
          <select
            required
            value={route}
            onChange={(e) => setRoute(e.target.value as Route)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="">Select…</option>
            {routes.map((r) => (<option key={r} value={r}>{r}</option>))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-800">Weight</span>
          <div className="mt-1 flex">
            <input
              inputMode="decimal"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-l-md border border-slate-300 px-3 py-2"
              placeholder="e.g. 12"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
              className="rounded-r-md border border-l-0 border-slate-300 px-2 py-2 bg-slate-50"
              aria-label="Weight unit"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-800">
            Dose rate (mg/kg)
            {referenceEntry
              ? ` · reference ${referenceEntry.doseMin}–${referenceEntry.doseMax} ${referenceEntry.doseUnit}/kg`
              : ''}
          </span>
          <input
            inputMode="decimal"
            required
            value={doseRate}
            onChange={(e) => setDoseRate(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="e.g. 5"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-800">Concentration</span>
          <div className="mt-1 flex">
            <input
              inputMode="decimal"
              required
              value={concentration}
              onChange={(e) => setConcentration(e.target.value)}
              className="w-full rounded-l-md border border-slate-300 px-3 py-2"
              placeholder="e.g. 50"
            />
            <select
              value={concUnit}
              onChange={(e) => setConcUnit(e.target.value as any)}
              className="rounded-r-md border border-l-0 border-slate-300 px-2 py-2 bg-slate-50"
              aria-label="Concentration unit"
            >
              <option value="mg/mL">mg/mL</option>
              <option value="mcg/mL">mcg/mL</option>
              <option value="g/mL">g/mL</option>
            </select>
          </div>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-slate-900">Calculated result</h3>
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-600">Weight</dt>
              <dd className="font-medium text-slate-900">{formatNumber(result.weightKg)} kg</dd>
            </div>
            <div>
              <dt className="text-slate-600">Total dose</dt>
              <dd className="font-medium text-slate-900">{formatNumber(result.totalMg)} mg</dd>
            </div>
            <div>
              <dt className="text-slate-600">Concentration</dt>
              <dd className="font-medium text-slate-900">{formatNumber(result.concentrationMgPerMl)} mg/mL</dd>
            </div>
            <div>
              <dt className="text-slate-600">Calculated volume</dt>
              <dd className="font-medium text-slate-900">
                {result.volumeMl == null ? '—' : `${formatNumber(result.volumeMl)} mL`}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-slate-600">
            Calculated volume based on the entered weight, dose rate and concentration. This is a mathematical
            result — it does not determine whether the medication, dose or route is clinically appropriate.
          </p>
          <div className="mt-3"><SafetyNotice /></div>
          {referenceEntry && (
            <div className="mt-3">
              <ReferenceBox references={[referenceEntry.reference]} />
            </div>
          )}
        </div>
      )}

      {referenceEntry?.frequency && (
        <p className="mt-3 text-xs text-slate-600">
          Reference frequency (source-verified): {referenceEntry.frequency}
        </p>
      )}
    </form>
  );
}