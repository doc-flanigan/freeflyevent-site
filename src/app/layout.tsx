import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeflyevent.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Star Citizen Free Fly 2026 — Play Free, No Purchase',
    template: '%s — freeflyevent.com',
  },
  description:
    "Star Citizen Free Fly events let anyone play the game for free. Find current event dates, what's included, and how to get your 50,000 UEC referral bonus.",
  keywords: [
    'Star Citizen Free Fly',
    'Free Fly event',
    'Star Citizen 2026',
    'play Star Citizen free',
    'Star Citizen referral bonus',
    'STAR-GCQJ-N6NC',
    'Star Citizen free fly 2026',
    'DefenseCon 2026 free fly',
    'DefenseCon free fly back on',
    'Star Citizen DefenseCon 2956',
    'Star Citizen free fly reinstated',
  ],
  authors: [{ name: 'Doc_Flanigan' }],
  openGraph: {
    type: 'website',
    siteName: 'freeflyevent.com',
    url: SITE_URL,
    title: 'Star Citizen Free Fly Events — Play Free, No Purchase',
    description:
      "Star Citizen Free Fly events let anyone play the game for free. Find current event dates, what's included, and how to get your 50,000 UEC referral bonus.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Citizen Free Fly Events — Play Free',
    description:
      'Find current Free Fly dates, what is included, and the 50,000 UEC referral bonus.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#080c14',
  width: 'device-width',
  initialScale: 1,
};

const SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'freeflyevent.com',
      description:
        'Star Citizen Free Fly event tracker — current event status, dates, and referral bonus guide.',
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'freeflyevent.com',
      url: SITE_URL,
      description:
        'Unofficial Star Citizen fan site tracking Free Fly events and referral bonuses. Not affiliated with Cloud Imperium Games.',
      sameAs: ['https://dayonecitizen.com'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-spaceBlack">
      <body className="min-h-screen bg-spaceBlack font-sans text-white antialiased">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
        />
      </body>
    </html>
  );
}
