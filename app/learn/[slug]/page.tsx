import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SafetyNotice from '@/components/SafetyNotice';
import { LEARN_ARTICLES } from '@/lib/learn';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return LEARN_ARTICLES.filter((a) => a.indexable).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const a = LEARN_ARTICLES.find((x) => x.slug === params.slug);
  if (!a || !a.indexable) return { robots: { index: false, follow: true } };
  return buildMetadata({
    title: a.title,
    description: a.description,
    path: `/learn/${a.slug}/`,
    ogType: 'article',
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const a = LEARN_ARTICLES.find((x) => x.slug === params.slug);
  if (!a || !a.indexable) notFound();

  const paragraphs = a.body.split(/\n\n+/);
  const otherArticles = LEARN_ARTICLES.filter((x) => x.indexable && x.slug !== a.slug).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/learn/' },
          { name: a.title, href: `/learn/${a.slug}/` },
        ]}
      />

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* MAIN ARTICLE */}
        <article>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {a.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600">{a.description}</p>

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate-800">
            {paragraphs.map((p, i) => {
              const lines = p.split('\n');
              const isFormulaBlock = lines.some((l) => l.includes('='));
              if (isFormulaBlock) {
                return (
                  <pre
                    key={i}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm overflow-x-auto"
                  >
                    {p}
                  </pre>
                );
              }
              return <p key={i}>{p}</p>;
            })}
          </div>

          <div className="mt-10">
            <SafetyNotice variant="long" />
          </div>

          {/* INLINE RELATED CALCULATORS */}
          <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Try the related calculators</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Link
                href="/calculators/mg-kg-calculator/"
                className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm"
              >
                <div className="font-medium text-slate-900">mg/kg calculator</div>
                <div className="text-sm text-slate-600">Dose rate x weight to total mg.</div>
              </Link>
              <Link
                href="/calculators/mg-to-ml-calculator/"
                className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm"
              >
                <div className="font-medium text-slate-900">mg to mL calculator</div>
                <div className="text-sm text-slate-600">Total mg to volume in mL.</div>
              </Link>
            </div>
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          {/* Quick links */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              In this section
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/learn/">
                  All guides
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/calculators/">
                  All calculators
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/drug-reference/">
                  Drug reference
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/references/">
                  Source references
                </Link>
              </li>
            </ul>
          </div>

          {/* Other articles */}
          {otherArticles.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                More guides
              </h2>
              <ul className="mt-3 space-y-3 text-sm">
                {otherArticles.map((o) => (
                  <li key={o.slug}>
                    <Link
                      className="block font-medium text-slate-800 hover:text-blue-700"
                      href={`/learn/${o.slug}/`}
                    >
                      {o.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{o.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety card */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs text-amber-900">
            <p className="font-semibold">Safety reminder</p>
            <p className="mt-2">
              These guides explain arithmetic only. They do not replace veterinary judgment or a
              verified reference.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}