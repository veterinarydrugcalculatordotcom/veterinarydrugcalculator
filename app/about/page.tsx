import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'What this site does, how the calculators work, how sources are selected and reviewed, and the limits of the tools.',
  path: '/about/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            About {SITE.name}
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            {SITE.name} is an educational veterinary calculation and reference website. It is
            designed for veterinary professionals, veterinary students and technicians, and for
            informed pet owners who want to understand how veterinary dose math works. It is not a
            substitute for veterinary care and does not provide veterinary diagnosis or treatment.
          </p>

          <div className="mt-10 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What the calculators do</h2>
              <p className="mt-2">
                The calculators perform the standard arithmetic used in veterinary dose,
                concentration, fluid and CRI calculations. They do not decide whether a given
                drug, dose rate, route or frequency is clinically appropriate. Those decisions
                require veterinary judgment and a verified reference.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">How sources are selected</h2>
              <p className="mt-2">
                Clinical values such as dose ranges, species, routes and frequencies are entered
                only from traceable, verifiable sources such as regulatory labelling, recognized
                veterinary references and peer-reviewed literature. Every clinical value on a
                drug page is linked to the source used. If a value is not verified, it is not
                shown and the calculator for that combination is not presented.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">How review works</h2>
              <p className="mt-2">
                Each verified drug record carries a review date and a review status. Records
                that are not verified are kept out of the index and out of the calculator. See
                our{' '}
                <Link className="text-blue-700 underline" href="/editorial-policy/">
                  editorial policy
                </Link>{' '}
                for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Limitations</h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Calculations are mathematical only and do not establish clinical appropriateness.</li>
                <li>References may change over time. Always verify against the current source.</li>
                <li>Rounding may affect displayed values. Internal calculations use full precision.</li>
                <li>Not all drugs or species are covered.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
              <p className="mt-2">
                Corrections, source suggestions and technical reports can be sent through our{' '}
                <Link className="text-blue-700 underline" href="/contact/">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </article>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Quick links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
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
                <Link className="text-slate-700 hover:text-blue-700" href="/editorial-policy/">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/references/">
                  References
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/disclaimer/">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs text-amber-900">
            <p className="font-semibold">Educational use only</p>
            <p className="mt-2">
              This site does not provide veterinary advice. Consult a qualified veterinarian for
              clinical decisions.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}