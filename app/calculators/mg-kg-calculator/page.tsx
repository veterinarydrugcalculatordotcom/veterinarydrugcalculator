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
    setOut(`${formatNumber(totalMg)} mg total (based on ${formatNumber(kg)} kg and ${d} mg/kg)`);
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'mg/kg calculator', href: '/calculators/mg-kg-calculator/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <aside className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 h-fit">
          <form onSubmit={run} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink-900">Calculate total dose</h2>

            <label className="mt-5 block">
              <span className="text-xs font-medium text-ink-700">Body weight</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 10"
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

            <button className="mt-5 w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition">
              Calculate
            </button>
            <button
              type="button"
              onClick={() => {
                setWeight('');
                setDose('');
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
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/mg-to-ml-calculator/">
                  mg to mL calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/veterinary-drug-calculator/">
                  Veterinary drug calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/learn/how-to-convert-mg-kg-to-mg/">
                  Guide: mg/kg to mg
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
            mg/kg Calculator
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Convert a body-weight based dose rate in mg/kg into a total dose in milligrams.
            Enter the patient weight and the intended dose rate, and the calculator returns
            the total mg to draw up. A common use is turning a labeled mg/kg dose into a mg
            value that you then convert to mL using the product concentration.
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">What this calculator does</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>Multiplies a mg/kg dose rate by the animal weight in kg.</li>
              <li>Returns a total dose in mg.</li>
              <li>Accepts both kg and lb inputs, and converts lb to kg first.</li>
              <li>Does not verify that the dose rate is clinically appropriate.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Formula</h2>
            <pre className="mt-4 rounded-2xl border border-ink-200 bg-white p-5 text-sm overflow-x-auto">
{`total dose (mg) = dose rate (mg/kg) x body weight (kg)

If weight is in pounds:
body weight (kg) = weight (lb) x 0.45359237`}
            </pre>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Worked example</h2>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 text-ink-700 leading-relaxed">
              <p>A 10 kg dog with a 5 mg/kg dose rate:</p>
              <p className="mt-2 font-mono text-ink-900">5 x 10 = 50 mg total</p>
              <p className="mt-3">
                To convert this 50 mg into a volume, use the{' '}
                <Link className="text-brand-700 underline" href="/calculators/mg-to-ml-calculator/">
                  mg to mL calculator
                </Link>{' '}
                with the concentration on the product label.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Common mistakes</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>Mixing up lb and kg. Always check the unit on the scale.</li>
              <li>Using a concentration value in place of the dose rate.</li>
              <li>Assuming the calculated mg is clinically correct when it only reflects the numbers you entered.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}