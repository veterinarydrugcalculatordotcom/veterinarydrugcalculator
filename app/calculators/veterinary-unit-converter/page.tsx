'use client';

import { useState } from 'react';
import Link from 'next/link';
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

  function convertWeight(): string {
    const n = Number(w);
    if (w === '' || !Number.isFinite(n)) return '';
    const kg = wFrom === 'kg' ? n : lbToKg(n);
    return formatNumber(wTo === 'kg' ? kg : kgToLb(kg));
  }

  function convertMass(): string {
    const n = Number(m);
    if (m === '' || !Number.isFinite(n)) return '';
    const mg = toMg(n, mFrom);
    const out = mTo === 'mg' ? mg : mTo === 'mcg' ? mg * 1000 : mg / 1000;
    return formatNumber(out);
  }

  function convertConc(): string {
    const n = Number(c);
    if (c === '' || !Number.isFinite(n)) return '';
    const mgPerMl = toMgPerMl(n, cFrom);
    const out = cTo === 'mg/mL' ? mgPerMl : cTo === 'mcg/mL' ? mgPerMl * 1000 : mgPerMl / 1000;
    return formatNumber(out);
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'Veterinary unit converter', href: '/calculators/veterinary-unit-converter/' },
        ]}
      />

      <div className="mt-6 max-w-3xl">
        <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
          Veterinary Unit Converter
        </h1>
        <p className="mt-5 text-lg text-ink-700 leading-relaxed">
          Convert between the weight, mass and concentration units that show up most often
          on veterinary labels. Handy when a product is labeled in mcg/mL but a dose rate
          is written as mg/kg, or when a patient weight is in pounds.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-ink-900">Weight</h2>
          <p className="mt-1 text-xs text-ink-500">kg, lb</p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-ink-700">Value</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  value={w}
                  onChange={(e) => setW(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={wFrom}
                  onChange={(e) => setWFrom(e.target.value as 'kg' | 'lb')}
                  className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                  aria-label="From unit"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </label>
            <div className="text-xs uppercase tracking-wider text-ink-400">converts to</div>
            <div className="flex">
              <div className="flex-1 rounded-l-lg border border-ink-200 bg-brand-50 px-3 py-2.5 text-sm font-medium text-ink-900">
                {convertWeight() || '\u00A0'}
              </div>
              <select
                value={wTo}
                onChange={(e) => setWTo(e.target.value as 'kg' | 'lb')}
                className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                aria-label="To unit"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-ink-900">Mass</h2>
          <p className="mt-1 text-xs text-ink-500">mg, mcg, g</p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-ink-700">Value</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  value={m}
                  onChange={(e) => setM(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={mFrom}
                  onChange={(e) => setMFrom(e.target.value as 'mg' | 'mcg' | 'g')}
                  className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                  aria-label="From unit"
                >
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="g">g</option>
                </select>
              </div>
            </label>
            <div className="text-xs uppercase tracking-wider text-ink-400">converts to</div>
            <div className="flex">
              <div className="flex-1 rounded-l-lg border border-ink-200 bg-brand-50 px-3 py-2.5 text-sm font-medium text-ink-900">
                {convertMass() || '\u00A0'}
              </div>
              <select
                value={mTo}
                onChange={(e) => setMTo(e.target.value as 'mg' | 'mcg' | 'g')}
                className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                aria-label="To unit"
              >
                <option value="mg">mg</option>
                <option value="mcg">mcg</option>
                <option value="g">g</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-ink-900">Concentration</h2>
          <p className="mt-1 text-xs text-ink-500">mg/mL, mcg/mL, g/mL</p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-ink-700">Value</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={cFrom}
                  onChange={(e) => setCFrom(e.target.value as 'mg/mL' | 'mcg/mL' | 'g/mL')}
                  className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                  aria-label="From unit"
                >
                  <option value="mg/mL">mg/mL</option>
                  <option value="mcg/mL">mcg/mL</option>
                  <option value="g/mL">g/mL</option>
                </select>
              </div>
            </label>
            <div className="text-xs uppercase tracking-wider text-ink-400">converts to</div>
            <div className="flex">
              <div className="flex-1 rounded-l-lg border border-ink-200 bg-brand-50 px-3 py-2.5 text-sm font-medium text-ink-900">
                {convertConc() || '\u00A0'}
              </div>
              <select
                value={cTo}
                onChange={(e) => setCTo(e.target.value as 'mg/mL' | 'mcg/mL' | 'g/mL')}
                className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                aria-label="To unit"
              >
                <option value="mg/mL">mg/mL</option>
                <option value="mcg/mL">mcg/mL</option>
                <option value="g/mL">g/mL</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl text-ink-900">Common conversions</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-ink-50 text-left">
              <tr>
                <th className="px-4 py-2.5 font-medium text-ink-700">From</th>
                <th className="px-4 py-2.5 font-medium text-ink-700">To</th>
                <th className="px-4 py-2.5 font-medium text-ink-700">Multiply by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-700">
              <tr>
                <td className="px-4 py-2.5">1 kg</td>
                <td className="px-4 py-2.5">lb</td>
                <td className="px-4 py-2.5">2.20462</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">1 lb</td>
                <td className="px-4 py-2.5">kg</td>
                <td className="px-4 py-2.5">0.453592</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">1 mg</td>
                <td className="px-4 py-2.5">mcg</td>
                <td className="px-4 py-2.5">1000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">1 g</td>
                <td className="px-4 py-2.5">mg</td>
                <td className="px-4 py-2.5">1000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">1 mg/mL</td>
                <td className="px-4 py-2.5">mcg/mL</td>
                <td className="px-4 py-2.5">1000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">1 percent solution</td>
                <td className="px-4 py-2.5">mg/mL</td>
                <td className="px-4 py-2.5">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-2xl text-ink-900">Notes on units used in practice</h2>
        <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
          <li>
            <strong>mcg</strong> and <strong>µg</strong> mean the same thing. Both refer to
            a microgram, which is one thousandth of a milligram.
          </li>
          <li>
            A <strong>percent solution</strong> is grams per 100 mL. So a 1 percent solution
            is 1 g per 100 mL, which is the same as 10 mg/mL.
          </li>
          <li>
            <strong>IU</strong> (International Units) cannot be converted to mg. IU depends
            on the biological activity of the specific product.
          </li>
          <li>
            Concentration units on a label must match the concentration units used in a
            dose calculation. Convert first, then calculate.
          </li>
        </ul>
      </section>

      <div className="mt-10 max-w-3xl">
        <SafetyNotice />
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-2xl text-ink-900">Related calculators</h2>
        <ul className="mt-3 space-y-2 text-ink-700">
          <li>
            <Link className="text-brand-700 hover:text-brand-800 underline" href="/calculators/mg-to-ml-calculator/">
              mg to mL calculator
            </Link>
          </li>
          <li>
            <Link className="text-brand-700 hover:text-brand-800 underline" href="/calculators/mg-kg-calculator/">
              mg/kg calculator
            </Link>
          </li>
          <li>
            <Link className="text-brand-700 hover:text-brand-800 underline" href="/calculators/veterinary-drug-calculator/">
              Veterinary drug calculator
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}