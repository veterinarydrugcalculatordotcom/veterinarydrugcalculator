'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { calculateFluidRate } from '@/lib/calculations';
import { formatNumber } from '@/lib/units';

export default function Page() {
  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('');
  const [hours, setHours] = useState('24');
  const [out, setOut] = useState<{ mlHr: number; total: number; hours: number } | null>(null);
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
    setOut({ mlHr: v, total: v * h, hours: h });
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
          { name: 'Veterinary fluid calculator', href: '/calculators/veterinary-fluid-calculator/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <aside className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 h-fit">
          <form onSubmit={run} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink-900">Calculate fluid rate</h2>

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
              <span className="text-xs font-medium text-ink-700">Fluid rate</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 60"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-xs text-ink-600">
                  mL/kg/day
                </span>
              </div>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-700">Delivery window</span>
              <div className="mt-1.5 flex">
                <input
                  inputMode="decimal"
                  required
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full rounded-l-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-sm text-ink-600">
                  hours
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
                setRate('');
                setHours('24');
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
                <div className="mt-1.5 font-serif text-2xl text-ink-900">
                  {formatNumber(out.mlHr)} mL/hr
                </div>
                <p className="mt-1 text-sm text-ink-700">
                  Total over {out.hours} hours: {formatNumber(out.total)} mL
                </p>
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
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/calculators/veterinary-cri-calculator/">
                  CRI calculator
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
            Veterinary Fluid Calculator
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Compute a maintenance fluid rate in mL per hour from body weight, a per-kilogram
            fluid rate in mL/kg/day, and the number of hours over which the total is
            delivered. This is a rate calculation only. It does not evaluate dehydration,
            ongoing losses or the appropriate fluid choice.
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Formula</h2>
            <pre className="mt-4 rounded-2xl border border-ink-200 bg-white p-5 text-sm overflow-x-auto">
{`fluid rate (mL/hr) = body weight (kg) x rate (mL/kg/day) / hours
total volume (mL)  = fluid rate x hours`}
            </pre>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Worked example</h2>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 text-ink-700">
              <p>A 10 kg patient at 60 mL/kg/day over 24 hours:</p>
              <p className="mt-3 font-mono text-ink-900 leading-relaxed">
                rate = 10 x 60 / 24 = 25 mL/hr
                <br />
                total = 25 x 24 = 600 mL
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">Common fluid rate values</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-left">
                  <tr>
                    <th className="px-4 py-2.5 font-medium text-ink-700">Species / situation</th>
                    <th className="px-4 py-2.5 font-medium text-ink-700">Typical rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100 bg-white text-ink-700">
                  <tr>
                    <td className="px-4 py-2.5">Adult dog maintenance</td>
                    <td className="px-4 py-2.5">40 to 60 mL/kg/day</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Adult cat maintenance</td>
                    <td className="px-4 py-2.5">40 to 60 mL/kg/day</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Puppy or kitten</td>
                    <td className="px-4 py-2.5">60 to 80 mL/kg/day</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ink-500">
              Typical values for orientation only. Confirm the appropriate rate against a
              current reference and the individual patient.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl text-ink-900">What this does not do</h2>
            <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6">
              <li>It does not include dehydration deficit or ongoing losses.</li>
              <li>It does not choose a fluid type or an additive.</li>
              <li>It does not adjust for cardiac or renal conditions.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}