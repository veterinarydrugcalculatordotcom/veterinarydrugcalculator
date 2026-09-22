import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getIndexableDrugs } from '@/lib/drugs';
import { LEARN_ARTICLES } from '@/lib/learn';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search this site for calculators, drug reference pages and educational guides.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/search/' },
};

const CALCULATORS = [
  { title: 'Veterinary drug calculator', href: '/calculators/veterinary-drug-calculator/' },
  { title: 'Dog drug calculator', href: '/calculators/dog-drug-calculator/' },
  { title: 'Cat drug calculator', href: '/calculators/cat-drug-calculator/' },
  { title: 'mg/kg calculator', href: '/calculators/mg-kg-calculator/' },
  { title: 'mg to mL calculator', href: '/calculators/mg-to-ml-calculator/' },
  { title: 'Veterinary fluid calculator', href: '/calculators/veterinary-fluid-calculator/' },
  { title: 'Veterinary CRI calculator', href: '/calculators/veterinary-cri-calculator/' },
  { title: 'Veterinary unit converter', href: '/calculators/veterinary-unit-converter/' },
];

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').trim().toLowerCase();

  const drugs = q ? getIndexableDrugs().filter((d) => d.genericName.toLowerCase().includes(q)) : [];
  const calcs = q ? CALCULATORS.filter((c) => c.title.toLowerCase().includes(q)) : [];
  const learn = q
    ? LEARN_ARTICLES.filter(
        (a) =>
          a.indexable &&
          (a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
      )
    : [];

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Search', href: '/search/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Search</h1>

      <form className="mt-4 max-w-2xl" action="/search/" method="get">
        <label className="block">
          <span className="text-sm font-medium">Search calculators, drugs and guides</span>
          <input
            name="q"
            defaultValue={searchParams.q || ''}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <button className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      {q && (
        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold">Calculators</h2>
            {calcs.length ? (
              <ul className="mt-2 list-disc pl-6">
                {calcs.map((c) => (
                  <li key={c.href}>
                    <Link className="text-blue-700" href={c.href}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">No matches.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold">Drug reference</h2>
            {drugs.length ? (
              <ul className="mt-2 list-disc pl-6">
                {drugs.map((d) => (
                  <li key={d.slug}>
                    <Link className="text-blue-700" href={`/drugs/${d.slug}/`}>{d.genericName}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">No matches.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold">Learn</h2>
            {learn.length ? (
              <ul className="mt-2 list-disc pl-6">
                {learn.map((a) => (
                  <li key={a.slug}>
                    <Link className="text-blue-700" href={`/learn/${a.slug}/`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">No matches.</p>
            )}
          </section>
        </div>
      )}
    </>
  );
}