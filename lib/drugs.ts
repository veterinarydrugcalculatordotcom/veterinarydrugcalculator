export type Species = 'dog' | 'cat' | 'horse' | 'cattle' | 'other';
export type Route = 'PO' | 'IV' | 'IM' | 'SC' | 'topical' | 'ophthalmic' | 'otic';

export interface Reference {
  sourceName: string;
  sourceUrl: string;
  sourceType: 'label' | 'textbook' | 'manual' | 'journal' | 'regulatory';
  sourceDate?: string;
}

export interface DrugRecord {
  slug: string;
  genericName: string;
  brandNames?: string[];
  drugClass?: string;
  species: Species[];
  formulations?: { description: string; concentration?: string }[];
  indications?: string[];
  contraindications?: string[];
  warnings?: string[];
  interactions?: string[];
  calculationNotes?: string;
  references: Reference[];
  reviewDate?: string;
  reviewStatus: 'verified' | 'pending' | 'not_available';
  indexable: boolean;
}

export interface DoseEntry {
  drugSlug: string;
  species: Species;
  route: Route;
  doseMin: number;
  doseMax: number;
  doseUnit: 'mg' | 'mcg' | 'g' | 'IU';
  frequency?: string;
  notes?: string;
  reference: Reference;
  verified: boolean;
}

/**
 * IMPORTANT — Add drug records only after you have personally verified
 * every clinical value against the linked source.
 *
 * Do not invent dose ranges, routes, species or source URLs.
 * Records with reviewStatus !== 'verified' will not be published or indexed.
 */
export const DRUGS: DrugRecord[] = [];

export const DOSES: DoseEntry[] = [];

export function getIndexableDrugs(): DrugRecord[] {
  return DRUGS.filter(
    (d) => d.indexable && d.reviewStatus === 'verified' && d.references.length > 0
  );
}

export function getDrugBySlug(slug: string): DrugRecord | undefined {
  return DRUGS.find((d) => d.slug === slug);
}

export function getVerifiedDosesFor(slug: string, species: Species): DoseEntry[] {
  return DOSES.filter((d) => d.drugSlug === slug && d.species === species && d.verified);
}

export function getVerifiedRoutesFor(slug: string, species: Species): Route[] {
  return Array.from(new Set(getVerifiedDosesFor(slug, species).map((d) => d.route)));
}