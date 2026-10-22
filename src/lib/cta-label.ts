import type { EventStatus } from '@/data/events';

export type EventState = EventStatus['state'];
export type CtaLocation = 'nav' | 'statusCard' | 'preStep' | 'iae' | 'stickyBar';

type LabelPair = { live: string; notLive: string };

/**
 * Action-button copy by position x event state. Each position gets its own
 * wording so no two visible buttons on a page share a label. "Live" = ACTIVE;
 * UPCOMING / INACTIVE / CANCELLED_FREE_FLY all use the not-live copy.
 */
const LABELS: Record<CtaLocation, LabelPair> = {
  nav: { notLive: 'Get 50,000 UEC', live: 'Play Free Now' },
  statusCard: { notLive: 'Don’t Wait — Lock In Your Bonus Today', live: 'Start Playing Free — Code Pre-Filled' },
  preStep: { notLive: 'Lock In Your Bonus Before It Starts', live: 'Not Signed Up Yet? Do It Now' },
  iae: { notLive: 'Be Ready for IAE — Create Your Account', live: 'Jump In Before the Free Fly Ends' },
  stickyBar: { notLive: 'Sign Up Free', live: 'Play Free' },
};

export function ctaLabel(location: CtaLocation, state: EventState): string {
  const pair = LABELS[location];
  return state === 'ACTIVE' ? pair.live : pair.notLive;
}

