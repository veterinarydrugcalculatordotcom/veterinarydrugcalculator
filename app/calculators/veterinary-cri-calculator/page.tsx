'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { calculateCRI } from '@/lib/calculations';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');
  const [conc, setConc] = useState('');
  const [rate, setRate] = useState('');
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOut(null);
    const w = Number(weight);
    const d = Number(dose);
    const c = Number(conc);
    const mlHr = calculateCRI({
      weightKg: w,
      doseMcgPerKgPerMin: d,
      concentrationMgPerMl: c,
    });
    if (mlHr == null) {
      setErr('Enter positive numbers for weight, dose (mcg/kg/min) and concentration (mg/mL).');
      return;
    }
    setOut(`${formatNumber(mlHr)} mL/hr`);
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'Veterinary CRI calculator', href: '/calculators/veterinary-cri-calculator/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <aside className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 h-fit">
          <form onSubmit={run} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink-900">Calculate pump rate</h2>

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
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  kg
                </span>
              </div>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-700">Dose</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-xs text-ink-600">
                  mcg/kg/min
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
                  placeholder="e.g. 1"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  mg/mL
                </span>
              </div>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-700">Infusion bag volume <span className="text-ink-400">(optional)</span></span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  mL
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
                setConc('');
                setRate('');
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
                <div className="text-[10px] uppercase tracking-[0.14em] text-brand-700">Pump rate</div>
                <div className="mt-1.5 font-serif text-2xl text-ink-900">{out}</div>
                {rate && Number(rate) > 0 && out && (
                  <p className="mt-2 text-xs text-ink-600">
                    A {rate} mL bag at this rate empties in about{' '}
                    {formatNumber((Number(rate) / parseFloat(out)) * 1, 1)} hours.
                  </p>
                )}
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
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/veterinary-fluid-calculator/">
                  Fluid rate calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/veterinary-drug-calculator/">
                  Veterinary drug calculator
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/learn/">
                  All guides
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
            Veterinary CRI Calculator
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            A constant rate infusion (CRI) delivers a drug continuously at a steady dose.
            This calculator converts a CRI dose expressed in mcg/kg/min into a pump rate in
            mL/hr, using the concentration of the drug in the syringe or bag. It also shows
            how long a bag of a given size will last at that rate.
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Formula</h2>
            <pre className="mt-4 rounded-2xl border border-ink-200 bg-white p-5 text-sm overflow-x-auto">
{`mg per minute  = (mcg/kg/min x body weight kg) / 1000
mL per minute  = mg per minute / concentration (mg/mL)
mL per hour    = mL per minute x 60`}
            </pre>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Worked example</h2>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 text-ink-700">
              <p>A 10 kg patient at 5 mcg/kg/min with a 1 mg/mL concentration:</p>
              <p className="mt-3 font-mono text-ink-900 leading-relaxed">
                5 x 10 = 50 mcg/min
                <br />
                50 / 1000 = 0.05 mg/min
                <br />
                0.05 / 1 = 0.05 mL/min
                <br />
                0.05 x 60 = 3 mL/hr
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">When CRIs are used</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              CRIs are used when a drug needs to be delivered at a steady plasma level
              rather than as a bolus. Common situations include analgesia infusions,
              antiarrhythmic therapy, and prokinetic support. The choice of drug, dose and
              duration is a clinical decision and requires a verified reference and
              veterinary judgment.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">What this calculator does not do</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>It does not verify the dose rate for a drug or a species.</li>
              <li>It does not account for dilution steps or additives in the bag.</li>
              <li>It does not decide whether a CRI is appropriate for a patient.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}