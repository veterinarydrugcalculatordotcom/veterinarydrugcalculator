import Link from 'next/link';

const NAV = [
  { href: '/calculators/', label: 'Calculators' },
  { href: '/drug-reference/', label: 'Drug Reference' },
  { href: '/learn/', label: 'Guides' },
  { href: '/references/', label: 'References' },
  { href: '/about/', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-500 shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-[15px] font-normal text-ink-900">
              Veterinary Drug
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-700">
              Calculator
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-ink-700 hover:text-brand-700 transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search/"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-700 hover:border-brand-400 hover:text-brand-700 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <Link
            href="/calculators/veterinary-drug-calculator/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition"
          >
            Open calculator
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <nav aria-label="Primary mobile" className="md:hidden border-t border-ink-100 bg-white">
        <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-2 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-ink-700 hover:text-brand-700"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}