import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Veterinary Drug Calculator — Dosage, Fluid & CRI Tools with Verified Sources',
  description:
    'Educational veterinary drug dosage, fluid, CRI and unit-conversion calculators. Every clinical value comes from a traceable, linked source.',
  path: '/',
  keywords: ['veterinary drug calculator', 'veterinary dosage calculator', 'vet drug calculator'],
});

const FEATURED = [
  {
    title: 'Veterinary drug calculator',
    href: '/calculators/veterinary-drug-calculator/',
    description: 'Universal mg/kg → mg → mL workflow for verified drug records.',
  },
  {
    title: 'Dog drug calculator',
    href: '/calculators/dog-drug-calculator/',
    description: 'Species-filtered dosage calculator for dogs.',
  },
  {
    title: 'Cat drug calculator',
    href: '/calculators/cat-drug-calculator/',
    description: 'Species-filtered dosage calculator for cats.',
  },
  {
    title: 'mg/kg calculator',
    href: '/calculators/mg-kg-calculator/',
    description: 'Convert mg/kg dose rates into total mg for a given weight.',
  },
  {
    title: 'mg to mL calculator',
    href: '/calculators/mg-to-ml-calculator/',
    description: 'Convert a total dose in mg to a volume in mL using concentration.',
  },
  {
    title: 'Veterinary fluid calculator',
    href: '/calculators/veterinary-fluid-calculator/',
    description: 'Maintenance fluid rate in mL/hr from weight and mL/kg/day.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="grid gap-6 md:grid-cols-3 md:items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Veterinary drug and dosage calculators with traceable sources
          </h1>
          <p className="mt-3 text-slate-700 max-w-2xl">
            {SITE.name} provides educational veterinary calculation tools. It does not provide veterinary
            diagnosis or treatment and should not be used as a substitute for advice from a qualified
            veterinarian.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/calculators/"
              className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
            >
              Browse calculators
            </Link>
            <Link
              href="/drug-reference/"
              className="rounded-md border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
            >
              Drug reference
            </Link>
          </div>
        </div>
        <aside className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <h2 className="font-semibold text-slate-900">How this site works</h2>
          <ul className="mt-2 space-y-2 list-disc pl-5">
            <li>The calculator performs math. It never decides clinical appropriateness.</li>
            <li>Dose, route and species options only appear when a verified source exists.</li>
            <li>Every clinical value is linked to its direct source on the page.</li>
            <li>If a value is not verified, the calculator is not shown for that combination.</li>
          </ul>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Featured calculators</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm transition"
            >
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-blue-700">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Calculators</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dose, mg/kg, mg→mL, fluids, CRI, unit conversion — organized by intent.
          </p>
          <Link href="/calculators/" className="mt-3 inline-block text-sm text-blue-700">
            Open section →
          </Link>
        </div>
        <div className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Drug reference</h2>
          <p className="mt-2 text-sm text-slate-600">
            Verified drug pages with species, route and source links.
          </p>
          <Link href="/drug-reference/" className="mt-3 inline-block text-sm text-blue-700">
            Open section →
          </Link>
        </div>
        <div className="rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold">Learn</h2>
          <p className="mt-2 text-sm text-slate-600">
            How veterinary dose, concentration and unit math actually works.
          </p>
          <Link href="/learn/" className="mt-3 inline-block text-sm text-blue-700">
            Open section →
          </Link>
        </div>
      </section>
    </>
  );
}