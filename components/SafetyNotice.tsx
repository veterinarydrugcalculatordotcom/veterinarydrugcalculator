import { SAFETY_SHORT } from '@/lib/site';

export default function SafetyNotice({ variant = 'short' }: { variant?: 'short' | 'long' }) {
  if (variant === 'long') {
    return (
      <div
        role="note"
        className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 leading-relaxed"
      >
        <p className="font-medium">Educational use only</p>
        <p className="mt-1">{SAFETY_SHORT}</p>
      </div>
    );
  }
  return (
    <p
      role="note"
      className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900 leading-relaxed"
    >
      {SAFETY_SHORT}
    </p>
  );
}