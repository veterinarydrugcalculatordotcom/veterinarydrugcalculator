import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="mt-4 inline-block text-blue-700">
        Return to home
      </Link>
    </div>
  );
}