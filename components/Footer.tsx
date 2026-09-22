import Link from 'next/link';
import { SITE, SAFETY_SHORT } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4 text-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-500">
                <svg
                  width="16"
                  height="16"
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
              <span className="font-serif text-[15px] text-ink-900">{SITE.name}</span>
            </div>
            <p className="mt-3 text-ink-600 leading-relaxed">
              Educational veterinary calculation tools with source-linked reference data.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Calculators
            </h2>
            <ul className="mt-3 space-y-2">
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/calculators/">All calculators</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/calculators/veterinary-drug-calculator/">Veterinary drug calculator</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/calculators/dog-drug-calculator/">Dog dosage calculator</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/calculators/cat-drug-calculator/">Cat dosage calculator</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/calculators/mg-to-ml-calculator/">mg to mL calculator</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Reference
            </h2>
            <ul className="mt-3 space-y-2">
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/drug-reference/">Drug reference</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/learn/">Guides</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/references/">References</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/editorial-policy/">Editorial policy</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Site
            </h2>
            <ul className="mt-3 space-y-2">
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/about/">About</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/contact/">Contact</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/disclaimer/">Disclaimer</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/privacy-policy/">Privacy</Link></li>
              <li><Link className="text-ink-700 hover:text-brand-700 transition" href="/terms/">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-100 pt-6 text-xs text-ink-500">
          <p className="leading-relaxed">{SAFETY_SHORT}</p>
          <p className="mt-3">
            {year} {SITE.name}. Educational and informational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}