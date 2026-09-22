import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getIndexableDrugs } from '@/lib/drugs';
import { LEARN_ARTICLES } from '@/lib/learn';

const STATIC_PATHS = [
  '/',
  '/calculators/',
  '/calculators/mg-kg-calculator/',
  '/calculators/mg-to-ml-calculator/',
  '/calculators/veterinary-fluid-calculator/',
  '/calculators/veterinary-cri-calculator/',
  '/calculators/veterinary-unit-converter/',
  '/calculators/veterinary-drug-calculator/',
  '/calculators/dog-drug-calculator/',
  '/calculators/cat-drug-calculator/',
  '/drug-reference/',
  '/learn/',
  '/about/',
  '/contact/',
  '/disclaimer/',
  '/privacy-policy/',
  '/terms/',
  '/editorial-policy/',
  '/references/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_PATHS.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1 : 0.7,
  }));

  const drugEntries = getIndexableDrugs().map((d) => ({
    url: `${SITE.url}/drugs/${d.slug}/`,
    lastModified: d.reviewDate ? new Date(d.reviewDate) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const learnEntries = LEARN_ARTICLES.filter((a) => a.indexable).map((a) => ({
    url: `${SITE.url}/learn/${a.slug}/`,
    lastModified: a.updated ? new Date(a.updated) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...drugEntries, ...learnEntries];
}