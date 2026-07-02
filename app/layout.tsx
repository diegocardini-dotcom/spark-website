import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import './globals.css';

const SITE_URL = 'https://sparkdigital.agency';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Spark Digital Agency, Systems that turn attention into customers',
    template: '%s · Spark Digital Agency',
  },
  description:
    'Spark builds the CRM, automation, and AI systems that scale your business, without scaling your headcount. Pipelines, funnels, websites, AI agents, SEO.',
  keywords: [
    'digital agency', 'CRM', 'GoHighLevel', 'AI agents', 'marketing automation',
    'lead generation', 'SEO', 'web development', 'landing pages', 'sales funnels',
  ],
  authors: [{ name: 'Spark Digital Agency' }],
  creator: 'Spark Digital Agency',
  publisher: 'Spark Digital Agency',
  alternates: { canonical: SITE_URL, languages: { en: SITE_URL, es: SITE_URL } },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Spark Digital Agency',
    title: 'Spark Digital Agency, Growth infrastructure',
    description:
      'Websites, automation, and AI, all working together. Light up your business.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Spark Digital Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spark Digital Agency',
    description: 'Websites, automation, and AI, all working together.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spark Digital Agency',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: ['https://sparkdigital.agency'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@sparkdigital.agency',
    availableLanguage: ['English', 'Spanish'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body className="min-h-screen bg-ink-900 text-ink-100 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
