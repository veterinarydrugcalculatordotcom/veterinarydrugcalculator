import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import HomeHeroCalculator from '@/components/HomeHeroCalculator';

export const metadata = buildMetadata({
  title: 'Veterinary Drug Calculator - Free Vet Dosage Tool',
  description:
    'Free veterinary drug calculator for dogs and cats. Calculate mg/kg dose, convert mg to mL, and find fluid rates instantly. No signup. Source-linked references.',
  path: '/',
  keywords: [
    'veterinary drug calculator',
    'veterinary dosage calculator',
    'vet drug calculator',
    'vet dosage calculator',
    'dog dosage calculator',
    'cat dosage calculator',
  ],
});

const MORE_CALCULATORS = [
  { href: '/calculators/dog-drug-calculator/', title: 'Dog Dosage Calculator', description: 'Weight-based dose calculation for dogs.' },
  { href: '/calculators/cat-drug-calculator/', title: 'Cat Dosage Calculator', description: 'Weight-based dose calculation for cats.' },
  { href: '/calculators/mg-to-ml-calculator/', title: 'mg to mL Calculator', description: 'Convert a total mg dose into a volume in mL.' },
  { href: '/calculators/veterinary-fluid-calculator/', title: 'Fluid Rate Calculator', description: 'Maintenance fluid rate in mL per hour.' },
  { href: '/calculators/veterinary-cri-calculator/', title: 'CRI Calculator', description: 'Convert mcg/kg/min into mL/hr pump rate.' },
  { href: '/calculators/veterinary-unit-converter/', title: 'Unit Converter', description: 'kg to lb, mg to mcg, and concentration units.' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              Educational veterinary tool
            </div>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink-900 leading-[1.05]">
              Veterinary Drug Calculator
            </h1>
            <p className="mt-5 text-lg text-ink-700 max-w-xl leading-relaxed">
              Calculate dose rate (mg/kg) to total dose (mg) to volume (mL) in seconds.
              Built for veterinary professionals, students and technicians. Every reference
              value on drug pages is linked to its source.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/calculators/veterinary-drug-calculator/"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-800 transition"
              >
                Open full calculator
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/learn/how-to-calculate-veterinary-drug-dose/"
                className="inline-flex items-center rounded-xl border border-ink-300 bg-white px-5 py-3 font-medium text-ink-800 hover:bg-ink-50 transition"
              >
                How it works
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-500">Unit aware</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">kg and lb</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-500">Source linked</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">Every value</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-500">Free</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">No signup</dd>
              </div>
            </dl>
          </div>
          <div className="lg:justify-self-end w-full max-w-md">
            <HomeHeroCalculator />
          </div>
        </div>
      </section>

      {/* MORE CALCULATORS */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-ink-900">More veterinary calculators</h2>
            <p className="mt-2 text-ink-600">
              Free tools for dose, fluid, CRI and unit conversions.
            </p>
          </div>
          <Link href="/calculators/" className="hidden sm:block text-sm font-medium text-brand-700 hover:text-brand-800">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink-900 group-hover:text-brand-700 transition">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                Open
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="mt-16 rounded-3xl border border-ink-200 bg-white p-8 sm:p-12">
        <h2 className="font-serif text-3xl text-ink-900">Why use this calculator</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 border border-brand-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f8a8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900">Source-linked data</h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              Every dose value on drug pages links to a specific, verifiable source.
            </p>
          </div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 border border-brand-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f8a8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900">Fast and clear</h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              No clutter, no ads on inputs. Enter values, read the result, done.
            </p>
          </div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 border border-brand-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f8a8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900">Safety first</h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              Unverified data is never calculated. Educational use only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}