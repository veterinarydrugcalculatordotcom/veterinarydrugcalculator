import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'References',
  description:
    'The types of authoritative veterinary references used across this site and how to verify them.',
  path: '/references/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'References', href: '/references/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">References</h1>
          <p className="mt-4 text-slate-800">
            Every clinical value published on this site is linked directly to the specific source
            used. This page describes the categories of sources we rely on. It is not a substitute
            for the specific links shown on each drug page.
          </p>

          <div className="mt-10 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Regulatory resources</h2>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>
                  <a
                    className="text-blue-700 underline"
                    href="https://www.fda.gov/animal-veterinary"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    FDA — Animal and Veterinary
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">
                Recognized veterinary references
              </h2>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>
                  <a
                    className="text-blue-700 underline"
                    href="https://www.merckvetmanual.com/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Merck Veterinary Manual
                  </a>
                </li>
              </ul>
            </section>

            <p className="text-sm text-slate-600">
              Specific article and label links are shown on each drug page in its References
              section.
            </p>
          </div>
        </article>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Related
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/editorial-policy/">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/drug-reference/">
                  Drug reference
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/about/">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}