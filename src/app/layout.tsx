import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Archivo, Chakra_Petch, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/**
 * Type system: Chakra Petch — angular, HUD-like display face for headings
 * and buttons (fits the in-game ship-computer aesthetic); Archivo — clean
 * grotesk body; JetBrains Mono — countdown digits, codes, and eyebrow labels.
 */
const archivo = Archivo({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const chakra = Chakra_Petch({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
});
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

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
    images: [{ url: '/images/hero/hero-01.jpg', width: 1920, height: 1080, alt: 'Star Citizen Free Fly Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Citizen Free Fly Events — Play Free',
    description:
      'Find current Free Fly dates, what is included, and the 50,000 UEC referral bonus.',
    images: ['/images/hero/hero-01.jpg'],
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
    <html
      lang="en"
      className={`bg-spaceBlack ${archivo.variable} ${chakra.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen font-sans text-white antialiased">
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "try{(function(){if(sessionStorage.getItem('lref'))return;var v,qs=new URLSearchParams(location.search),u=qs.get('utm_source')||qs.get('ref');if(u){v='param:'+u;}else if(document.referrer){var rh=document.referrer.split('://')[1]||document.referrer;rh=rh.split('/')[0];if(rh.indexOf('www.')===0){rh=rh.slice(4);}var lh=location.host;if(lh.indexOf('www.')===0){lh=lh.slice(4);}v=(rh&&rh!==lh)?document.referrer.slice(0,300):'direct';}else{v='direct';}sessionStorage.setItem('lref',v);})();}catch(e){}",
          }}
        />
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
