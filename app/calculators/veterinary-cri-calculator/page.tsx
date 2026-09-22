'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { calculateCRI } from '@/lib/calculations';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');
  const [conc, setConc] = useState('');
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const w = Number(weight);
    const d = Number(dose);
    const c = Number(conc);
    const mlHr = calculateCRI({ weightKg: w, doseMcgPerKgPerMin: d, concentrationMgPerMl: c });
    if (mlHr == null) {
      setErr('Enter positive numbers for weight, dose (mcg/kg/min) and concentration (mg/mL).');
      return;
    }
    setOut(`${formatNumber(mlHr)} mL/hr`);
  }

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
        { name: 'Veterinary CRI calculator', href: '/calculators/veterinary-cri-calculator/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Veterinary CRI calculator</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Converts a constant rate infusion dose expressed as mcg/kg/min into a pump rate in mL/hr using the drug
        concentration in mg/mL. This is a mathematical conversion only.
      </p>

      <form onSubmit={run} className="mt-6 grid gap-4 sm:grid-cols-3 rounded-lg border border-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-sm font-medium">Weight (kg)</span>
          <input required inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Dose (mcg/kg/min)</span>
          <input required inputMode="decimal" value={dose} onChange={(e) => setDose(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Concentration (mg/mL)</span>
          <input required inputMode="decimal" value={conc} onChange={(e) => setConc(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>

        <div className="sm:col-span-3 flex gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Calculate</button>
          <button type="button" onClick={() => { setWeight(''); setDose(''); setConc(''); setOut(null); setErr(null); }}
            className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50">Reset</button>
        </div>

        {err && <p role="alert" className="sm:col-span-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">{err}</p>}
        {out && (
          <div className="sm:col-span-3 rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="font-medium">Pump rate: {out}</div>
            <div className="mt-3"><SafetyNotice /></div>
          </div>
        )}
      </form>
    </>
  );
}