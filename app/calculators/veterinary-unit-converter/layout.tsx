import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Veterinary Unit Converter - kg, lb, mg, mL, mcg',
  description:
    'Free veterinary unit converter. Convert weight (kg, lb), mass (mg, mcg, g), and concentration (mg/mL, mcg/mL, g/mL) for dose calculations.',
  path: '/calculators/veterinary-unit-converter/',
  keywords: [
    'veterinary unit converter',
    'kg to lb',
    'mg to mcg',
    'veterinary conversion calculator',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}