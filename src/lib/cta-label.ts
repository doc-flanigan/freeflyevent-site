import type { EventStatus } from '@/data/events';

export type EventState = EventStatus['state'];
export type CtaLocation = 'nav' | 'hero' | 'statusCard' | 'iae' | 'stickyBar';

type LabelPair = { live: string; notLive: string };

/**
 * Action-button copy by position x event state. Each position gets its own
 * wording so no two visible buttons on a page share a label. "Live" = ACTIVE;
 * UPCOMING / INACTIVE / CANCELLED_FREE_FLY all use the not-live copy.
 */
const LABELS: Record<CtaLocation, LabelPair> = {
  nav: { notLive: 'Get 50,000 UEC', live: 'Play Free Now' },
  hero: { notLive: 'Create Free Account — Lock In 50,000 UEC', live: 'Play Free Now — Claim 50,000 UEC' },
  statusCard: { notLive: 'Don’t Wait — Lock In Your Bonus Today', live: 'Start Playing Free — Code Pre-Filled' },
  iae: { notLive: 'Be Ready for IAE — Create Your Account', live: 'Jump In Before the Free Fly Ends' },
  stickyBar: { notLive: 'Sign Up Free', live: 'Play Free' },
};

export function ctaLabel(location: CtaLocation, state: EventState): string {
  const pair = LABELS[location];
  return state === 'ACTIVE' ? pair.live : pair.notLive;
}

/** @deprecated kept as an alias; prefer ctaLabel(location, state). */
export function primaryCtaLabel(status: EventStatus): string {
  return ctaLabel('hero', status.state);
}
