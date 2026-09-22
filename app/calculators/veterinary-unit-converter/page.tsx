'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { formatNumber, kgToLb, lbToKg, toMg, toMgPerMl } from '@/lib/units';

export default function Page() {
  const [w, setW] = useState('');
  const [wFrom, setWFrom] = useState<'kg' | 'lb'>('kg');
  const [wTo, setWTo] = useState<'kg' | 'lb'>('lb');

  const [m, setM] = useState('');
  const [mFrom, setMFrom] = useState<'mg' | 'mcg' | 'g'>('mg');
  const [mTo, setMTo] = useState<'mg' | 'mcg' | 'g'>('mcg');

  const [c, setC] = useState('');
  const [cFrom, setCFrom] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mg/mL');
  const [cTo, setCTo] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mcg/mL');

  function convertWeight() {
    const n = Number(w);
    if (!Number.isFinite(n)) return '—';
    const kg = wFrom === 'kg' ? n : lbToKg(n);
    return formatNumber(wTo === 'kg' ? kg : kgToLb(kg));
  }
  function convertMass() {
    const n = Number(m);
    if (!Number.isFinite(n)) return '—';
    const mg = toMg(n, mFrom);
    const out = mTo === 'mg' ? mg : mTo === 'mcg' ? mg * 1000 : mg / 1000;
    return formatNumber(out);
  }
  function convertConc() {
    const n = Number(c);
    if (!Number.isFinite(n)) return '—';
    const mgPerMl = toMgPerMl(n, cFrom);
    const out = cTo === 'mg/mL' ? mgPerMl : cTo === 'mcg/mL' ? mgPerMl * 1000 : mgPerMl / 1000;
    return formatNumber(out);
  }

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
        { name: 'Veterinary unit converter', href: '/calculators/veterinary-unit-converter/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Veterinary unit converter</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Convert weight, mass and concentration units commonly used in veterinary dose calculation.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Weight</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2" placeholder="value" />
            <select value={wFrom} onChange={(e) => setWFrom(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="kg">kg</option><option value="lb">lb</option>
            </select>
            <select value={wTo} onChange={(e) => setWTo(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="kg">kg</option><option value="lb">lb</option>
            </select>
            <div className="rounded-md bg-slate-50 border border-slate-200 px-3 py-2 text-sm">
              {convertWeight()} {wTo}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Mass</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input inputMode="decimal" value={m} onChange={(e) => setM(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2" placeholder="value" />
            <select value={mFrom} onChange={(e) => setMFrom(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="mg">mg</option><option value="mcg">mcg</option><option value="g">g</option>
            </select>
            <select value={mTo} onChange={(e) => setMTo(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="mg">mg</option><option value="mcg">mcg</option><option value="g">g</option>
            </select>
            <div className="rounded-md bg-slate-50 border border-slate-200 px-3 py-2 text-sm">
              {convertMass()} {mTo}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Concentration</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input inputMode="decimal" value={c} onChange={(e) => setC(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2" placeholder="value" />
            <select value={cFrom} onChange={(e) => setCFrom(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="mg/mL">mg/mL</option><option value="mcg/mL">mcg/mL</option><option value="g/mL">g/mL</option>
            </select>
            <select value={cTo} onChange={(e) => setCTo(e.target.value as any)}
              className="rounded-md border border-slate-300 px-2 py-2 bg-slate-50">
              <option value="mg/mL">mg/mL</option><option value="mcg/mL">mcg/mL</option><option value="g/mL">g/mL</option>
            </select>
            <div className="rounded-md bg-slate-50 border border-slate-200 px-3 py-2 text-sm">
              {convertConc()} {cTo}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6"><SafetyNotice /></div>
    </>
  );
}