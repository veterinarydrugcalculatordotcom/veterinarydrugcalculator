import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'mg to mL Calculator - Convert mg to mL Free Online',
  description:
    'Free mg to mL calculator. Convert a total dose in mg to volume in mL using the drug concentration. Supports mg/mL, mcg/mL and g/mL.',
  path: '/calculators/mg-to-ml-calculator/',
  keywords: [
    'mg to ml calculator',
    'mg to ml conversion',
    'veterinary mg to ml calculator',
    'dose to volume calculator',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}