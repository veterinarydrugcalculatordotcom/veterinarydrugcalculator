import Link from 'next/link';
import { SITE } from '@/lib/site';

const NAV = [
  { href: '/calculators/', label: 'Calculators' },
  { href: '/drug-reference/', label: 'Drug Reference' },
  { href: '/learn/', label: 'Learn' },
  { href: '/references/', label: 'References' },
  { href: '/about/', label: 'About' },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
            V
          </span>
          <span className="hidden sm:inline">{SITE.name}</span>
          <span className="sm:hidden">VetDrugCalc</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-slate-700 hover:text-blue-700">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/search/"
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700"
        >
          Search
        </Link>
      </div>
    </header>
  );
}