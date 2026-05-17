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
  ];
}
