import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Report errors, broken links, source corrections, technical problems or content feedback.',
  path: '/contact/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
            Contact
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            For corrections, broken source links, or technical issues, please reach out to us
            by email.
          </p>

          <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <p className="text-sm font-medium text-ink-700">Email us at:</p>
            <p className="mt-2 text-xl font-semibold text-brand-700">
              info@veterinarydrugcalculator.com
            </p>
            <p className="mt-4 text-xs text-ink-500">
              We do not provide veterinary advice by email and cannot answer individual
              clinical questions. Please do not include confidential clinical information.
            </p>
          </div>

          <p className="mt-6 text-sm text-ink-600">
            We aim to respond to legitimate corrections and technical reports within a few
            business days.
          </p>
        </article>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="rounded-2xl border border-ink-200 bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Before you write
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700 leading-relaxed">
              <li>We cannot answer clinical questions.</li>
              <li>For emergencies, contact a veterinarian directly.</li>
              <li>For source corrections, include the page URL.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Related
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/editorial-policy/">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:text-brand-800 transition" href="/references/">
                  References
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}