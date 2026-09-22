'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [mg, setMg] = useState('');
  const [conc, setConc] = useState('');
  const [unit, setUnit] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mg/mL');
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const m = Number(mg);
    const c = Number(conc);
    if (!(m > 0) || !(c > 0)) {
      setErr('Enter positive numbers for total dose and concentration.');
      return;
    }
    const concMgPerMl = unit === 'mg/mL' ? c : unit === 'mcg/mL' ? c / 1000 : c * 1000;
    const volumeMl = m / concMgPerMl;
    setOut(`${formatNumber(volumeMl)} mL (based on ${m} mg ÷ ${formatNumber(concMgPerMl)} mg/mL)`);
  }

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
        { name: 'mg to mL calculator', href: '/calculators/mg-to-ml-calculator/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">mg to mL calculator</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Convert a total drug dose expressed in mg into a volume in mL using the concentration on the label.
      </p>

      <form onSubmit={run} className="mt-6 grid gap-4 sm:grid-cols-2 rounded-lg border border-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-sm font-medium">Total dose (mg)</span>
          <input required inputMode="decimal" value={mg} onChange={(e) => setMg(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Concentration</span>
          <div className="mt-1 flex">
            <input required inputMode="decimal" value={conc} onChange={(e) => setConc(e.target.value)}
              className="w-full rounded-l-md border border-slate-300 px-3 py-2" />
            <select value={unit} onChange={(e) => setUnit(e.target.value as any)}
              className="rounded-r-md border border-l-0 border-slate-300 px-2 bg-slate-50" aria-label="Concentration unit">
              <option value="mg/mL">mg/mL</option>
              <option value="mcg/mL">mcg/mL</option>
              <option value="g/mL">g/mL</option>
            </select>
          </div>
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Calculate</button>
          <button type="button" onClick={() => { setMg(''); setConc(''); setOut(null); setErr(null); }}
            className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50">Reset</button>
        </div>

        {err && <p role="alert" className="sm:col-span-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">{err}</p>}
        {out && (
          <div className="sm:col-span-2 rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="font-medium">{out}</div>
            <div className="mt-3"><SafetyNotice /></div>
          </div>
        )}
      </form>
    </>
  );
}