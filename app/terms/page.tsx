import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms governing use of this educational veterinary calculation website.',
  path: '/terms/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Terms', href: '/terms/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Terms of Use</h1>
          <p className="mt-4 text-slate-800">
            By using this website you agree to the following terms.
          </p>

          <div className="mt-10 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Educational use</h2>
              <p className="mt-2">
                This website provides educational and informational veterinary calculation tools.
                It does not provide veterinary diagnosis or treatment and is not a substitute for
                advice from a qualified veterinarian.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">No warranty</h2>
              <p className="mt-2">
                The site is provided as is. While we work to keep reference data accurate and up
                to date, we do not warrant that the site or its calculations are free from error,
                or that any particular result is correct for any particular case.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Acceptable use</h2>
              <p className="mt-2">
                Do not misuse the site, attempt to disrupt it, or use it in violation of
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Changes</h2>
              <p className="mt-2">
                These terms may change over time. Continued use constitutes acceptance of the
                current version.
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
                <Link className="text-slate-700 hover:text-blue-700" href="/privacy-policy/">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/disclaimer/">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/editorial-policy/">
                  Editorial policy
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}