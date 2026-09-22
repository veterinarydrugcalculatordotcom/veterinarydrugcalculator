'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { formatNumber, toKg, WeightUnit } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [dose, setDose] = useState('');
  const [conc, setConc] = useState('');
  const [concUnit, setConcUnit] = useState<'mg/mL' | 'mcg/mL' | 'g/mL'>('mg/mL');
  const [result, setResult] = useState<{ kg: number; mg: number; ml: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setResult(null);

    const w = Number(weight);
    const d = Number(dose);
    const c = Number(conc);

    if (!(w > 0)) { setErr('Enter a positive body weight.'); return; }
    if (!(d > 0)) { setErr('Enter a positive dose rate.'); return; }
    if (!(c > 0)) { setErr('Enter a positive concentration.'); return; }

    const kg = toKg(w, unit);
    const totalMg = kg * d;
    const concMgPerMl = concUnit === 'mg/mL' ? c : concUnit === 'mcg/mL' ? c / 1000 : c * 1000;
    const ml = totalMg / concMgPerMl;

    setResult({ kg, mg: totalMg, ml });
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'Veterinary drug calculator', href: '/calculators/veterinary-drug-calculator/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <aside className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 h-fit">
          <form onSubmit={run} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink-900">Calculate dose and volume</h2>

            <label className="mt-5 block">
              <span className="text-xs font-medium text-ink-700">Body weight</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as WeightUnit)}
                  className="rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-2.5 text-sm text-ink-700"
                  aria-label="Weight unit"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-700">Dose rate</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  mg/kg
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
                  value={concUnit}
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
                setWeight('');
                setDose('');
                setConc('');
                setResult(null);
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

            {result && (
              <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-brand-700">Result</div>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-600">Weight</dt>
                    <dd className="font-medium text-ink-900">{formatNumber(result.kg)} kg</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-600">Total dose</dt>
                    <dd className="font-medium text-ink-900">{formatNumber(result.mg)} mg</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-600">Volume</dt>
                    <dd className="font-medium text-ink-900">{formatNumber(result.ml)} mL</dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <SafetyNotice />
                </div>
              </div>
            )}
          </form>

          <div className="mt-5 rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm">
            <p className="font-medium text-ink-900">Related tools</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/mg-kg-calculator/">
                  mg/kg calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/mg-to-ml-calculator/">
                  mg to mL calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/learn/how-to-calculate-veterinary-drug-dose/">
                  Guide: dose calculation
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
            Veterinary Drug Calculator
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Enter a body weight, a dose rate in mg/kg, and the concentration of the product
            on hand. The calculator returns the total dose in milligrams and, where a
            concentration is provided, the volume in milliliters.
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">How to use it</h2>
            <ol className="mt-4 space-y-2 text-ink-700 leading-relaxed list-decimal pl-6">
              <li>Enter the animal weight. Use kg or lb as appropriate.</li>
              <li>Enter the dose rate in mg per kg.</li>
              <li>Enter the concentration printed on the bottle, for example 50 mg/mL.</li>
              <li>Read the total dose in mg and the calculated volume in mL.</li>
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Formula</h2>
            <pre className="mt-4 rounded-2xl border border-ink-200 bg-white p-5 text-sm overflow-x-auto">
{`total dose (mg) = dose rate (mg/kg) x body weight (kg)
volume (mL)     = total dose (mg) / concentration (mg/mL)`}
            </pre>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Worked example</h2>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 text-ink-700">
              <p>A 10 kg dog with a 5 mg/kg dose rate and a 50 mg/mL product:</p>
              <p className="mt-2 font-mono text-ink-900">
                total dose = 5 x 10 = 50 mg
                <br />
                volume = 50 / 50 = 1 mL
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">What this calculator does not do</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>It does not select the correct dose rate for a drug or species.</li>
              <li>It does not decide whether a given route or frequency is appropriate.</li>
              <li>It does not adjust for species-specific toxicity, contraindications or interactions.</li>
            </ul>
            <p className="mt-4 text-ink-700">
              For source-linked dose values by species, see{' '}
              <Link className="text-brand-700 underline" href="/drug-reference/">
                our veterinary drug reference
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}