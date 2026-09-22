import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LEARN_ARTICLES } from '@/lib/learn';

export const metadata = buildMetadata({
  title: 'Veterinary Dose Calculator Guides',
  description:
    'Practical guides on veterinary dose calculation, mg/kg conversion, mg to mL conversion, drug concentrations and common calculation errors.',
  path: '/learn/',
  keywords: [
    'veterinary dose calculation',
    'how to calculate mg/kg',
    'veterinary drug dosage calculation',
  ],
});

export default function Page() {
  const articles = LEARN_ARTICLES.filter((a) => a.indexable);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/learn/' },
        ]}
      />

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Veterinary dose calculation guides
          </h1>
          <p className="mt-3 text-slate-700 max-w-2xl">
            Short, practical explanations of the arithmetic behind veterinary dose calculation.
            Each guide shows the formula, a worked example and the mistakes to watch for.
          </p>

          <div className="mt-8 space-y-4">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}/`}
                className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <h2 className="font-semibold text-slate-900">{a.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{a.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-blue-700">
                  Read guide
                </span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Jump to
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/calculators/">
                  All calculators
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/calculators/veterinary-drug-calculator/">
                  Veterinary drug calculator
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/drug-reference/">
                  Drug reference
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Educational content</p>
            <p className="mt-2 text-xs">
              These guides explain arithmetic. They do not provide diagnosis, prescribing guidance
              or treatment protocols.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}