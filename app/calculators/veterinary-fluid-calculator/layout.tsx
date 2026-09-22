import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Veterinary Fluid Calculator - Maintenance Rate Free',
  description:
    'Free veterinary fluid calculator. Calculate maintenance fluid rate in mL/hr from body weight, mL/kg/day and delivery hours. Fast, mobile-friendly tool.',
  path: '/calculators/veterinary-fluid-calculator/',
  keywords: [
    'veterinary fluid calculator',
    'fluid rate calculator',
    'maintenance fluid calculator',
    'vet fluid rate',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}