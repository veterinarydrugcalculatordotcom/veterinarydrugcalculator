import Link from 'next/link';
import { SITE, SAFETY_SHORT } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <h2 className="font-semibold text-slate-900">{SITE.name}</h2>
          <p className="mt-2 text-slate-600">
            Educational veterinary calculation tools and reference information with traceable sources.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Calculators</h2>
          <ul className="mt-2 space-y-1">
            <li><Link className="text-slate-600 hover:text-blue-700" href="/calculators/">All calculators</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/calculators/veterinary-drug-calculator/">Veterinary drug calculator</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/calculators/dog-drug-calculator/">Dog drug calculator</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/calculators/cat-drug-calculator/">Cat drug calculator</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Reference</h2>
          <ul className="mt-2 space-y-1">
            <li><Link className="text-slate-600 hover:text-blue-700" href="/drug-reference/">Drug reference</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/learn/">Learn</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/references/">References</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/editorial-policy/">Editorial policy</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Site</h2>
          <ul className="mt-2 space-y-1">
            <li><Link className="text-slate-600 hover:text-blue-700" href="/about/">About</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/contact/">Contact</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/disclaimer/">Disclaimer</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/privacy-policy/">Privacy</Link></li>
            <li><Link className="text-slate-600 hover:text-blue-700" href="/terms/">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">
          <p>{SAFETY_SHORT}</p>
          <p className="mt-2">© {year} {SITE.name}. Educational and informational use only.</p>
        </div>
      </div>
    </footer>
  );
}