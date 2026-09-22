import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Veterinary CRI Calculator - mcg/kg/min to mL/hr Free',
  description:
    'Free veterinary CRI calculator. Convert a constant rate infusion dose in mcg/kg/min to a pump rate in mL/hr using the drug concentration.',
  path: '/calculators/veterinary-cri-calculator/',
  keywords: [
    'veterinary cri calculator',
    'cri calculator vet',
    'mcg/kg/min to ml/hr',
    'constant rate infusion calculator',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}