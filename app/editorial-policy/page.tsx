import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Editorial Policy',
  description:
    'How sources are selected, how clinical data is verified and reviewed, and how corrections are handled.',
  path: '/editorial-policy/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Editorial Policy', href: '/editorial-policy/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Editorial Policy</h1>

          <div className="mt-8 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Source selection</h2>
              <p className="mt-2">
                Clinical values are only entered from sources that can be linked to directly and
                verified. Preferred source types include official product labelling, regulatory
                resources such as FDA animal and veterinary resources, recognized veterinary
                references such as the Merck Veterinary Manual, and peer-reviewed veterinary
                literature.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Verification</h2>
              <p className="mt-2">
                Each clinical record must have at least one source with a direct URL. If a value
                cannot be verified, it is not published and the calculator for that combination
                is not offered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Updates</h2>
              <p className="mt-2">
                Records carry a review date. Sources are rechecked periodically. If a source
                changes, the associated value is updated or removed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Corrections</h2>
              <p className="mt-2">
                If you find an error, please report it through the{' '}
                <Link className="text-blue-700 underline" href="/contact/">
                  contact page
                </Link>
                . Corrections are applied to the record and the review date is updated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">
                Educational content versus clinical advice
              </h2>
              <p className="mt-2">
                Educational articles explain arithmetic and unit handling. They do not provide
                diagnosis, prescribing guidance or treatment protocols. Clinical decisions
                require veterinary judgment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">No fabricated data</h2>
              <p className="mt-2">
                We do not publish invented dose ranges, species indications, routes, frequencies,
                concentrations, contraindications, interactions, toxicity thresholds, protocols,
                credentials, reviews or source URLs.
              </p>
            </section>
          </div>
        </article>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Related
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/references/">
                  References
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/about/">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/contact/">
                  Report an error
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}