import Link from 'next/link';

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-slate-900">{c.name}</span>
              ) : (
                <Link href={c.href} className="hover:text-blue-700">{c.name}</Link>
              )}
              {!last && <span aria-hidden className="text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}