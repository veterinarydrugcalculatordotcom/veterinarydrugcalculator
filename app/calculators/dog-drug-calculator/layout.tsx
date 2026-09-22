import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Dog Dosage Calculator - Free Drug Dose Calculator',
  description:
    'Free dog dosage calculator. Enter your dog weight, dose rate (mg/kg), and concentration to calculate total mg and volume in mL. Works for any medication.',
  path: '/calculators/dog-drug-calculator/',
  keywords: [
    'dog dosage calculator',
    'dog drug calculator',
    'dog medication dosage calculator',
    'dog dose calculator',
    'dosage calculator for dogs',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}