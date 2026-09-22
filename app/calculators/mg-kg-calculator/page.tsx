'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { formatNumber, toKg, WeightUnit } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [dose, setDose] = useState('');
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const w = Number(weight);
    const d = Number(dose);
    if (!(w > 0) || !(d > 0)) {
      setErr('Enter positive numbers for weight and dose rate.');
      return;
    }
    const kg = toKg(w, unit);
    const totalMg = kg * d;
    setOut(`${formatNumber(totalMg)} mg total (based on ${formatNumber(kg)} kg × ${d} mg/kg)`);
  }

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
        { name: 'mg/kg calculator', href: '/calculators/mg-kg-calculator/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">mg/kg calculator</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Multiply a dose rate expressed in mg/kg by body weight in kg to get a total dose in mg.
      </p>

      <form onSubmit={run} className="mt-6 grid gap-4 sm:grid-cols-2 rounded-lg border border-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-sm font-medium">Weight</span>
          <div className="mt-1 flex">
            <input
              required
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-l-md border border-slate-300 px-3 py-2"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as WeightUnit)}
              className="rounded-r-md border border-l-0 border-slate-300 px-2 bg-slate-50"
              aria-label="Weight unit"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Dose rate (mg/kg)</span>
          <input
            required
            inputMode="decimal"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
            Calculate
          </button>
          <button
            type="button"
            onClick={() => { setWeight(''); setDose(''); setOut(null); setErr(null); }}
            className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        {err && (
          <p role="alert" className="sm:col-span-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
            {err}
          </p>
        )}

        {out && (
          <div className="sm:col-span-2 rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="font-medium">{out}</div>
            <div className="mt-3">
              <SafetyNotice />
            </div>
          </div>
        )}
      </form>
    </>
  );
}