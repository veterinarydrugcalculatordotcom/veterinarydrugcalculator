'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [mg, setMg] = useState('');
  const [conc, setConc] = useState('');
  const [unit, setConcUnit] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mg/mL');
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
    setOut(`${formatNumber(volumeMl)} mL based on ${m} mg divided by ${formatNumber(concMgPerMl)} mg/mL`);
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'mg to mL calculator', href: '/calculators/mg-to-ml-calculator/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <aside className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 h-fit">
          <form onSubmit={run} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink-900">Calculate volume</h2>

            <label className="mt-5 block">
              <span className="text-xs font-medium text-ink-700">Total dose</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={mg}
                  onChange={(e) => setMg(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  mg
                </span>
              </div>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-700">Concentration</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={conc}
                  onChange={(e) => setConc(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={unit}
                  onChange={(e) => setConcUnit(e.target.value as 'mg/mL' | 'mcg/mL' | 'g/mL')}
                  className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                  aria-label="Concentration unit"
                >
                  <option value="mg/mL">mg/mL</option>
                  <option value="mcg/mL">mcg/mL</option>
                  <option value="g/mL">g/mL</option>
                </select>
              </div>
            </label>

            <button className="mt-5 w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition">
              Calculate
            </button>
            <button
              type="button"
              onClick={() => {
                setMg('');
                setConc('');
                setOut(null);
                setErr(null);
              }}
              className="mt-2 w-full rounded-lg border border-ink-300 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50 transition"
            >
              Reset
            </button>

            {err && (
              <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                {err}
              </p>
            )}

            {out && (
              <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-brand-700">Result</div>
                <div className="mt-1.5 font-serif text-2xl text-ink-900">{out}</div>
                <div className="mt-4">
                  <SafetyNotice />
                </div>
              </div>
            )}
          </form>

          <div className="mt-5 rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm">
            <p className="font-medium text-ink-900">Related</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/mg-kg-calculator/">
                  mg/kg calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/learn/how-to-convert-mg-to-ml/">
                  Guide: mg to mL conversion
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
            mg to mL Calculator
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Convert a total dose expressed in milligrams into a volume in milliliters using
            the concentration printed on the product label. This is the second step of a
            typical veterinary dose calculation.
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Formula</h2>
            <pre className="mt-4 rounded-2xl border border-ink-200 bg-white p-5 text-sm overflow-x-auto">
{`volume (mL) = total dose (mg) / concentration (mg/mL)`}
            </pre>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Worked example</h2>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 text-ink-700">
              <p>A 50 mg total dose with a 50 mg/mL product:</p>
              <p className="mt-2 font-mono text-ink-900">50 / 50 = 1 mL</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Common mistakes</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>Mixing mcg/mL with mg/mL without converting first.</li>
              <li>Using the wrong bottle from a multi-strength product line.</li>
              <li>Confusing a percentage solution with a mg/mL value directly.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}