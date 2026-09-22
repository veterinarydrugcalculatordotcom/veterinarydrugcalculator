import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SAFETY_LONG } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Disclaimer',
  description:
    'Educational purpose, limits of the calculators, and the role of a qualified veterinarian.',
  path: '/disclaimer/',
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Disclaimer', href: '/disclaimer/' },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Disclaimer</h1>
          <p className="mt-4 text-slate-800">{SAFETY_LONG}</p>

          <div className="mt-10 space-y-8 text-slate-800">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What a calculated result means</h2>
              <p className="mt-2">
                A calculated result is the output of a mathematical operation applied to the
                values you entered. It does not evaluate diagnosis, drug choice, dose rate, route,
                frequency, formulation, species-specific toxicity, contraindications, interactions
                or monitoring requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Pet owners</h2>
              <p className="mt-2">
                Do not use this site to determine whether to give a medication, or how much to
                give. Consult a qualified veterinarian before administering any medication. If
                you suspect an overdose or poisoning, contact a veterinarian or an emergency
                animal hospital immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">No veterinary relationship</h2>
              <p className="mt-2">
                Use of this website does not create a veterinarian and client and patient
                relationship and does not constitute veterinary advice.
              </p>
            </section>
          </div>
        </article>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Related
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/editorial-policy/">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/terms/">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/privacy-policy/">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-blue-700" href="/references/">
                  References
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs text-amber-900">
            <p className="font-semibold">Emergency</p>
            <p className="mt-2">
              If you suspect an overdose or poisoning, contact a veterinarian or emergency animal
              hospital immediately.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}