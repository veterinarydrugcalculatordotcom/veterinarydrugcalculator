import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { SITE } from '@/lib/site';
import { websiteJsonLd } from '@/lib/jsonld';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.name,
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  verification: {
    google: 'OPTs-Y-kedC2QLlF5j8Wha0wERZd3_KSVsPUDiC0ltc',
    other: {
      'msvalidate.01': 'E36619231AF623BBDBFB4F8B36D2521C',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f8a8b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="OPTs-Y-kedC2QLlF5j8Wha0wERZd3_KSVsPUDiC0ltc"
        />
        <meta
          name="msvalidate.01"
          content="E36619231AF623BBDBFB4F8B36D2521C"
        />
      </head>
      <body className="min-h-screen bg-ink-50 font-sans text-ink-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:border"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <Analytics />
      </body>
    </html>
  );
}