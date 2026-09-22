import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReferenceBox from '@/components/ReferenceBox';
import SafetyNotice from '@/components/SafetyNotice';
import DrugDoseForm from '@/components/DrugDoseForm';
import { DRUGS, DOSES, getVerifiedDosesFor } from '@/lib/drugs';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return DRUGS
    .filter((d) => d.indexable && d.reviewStatus === 'verified' && d.references.length > 0)
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const drug = DRUGS.find((d) => d.slug === params.slug);
  if (!drug || !drug.indexable || drug.reviewStatus !== 'verified') {
    return { robots: { index: false, follow: true } };
  }
  return buildMetadata({
    title: `${drug.genericName} Dosage Calculator and Reference`,
    description: `Educational ${drug.genericName} dose calculator and reference information with direct source links.`,
    path: `/drugs/${drug.slug}/`,
    ogType: 'article',
  });
}

export default function DrugPage({ params }: { params: { slug: string } }) {
  const drug = DRUGS.find((d) => d.slug === params.slug);

  if (!drug || !drug.indexable || drug.reviewStatus !== 'verified' || drug.references.length === 0) {
    notFound();
  }

  const doses = DOSES.filter((d) => d.drugSlug === drug.slug && d.verified);

  return (
    <article>
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Drug reference', href: '/drug-reference/' },
        { name: drug.genericName, href: `/drugs/${drug.slug}/` },
      ]} />

      <header className="mt-4">
        <h1 className="text-3xl font-bold">
          {drug.genericName} dosage calculator and reference
        </h1>
        <p className="mt-2 text-slate-700 max-w-3xl">
          Educational dose calculator and reference information for {drug.genericName}.
          This page does not provide diagnosis or treatment and does not replace veterinary judgment.
        </p>
        {drug.reviewDate && (
          <p className="mt-2 text-xs text-slate-500">Last reviewed: {drug.reviewDate}</p>
        )}
      </header>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Calculator</h2>
        <div className="mt-3">
          <DrugDoseForm drug={drug} doses={doses} />
        </div>
      </section>

      {drug.drugClass && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Class</h2>
          <p className="mt-2 text-slate-700">{drug.drugClass}</p>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Species with verified entries</h2>
        {drug.species.length ? (
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            {drug.species.map((s) => (
              <li key={s}>
                {s} — {getVerifiedDosesFor(drug.slug, s).length} verified dose entr
                {getVerifiedDosesFor(drug.slug, s).length === 1 ? 'y' : 'ies'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-slate-700">
            This information is not currently available in our verified reference database.
          </p>
        )}
      </section>

      {doses.length ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Verified dose entries</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-3 py-2">Species</th>
                  <th className="px-3 py-2">Route</th>
                  <th className="px-3 py-2">Dose</th>
                  <th className="px-3 py-2">Frequency</th>
                  <th className="px-3 py-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {doses.map((d, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="px-3 py-2">{d.species}</td>
                    <td className="px-3 py-2">{d.route}</td>
                    <td className="px-3 py-2">
                      {d.doseMin}–{d.doseMax} {d.doseUnit}/kg
                    </td>
                    <td className="px-3 py-2">{d.frequency ?? '—'}</td>
                    <td className="px-3 py-2">
                      <a
                        className="text-blue-700 underline break-all"
                        href={d.reference.sourceUrl}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        {d.reference.sourceName}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">References</h2>
        <div className="mt-3">
          <ReferenceBox references={drug.references} />
        </div>
      </section>

      <section className="mt-8">
        <SafetyNotice variant="long" />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Related</h2>
        <ul className="mt-2 list-disc pl-6 text-slate-700">
          <li><Link className="text-blue-700" href="/calculators/veterinary-drug-calculator/">Veterinary drug calculator</Link></li>
          <li><Link className="text-blue-700" href="/calculators/dog-drug-calculator/">Dog drug calculator</Link></li>
          <li><Link className="text-blue-700" href="/calculators/cat-drug-calculator/">Cat drug calculator</Link></li>
          <li><Link className="text-blue-700" href="/calculators/mg-to-ml-calculator/">mg to mL calculator</Link></li>
        </ul>
      </section>
    </article>
  );
}