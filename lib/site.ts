export const SITE = {
  name: 'Veterinary Drug Calculator',
  shortName: 'VetDrugCalc',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://veterinarydrugcalculator.com',
  description:
    'Educational veterinary drug dosage, fluid, CRI and unit-conversion calculators with verified clinical reference data and direct source links.',
  locale: 'en_US',
  lang: 'en',
};

export const SAFETY_SHORT =
  'Educational calculation only. This result does not determine whether the medication or dose is appropriate for an individual animal. Verify clinical decisions with a qualified veterinarian.';

export const SAFETY_LONG =
  'This website provides educational and informational veterinary calculation tools. It does not provide veterinary diagnosis or treatment and should not be used as a substitute for advice from a qualified veterinarian. Calculator results are mathematical calculations based on the values you enter and the reference data available in our verified database. A calculated number does not determine whether a medication, dose, route, frequency or treatment plan is appropriate for an individual animal. Pet owners should consult a qualified veterinarian before administering any medication. In an emergency, contact a veterinarian or an emergency animal hospital immediately.';