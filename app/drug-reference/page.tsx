import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DRUGS, getIndexableDrugs } from '@/lib/drugs';

export const metadata = buildMetadata({
  title: 'Veterinary Drug Reference - Authoritative Sources & Doses',
  description:
    'Verified veterinary drug reference with dose information, species restrictions, and links to FDA, Merck Veterinary Manual, and Plumb’s for source-verified data.',
  path: '/drug-reference/',
  keywords: [
    'veterinary drug reference',
    'veterinary drug information',
    'vet drug doses',
    'veterinary drug database',
  ],
});

export default function Page() {
  const indexable = getIndexableDrugs();
  const total = DRUGS.length;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Drug reference', href: '/drug-reference/' },
        ]}
      />

      <div className="mt-6 max-w-3xl">
        <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
          Veterinary Drug Reference
        </h1>
        <p className="mt-5 text-lg text-ink-700 leading-relaxed">
          Our drug reference is built on verified, source-linked data. Drug pages are published
          only after each clinical value has been verified against a specific, linkable source.
          Until a drug page is published, you can consult the authoritative references listed
          below.
        </p>
      </div>

      {/* OUR VERIFIED DRUG PAGES */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink-900">Our published drug pages</h2>

        {indexable.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6">
            <p className="text-ink-700">
              This information is not currently available in our verified reference database.
            </p>
            <p className="mt-2 text-sm text-ink-600">
              We publish drug reference pages only after each clinical value has been verified
              against a specific, linkable source. Records currently in progress: {total}.
            </p>
          </div>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indexable.map((d) => (
              <li key={d.slug} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
                <Link href={`/drugs/${d.slug}/`} className="font-medium text-brand-700 hover:text-brand-800">
                  {d.genericName}
                </Link>
                {d.species.length > 0 && (
                  <div className="mt-1 text-xs text-ink-500">
                    Species: {d.species.join(', ')}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* EXTERNAL AUTHORITATIVE SOURCES */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink-900">
          Authoritative veterinary drug references
        </h2>
        <p className="mt-3 text-ink-700 max-w-2xl">
          These are recognized, source-verifiable references used by veterinary professionals
          and students. Each link opens the official source.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* FDA */}
          <a
            href="https://www.fda.gov/animal-veterinary"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700">
              FDA Animal &amp; Veterinary
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              U.S. regulatory authority for animal drugs. Official product labels, adverse event
              reporting, and approval information.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
              fda.gov/animal-veterinary
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Merck Veterinary Manual */}
          <a
            href="https://www.merckvetmanual.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700">
              Merck Veterinary Manual
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              Recognized veterinary reference. Drug dosing tables, species-specific information,
              and clinical guidance.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
              merckvetmanual.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Plumb's */}
          <a
            href="https://www.plumbs.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <path d="M8 6h8M8 10h8M8 14h4" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700">
              Plumb’s Veterinary Drugs
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              Trusted clinical drug reference for veterinary professionals. Comprehensive,
              continually updated drug and dosing information.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
              plumbs.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* AVMA */}
          <a
            href="https://www.avma.org/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700">
              AVMA
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              American Veterinary Medical Association. Professional guidelines, publications,
              and journals including AJVR and JAVMA.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
              avma.org
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* HOW WE USE SOURCES */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl text-ink-900">How we use these sources</h2>
        <ul className="mt-4 space-y-3 text-ink-700 leading-relaxed list-disc pl-6">
          <li>
            Every clinical value (dose range, species, route, frequency) on our drug pages is
            linked to a specific source from the list above or to peer-reviewed literature.
          </li>
          <li>
            Species and route options appear only where verified data exists for that
            combination.
          </li>
          <li>
            If a value cannot be verified against a linkable source, it is not published and
            the calculator for that combination is not offered.
          </li>
          <li>
            Records carry a review date and a review status; unverified records are kept out
            of the index.
          </li>
        </ul>
      </section>
    </>
  );
}