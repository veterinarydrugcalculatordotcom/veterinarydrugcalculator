import type { Metadata } from 'next';
import { SITE } from './site';

export interface BuildMetaArgs {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path,
  ogType = 'website',
  noindex = false,
  keywords,
}: BuildMetaArgs): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}