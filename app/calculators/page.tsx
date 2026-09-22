import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Veterinary Calculators - Free Drug Dose & Fluid Tools',
  description:
    'Free veterinary calculators for vets, students and pet owners. Drug dose, mg/kg, mg to mL, fluid rate, CRI and unit conversion. Mobile friendly, no signup.',
  path: '/calculators/',
  keywords: [
    'veterinary calculators',
    'vet dosage calculator',
    'veterinary clinical calculators',
    'free veterinary tools',
  ],
});

const ITEMS = [
  { href: '/calculators/veterinary-drug-calculator/', title: 'Veterinary Drug Calculator', description: 'mg/kg to mg to mL workflow for any drug.' },
  { href: '/calculators/dog-drug-calculator/', title: 'Dog Dosage Calculator', description: 'Weight-based dose calculation for dogs.' },
  { href: '/calculators/cat-drug-calculator/', title: 'Cat Dosage Calculator', description: 'Weight-based dose calculation for cats.' },
  { href: '/calculators/mg-kg-calculator/', title: 'mg/kg Calculator', description: 'Total dose from weight and dose rate.' },
  { href: '/calculators/mg-to-ml-calculator/', title: 'mg to mL Calculator', description: 'Volume from total mg and concentration.' },
  { href: '/calculators/veterinary-fluid-calculator/', title: 'Veterinary Fluid Calculator', description: 'Maintenance fluid rate (mL/hr).' },
  { href: '/calculators/veterinary-cri-calculator/', title: 'Veterinary CRI Calculator', description: 'mcg/kg/min to mL/hr using concentration.' },
  { href: '/calculators/veterinary-unit-converter/', title: 'Veterinary Unit Converter', description: 'Weight, mass and concentration conversions.' },
];

export default function CalculatorsIndex() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Calculators', href: '/calculators/' },
        ]}
      />
      <div className="mt-6 max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl text-ink-900">
          Veterinary calculators
        </h1>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          Each calculator isolates one calculation so that inputs, units and outputs are
          unambiguous. Clinical values are only offered where a verified source exists in
          our reference database.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((c) => (
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
            <h2 className="mt-5 font-serif text-xl text-ink-900 group-hover:text-brand-700 transition">
              {c.title}
            </h2>
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
    </>
  );
}