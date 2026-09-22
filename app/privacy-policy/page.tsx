import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'What information this site processes and how it is handled.',
  path: '/privacy-policy/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Privacy Policy', href: '/privacy-policy/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="mt-4 text-slate-800">
            This policy explains what information is processed when you visit this website.
          </p>

          <div className="mt-10 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Information you provide</h2>
              <p className="mt-2">
                If you use the contact form, the information you submit is used to respond to your
                message. Calculator inputs such as weight, dose rate and concentration are
                processed in your browser to produce the displayed result. They are not sent to
                a server for calculation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
              <p className="mt-2">
                If analytics is enabled, aggregated, non-identifying usage data is collected to
                understand which pages are used. IP addresses may be processed by the analytics
                provider for this purpose. Analytics is only loaded when configured.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Advertising</h2>
              <p className="mt-2">
                If advertising is enabled, ad providers may set cookies or use similar
                technologies as permitted by applicable law. Where required, consent will be
                requested before non-essential cookies are set.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Your choices</h2>
              <p className="mt-2">
                You can control cookies through your browser. You can contact us using the
                contact form to ask questions about this policy.
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
                <Link className="text-slate-700 hover:text-blue-700" href="/terms/">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/disclaimer/">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/contact/">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}