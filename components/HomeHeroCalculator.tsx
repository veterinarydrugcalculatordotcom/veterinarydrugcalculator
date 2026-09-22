'use client';

import { useState } from 'react';
import { formatNumber, toKg, WeightUnit } from '@/lib/units';

export default function HomeHeroCalculator() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [dose, setDose] = useState('');
  const [conc, setConc] = useState('');
  const [out, setOut] = useState<{ mg: number; ml: number | null } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const w = Number(weight);
    const d = Number(dose);
    const c = Number(conc);
    if (!(w > 0) || !(d > 0)) {
      setErr('Enter positive weight and dose.');
      return;
    }
    const kg = toKg(w, unit);
    const totalMg = kg * d;
    const ml = c > 0 ? totalMg / c : null;
    setOut({ mg: totalMg, ml });
  }

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-ink-900">Quick dose calculator</h2>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink-400">
          mg/kg &rarr; mg &rarr; mL
        </span>
      </div>

      <form onSubmit={run} className="mt-5 space-y-3.5">
        <div>
          <label className="text-xs font-medium text-ink-700">Body weight</label>
          <div className="mt-1.5 flex">
            <input
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 12"
              className="w-full rounded-l-lg border border-ink-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as WeightUnit)}
              className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-700">Dose rate</label>
          <div className="mt-1.5 flex">
            <input
              inputMode="decimal"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              placeholder="e.g. 5"
              className="w-full rounded-l-lg border border-ink-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
              mg/kg
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-700">
            Concentration <span className="text-ink-400">(optional)</span>
          </label>
          <div className="mt-1.5 flex">
            <input
              inputMode="decimal"
              value={conc}
              onChange={(e) => setConc(e.target.value)}
              placeholder="e.g. 50"
              className="w-full rounded-l-lg border border-ink-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
              mg/mL
            </span>
          </div>
        </div>

        <button className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition">
          Calculate
        </button>
      </form>

      {err && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          {err}
        </p>
      )}

      {out && (
        <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-brand-700">Result</div>
          <div className="mt-1 font-serif text-3xl text-ink-900">
            {formatNumber(out.mg)} mg
          </div>
          {out.ml != null && (
            <div className="mt-1 text-sm text-ink-700">
              = {formatNumber(out.ml)} mL at the entered concentration
            </div>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-ink-600">
            Educational calculation only. Verify dose, route and concentration against a
            current reference and veterinary judgment.
          </p>
        </div>
      )}
    </div>
  );
}