import { SITE } from './site';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function drugPageJsonLd(args: { name: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: args.name,
    url: `${SITE.url}${args.path}`,
    description: args.description,
    specialty: 'Veterinary',
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Veterinary professionals and students',
    },
  };
}