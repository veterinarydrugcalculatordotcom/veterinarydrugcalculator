import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'mg/kg Calculator - Calculate Dose from mg/kg Free',
  description:
    'Free mg/kg calculator. Convert a mg/kg dose rate into a total mg dose using body weight. Supports kg and lb. Useful for veterinary and clinical dosing.',
  path: '/calculators/mg-kg-calculator/',
  keywords: [
    'mg/kg calculator',
    'veterinary mg/kg calculator',
    'mg per kg calculator',
    'dose calculator mg/kg',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}