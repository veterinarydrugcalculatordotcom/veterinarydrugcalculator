import { SAFETY_SHORT } from '@/lib/site';

export default function SafetyNotice({ variant = 'short' }: { variant?: 'short' | 'long' }) {
  if (variant === 'long') {
    return (
      <div role="note" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        {SAFETY_SHORT}
      </div>
    );
  }
  return (
    <p role="note" className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900">
      {SAFETY_SHORT}
    </p>
  );
}