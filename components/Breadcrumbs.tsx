import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = breadcrumbJsonLd(items.map((i) => ({ name: i.name, path: i.href })));

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink-800">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-brand-700 transition">
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden className="text-ink-300">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}