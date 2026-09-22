import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Veterinary Calculators — Drug, Dose, Fluid, CRI and Unit Tools',
  description:
    'Browse veterinary calculators: drug dosage, mg/kg, mg to mL, maintenance fluids, CRI and unit conversion. Educational tools with verified reference data.',
  path: '/calculators/',
});

const ITEMS = [
  { href: '/calculators/mg-kg-calculator/', title: 'mg/kg calculator', description: 'Total dose from weight and dose rate.' },
  { href: '/calculators/mg-to-ml-calculator/', title: 'mg to mL calculator', description: 'Volume from total mg and concentration.' },
  { href: '/calculators/veterinary-fluid-calculator/', title: 'Veterinary fluid calculator', description: 'Maintenance fluid rate (mL/hr).' },
  { href: '/calculators/veterinary-cri-calculator/', title: 'Veterinary CRI calculator', description: 'mcg/kg/min → mL/hr using concentration.' },
  { href: '/calculators/veterinary-unit-converter/', title: 'Veterinary unit converter', description: 'Weight, mass and concentration unit conversions.' },
  { href: '/calculators/veterinary-drug-calculator/', title: 'Veterinary drug calculator', description: 'mg/kg → mg → mL workflow for verified drug records.' },
];

export default function CalculatorsIndex() {
  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Veterinary calculators</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Each calculator isolates one calculation so that inputs, units and outputs are unambiguous.
        Clinical values are only offered where a verified source exists in our reference database.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="block rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm transition"
          >
            <h2 className="font-semibold text-slate-900">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{c.description}</p>
            <span className="mt-3 inline-block text-sm font-medium text-blue-700">Open calculator →</span>
          </a>
        ))}
      </div>
    </>
  );
}