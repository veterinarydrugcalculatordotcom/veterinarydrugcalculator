import type { Reference } from '@/lib/drugs';

export default function ReferenceBox({ references }: { references: Reference[] }) {
  if (!references.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        This information is not currently available in our verified reference database.
      </div>
    );
  }
  return (
    <section aria-labelledby="references-heading" className="rounded-md border border-slate-200 p-4">
      <h2 id="references-heading" className="text-base font-semibold text-slate-900">References</h2>
      <ul className="mt-2 space-y-2 text-sm">
        {references.map((r) => (
          <li key={r.sourceUrl} className="text-slate-700">
            <span className="font-medium">{r.sourceName}</span>
            {r.sourceDate ? <span className="text-slate-500"> · {r.sourceDate}</span> : null}
            <br />
            <a
              href={r.sourceUrl}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="text-blue-700 underline break-all"
            >
              {r.sourceUrl}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}