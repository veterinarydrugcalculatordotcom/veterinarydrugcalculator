import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Veterinary Drug Dose Calculator - mg/kg to mL Free',
  description:
    'Free online veterinary drug dose calculator. Enter mg/kg dose rate, body weight, and drug concentration to calculate total mg and volume in mL instantly.',
  path: '/calculators/veterinary-drug-calculator/',
  keywords: [
    'veterinary drug calculator',
    'veterinary dose calculator',
    'veterinary drug dose calculator',
    'vet dose calculator',
    'mg/kg to ml calculator',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}