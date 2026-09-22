import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DRUGS, getIndexableDrugs } from '@/lib/drugs';

export const metadata = buildMetadata({
  title: 'Veterinary Drug Reference — Verified Dose Information with Sources',
  description:
    'Veterinary drug reference pages with dose information, species and route restrictions, and direct links to the sources used.',
  path: '/drug-reference/',
  keywords: ['veterinary drug reference', 'veterinary drug information'],
});

export default function Page() {
  const indexable = getIndexableDrugs();
  const total = DRUGS.length;

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Drug reference', href: '/drug-reference/' },
      ]} />
      <h1 className="mt-4 text-3xl font-bold">Veterinary drug reference</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Each drug page lists dose information, species and route restrictions, and direct links to the sources
        used. Drug pages are published only after the underlying dose data has been verified against a source
        we can link to.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Published drug pages</h2>
      {indexable.length === 0 ? (
        <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <p>This information is not currently available in our verified reference database.</p>
          <p className="mt-2 text-sm">
            We publish drug reference pages only after each clinical value has been verified against a
            specific, linkable source. Records in progress: {total}.
          </p>
        </div>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {indexable.map((d) => (
            <li key={d.slug} className="rounded-md border border-slate-200 p-4">
              <Link href={`/drugs/${d.slug}/`} className="font-medium text-blue-700">
                {d.genericName}
              </Link>
              <div className="mt-1 text-xs text-slate-500">
                Species: {d.species.join(', ') || '—'}
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How our drug reference works</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-700 max-w-3xl">
          <li>Every clinical value (dose range, species, route, frequency) is linked to a direct source.</li>
          <li>Species and route options appear only where verified data exists for that combination.</li>
          <li>If a value is not verified, it is not shown and the calculator is not offered for that combination.</li>
          <li>Records carry a review date and a review status; unverified records are kept out of the index.</li>
        </ul>
      </section>
    </>
  );
}