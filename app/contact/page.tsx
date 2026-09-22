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
            Use this form to report errors, broken source links, corrections or technical
            issues. We do not provide veterinary advice by email and cannot answer
            individual clinical questions.
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="mt-8 grid gap-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
          >
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot field: bots fill it, humans do not see it */}
            <p className="hidden">
              <label>
                Do not fill this out if you are human: <input name="bot-field" />
              </label>
            </p>

            <label className="block">
              <span className="text-sm font-medium text-ink-800">Your email</span>
              <input
                type="email"
                name="email"
                required
                className="mt-1.5 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-800">Subject</span>
              <select
                name="topic"
                className="mt-1.5 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              >
                <option>Error report</option>
                <option>Broken source link</option>
                <option>Reference correction</option>
                <option>Technical problem</option>
                <option>Content feedback</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-800">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-1.5 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </label>

            <button className="justify-self-start rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition">
              Send message
            </button>

            <p className="text-xs text-ink-500">
              Please do not include confidential clinical information.
            </p>
          </form>
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