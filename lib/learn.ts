export interface LearnArticle {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  indexable: boolean;
  body: string;
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'how-to-calculate-veterinary-drug-dose',
    title: 'How to Calculate a Veterinary Drug Dose',
    description:
      'Step-by-step explanation of the standard veterinary dose calculation: dose rate × body weight = total dose, then total dose ÷ concentration = volume.',
    indexable: true,
    body: `A veterinary dose calculation has two steps. First, a dose rate expressed per kilogram of body weight is multiplied by the animal's body weight in kilograms to obtain the total dose. Second, the total dose is divided by the concentration of the product on hand to obtain the volume to draw up.

Step 1 — total dose
total dose (mg) = dose rate (mg/kg) × body weight (kg)

Step 2 — volume
volume (mL) = total dose (mg) ÷ concentration (mg/mL)

Units must match. If the dose rate is given in mg/kg but the concentration is in mcg/mL, convert one of them first so both use the same base unit (mg or mcg).

This is a mathematical procedure. It does not tell you whether a given drug is appropriate for a given patient, whether the dose rate you selected is correct, or whether the route is appropriate. Those decisions require veterinary judgment and a current, verified reference.`,
  },
  {
    slug: 'how-to-convert-mg-kg-to-mg',
    title: 'How to Convert mg/kg to mg',
    description:
      'Multiply a mg/kg dose rate by body weight in kilograms to obtain a total dose in mg. Includes a worked example.',
    indexable: true,
    body: `A dose rate written as mg/kg tells you how many milligrams of drug are given per kilogram of body weight. To convert it into a total dose in mg, multiply by the animal's weight in kilograms.

total dose (mg) = dose rate (mg/kg) × weight (kg)

Example: a dose rate of 5 mg/kg in a 12 kg patient gives 5 × 12 = 60 mg total.

If the weight is given in pounds, convert to kilograms first: weight (kg) = weight (lb) × 0.45359237.

This is a unit and arithmetic conversion. It does not certify that the dose rate, drug or route is correct for a given patient. Confirm clinical decisions against a verified reference and veterinary judgment.`,
  },
  {
    slug: 'how-to-convert-mg-to-ml',
    title: 'How to Convert mg to mL',
    description:
      'Convert a total dose in mg into a volume in mL using the concentration on the product label.',
    indexable: true,
    body: `A total dose expressed in milligrams is converted to a volume in milliliters using the concentration on the product label.

volume (mL) = total dose (mg) ÷ concentration (mg/mL)

Example: a 50 mg total dose with a 50 mg/mL product gives 50 ÷ 50 = 1 mL.

If the concentration is expressed in mcg/mL, divide the concentration by 1000 to convert it to mg/mL before doing the calculation. If the concentration is expressed in g/mL, multiply by 1000 instead.

This is a unit and arithmetic conversion. It does not certify that the total dose is clinically appropriate for the animal.`,
  },
  {
    slug: 'understanding-veterinary-drug-concentrations',
    title: 'Understanding Veterinary Drug Concentrations',
    description:
      'What mg/mL, mcg/mL, percent solutions and IU mean in veterinary products, and how to convert between them.',
    indexable: true,
    body: `Veterinary drug labels express concentration in several different ways. The most common is mg/mL, which means milligrams of drug per milliliter of solution. Concentrations can also be expressed as mcg/mL, g/mL, percent (%), or in International Units (IU) for certain biological products.

mg/mL is the most direct form for dose calculation because it matches the mg dosage unit without conversion.

mcg/mL is used for very dilute products. One mcg is one thousandth of a milligram, so 1000 mcg/mL equals 1 mg/mL.

Percent solutions express grams per 100 mL. A 1% solution contains 1 g per 100 mL, which is the same as 10 mg/mL.

IU is used for products like insulin and some vitamins where the biological activity, not the mass, is the meaningful unit. IU cannot be converted to mg without product-specific information.

When you calculate a volume, always check that the concentration unit on the label matches the concentration unit you entered in the calculator.`,
  },
  {
    slug: 'common-veterinary-medication-calculation-errors',
    title: 'Common Veterinary Medication Calculation Errors',
    description:
      'Frequent mistakes in veterinary dose calculation, including unit mismatches, decimal errors and concentration confusion.',
    indexable: true,
    body: `Dose calculation errors in veterinary medicine usually come from a small set of recurring causes.

Unit mismatch. Dose rates in mg/kg combined with concentrations in mcg/mL is a frequent source of error. Always convert to a single base unit before multiplying or dividing.

Decimal errors. Moving the decimal point by one position changes a dose by a factor of ten. Write out the units explicitly at each step.

Weight unit confusion. Pounds and kilograms are not interchangeable. Confirm which unit the scale is reporting.

Percent solution conversion. A 2% solution is 20 mg/mL, not 2 mg/mL. The multiplication by 10 catches people out.

Rounding errors. Rounding intermediate values and then continuing the calculation compounds the error. Keep full precision internally and round only the final displayed value.

Reading the wrong line on a multi-strength product. Products may exist in several strengths. Confirm the concentration printed on the specific bottle being used.`,
  },
];