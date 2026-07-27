import type { MetadataRoute } from 'next';
import { FREE_FLY_HISTORY } from '@/data/events';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeflyevent.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage is dynamic — event status, cancellation notices, and featured
  // content change with every event. Always signal today's date.
  const homepageModified = new Date();

  // Event guide is static reference content. Use the date it was last
  // substantively edited rather than pretending it changes daily.
  const guideModified = new Date('2026-01-15');

  // Event history reflects the most recent FREE_FLY_HISTORY entry's end date
  // as a proxy for when the table last changed meaningfully.
  const mostRecentEventDate = FREE_FLY_HISTORY[0]
    ? new Date(FREE_FLY_HISTORY[0].start)
    : new Date('2026-01-01');

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: homepageModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/is-star-citizen-free`,
      lastModified: new Date('2026-06-29'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/next-free-fly`,
      lastModified: homepageModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/foundation-festival-2026`,
      // CIG has said "more details coming soon" (referral reward terms,
      // possible Free Fly) — treat as frequently-changing until settled.
      lastModified: new Date('2026-07-26'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/event-guide`,
      lastModified: guideModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/event-history`,
      lastModified: mostRecentEventDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/glossary`,
      lastModified: mostRecentEventDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/should-i-buy`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
