import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cat Dosage Calculator - Free Drug Dose Calculator',
  description:
    'Free cat dosage calculator. Enter your cat weight, dose rate (mg/kg), and concentration to calculate total mg and volume in mL. Works for any medication.',
  path: '/calculators/cat-drug-calculator/',
  keywords: [
    'cat dosage calculator',
    'cat drug calculator',
    'cat medication dosage calculator',
    'cat dose calculator',
    'dosage calculator for cats',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}