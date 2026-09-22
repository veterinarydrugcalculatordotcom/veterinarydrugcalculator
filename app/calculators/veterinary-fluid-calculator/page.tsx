'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { calculateFluidRate } from '@/lib/calculations';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('');
  const [hours, setHours] = useState('24');
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const w = Number(weight);
    const r = Number(rate);
    const h = Number(hours);
    const v = calculateFluidRate(w, r, h);
    if (v == null) {
      setErr('Enter positive numbers for weight, mL/kg/day and hours.');
      return;
    }
    setOut(`${formatNumber(v)} mL/hr · total ${formatNumber(v * h)} mL over ${h} h`);
  }

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
        { name: 'Veterinary fluid calculator', href: '/calculators/veterinary-fluid-calculator/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Veterinary fluid calculator</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Educational fluid-rate math: body weight (kg) × fluid rate (mL/kg/day) ÷ hours per day.
        This calculator does not evaluate dehydration status, ongoing losses or clinical fluid choice.
      </p>

      <form onSubmit={run} className="mt-6 grid gap-4 sm:grid-cols-3 rounded-lg border border-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-sm font-medium">Weight (kg)</span>
          <input required inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Rate (mL/kg/day)</span>
          <input required inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Hours</span>
          <input required inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>

        <div className="sm:col-span-3 flex gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Calculate</button>
          <button type="button" onClick={() => { setWeight(''); setRate(''); setHours('24'); setOut(null); setErr(null); }}
            className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50">Reset</button>
        </div>

        {err && <p role="alert" className="sm:col-span-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">{err}</p>}
        {out && (
          <div className="sm:col-span-3 rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="font-medium">{out}</div>
            <div className="mt-3"><SafetyNotice /></div>
          </div>
        )}
      </form>
    </>
  );
}