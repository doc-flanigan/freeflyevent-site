/**
 * Free Fly events data.
 *
 * Update this file when CIG announces a new event. The site automatically
 * derives banner state (ACTIVE / UPCOMING / INACTIVE) from `start` and `end`
 * compared to the current time.
 *
 * Dates are ISO 8601 in UTC. CIG typically runs Free Flys ~10 days.
 */

export type BonusOverride = {
  /** Full sentence for body copy, e.g. "50,000 UEC + a Drake Dragonfly with Coalfire paint" */
  text: string;
  /** Short badge label for compact banner strip */
  badge: string;
  /** ISO UTC — bonus reverts to standard 50k UEC after this time */
  expiresAt: string;
  /** Optional promo image shown in banner/homepage bonus panels */
  image?: { src: string; alt: string };
};

export type FreeFlyEvent = {
  id: string;
  name: string;
  start: string; // ISO UTC
  end: string; // ISO UTC
  ships: string[]; // ships unlocked during the event (empty if free fly was cancelled)
  freeFlyActive?: boolean; // false = event window exists but CIG cancelled free access
  cancelledNote?: string; // shown in banner when freeFlyActive is false
  bonusOverride?: BonusOverride; // limited-time signup bonus on top of standard 50k UEC
  notes?: string;
  source?: string; // canonical announcement URL (optional)
};

/**
 * History — keep newest first. Add new events to the top.
 * Dates from public CIG announcements / RSI Comm-Links.
 */
export const FREE_FLY_HISTORY: FreeFlyEvent[] = [
  {
    id: 'foundation-festival-2026',
    name: 'Foundation Festival 2026',
    start: '2026-07-29T16:00:00Z',
    end: '2026-08-10T23:59:00Z',
    ships: [
      'RSI Aurora Mk II',
      'Drake Cutter',
      'Drake Golem',
      'Crusader Intrepid',
      'RSI Salvation',
    ],
    bonusOverride: {
      text: '50,000 UEC free at signup, plus a "Ready for Anything" Career Kit (RSI Venture armor set, MacFlex backpack, Pyro RYT Multi-Tool, Behring P4-AR rifle) if you go on to pledge for any starter pack or ship before August 12',
      badge: '+ "Ready for Anything" Career Kit (with pledge) — through Aug 12',
      expiresAt: '2026-08-12T20:00:00Z',
      image: {
        src: '/images/foundation-festival-2026-career-kit.webp',
        alt: 'New recruit wearing the "Ready for Anything" Career Kit — RSI Venture armor set, MacFlex backpack, and rifle from the Foundation Festival 2026 referral bonus',
      },
    },
    notes: 'Foundation Festival 2026 (Jul 29 – Aug 10). Free Fly with five ships, named in the official Free Fly KB article (support article 360037529633): Aurora Mk II, Cutter, Golem, Intrepid, Salvation. No end-of-day time published — end set to 23:59 UTC Aug 10 pending an official time (comm-link 21211 says only "July 29 through August 10"). Referral promo (comm-link 21225) runs through Aug 12, 20:00 UTC: recruiter earns an Argo ATLS (LTI, non-meltable, one per player); the recruit earns the "Ready for Anything" Career Kit, granted after the promo ends and only if they pledge for a starter pack or ship. Standard 50k UEC signup bonus unaffected (no purchase). Twitch Drops run Jul 29 – Aug 12 (comm-link 21237).',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/21211-Foundation-Festival-2026',
  },
  {
    id: 'defensecon-2026',
    name: 'DefenseCon 2956',
    start: '2026-05-14T17:00:00Z',
    end: '2026-05-27T17:00:00Z',
    ships: [
      '100+ ships via 48-hour rentals — full manufacturer lineup',
      'Drake Ironclad Assault (Flight Ready debut)',
    ],
    bonusOverride: {
      text: '50,000 UEC + a Drake Dragonfly with Coalfire paint — use a referral code at signup before May 27',
      badge: '+ Drake Dragonfly (Coalfire) — through May 27',
      expiresAt: '2026-05-28T00:00:00Z',
      image: { src: '/images/defensecon-2956.webp', alt: 'DefenseCon 2956 referral signup bonus' },
    },
    notes: 'Drake-hosted DefenseCon 2956 (May 14-27). Free Fly initially cancelled ~May 14 due to server performance issues — first cancellation in SC history — then reinstated May 18 and active through May 27. Drake Ironclad Assault made its Flight Ready debut. Referral bonus: Drake Dragonfly with Coalfire paint. Schedule comm-link: 21129; farewell: 21166.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/21147-DefenseCon-2956-About',
  },
  {
    id: 'iae-2025',
    name: 'Intergalactic Aerospace Expo 2955',
    start: '2025-11-20T16:00:00Z',
    end: '2025-12-03T17:00:00Z',
    ships: [
      'Crusader Intrepid (event loaner)',
      'Daily manufacturer rotation — RSI Perseus debut Day 1',
      '100+ rotating ships',
    ],
    notes: 'IAE 2955 (Nov 2025). Largest ship showcase of the year. RSI Perseus made its flyable debut on Day 1.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/20861-Intergalactic-Aerospace-Expo-2955-Free-Fly-And-Manufacturer-Schedule',
  },
  {
    id: 'invictus-2025',
    name: 'Invictus Launch Week 2955',
    start: '2025-05-15T16:00:00Z',
    end: '2025-05-27T20:00:00Z',
    ships: ['Aegis Avenger Titan (event loaner)', '2-day manufacturer rotation'],
    bonusOverride: {
      text: '50,000 UEC + a Kruger P-52 Merlin snub fighter — use a referral code at signup during Invictus 2955',
      badge: '+ Kruger P-52 Merlin (through May 27)',
      expiresAt: '2025-05-27T20:00:00Z',
    },
    notes: 'Invictus Launch Week 2955 (May 2025). Referral bonus: Kruger P-52 Merlin. Schedule comm-link: 20542.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/20491-About-Invictus-Launch-Week-2955',
  },
  {
    id: 'iae-2024',
    name: 'Intergalactic Aerospace Expo 2954',
    start: '2024-11-22T16:00:00Z',
    end: '2024-12-05T17:00:00Z',
    ships: [
      '100+ rotating ships — daily 48-hour manufacturer halls',
      'Finale days (Dec 2-5): all event ships rentable at Tobin Expo Center',
    ],
    notes: 'IAE 2954 (Nov 2024). Ran Nov 22 (16:00 UTC) through Dec 5 with a 4-day all-ships finale.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/20281-Intergalactic-Aerospace-Expo-2954-Free-Fly',
  },
  {
    id: 'invictus-2024',
    name: 'Invictus Launch Week 2954',
    start: '2024-05-17T16:00:00Z',
    end: '2024-05-29T23:00:00Z',
    ships: ['Military ship showcase — 2-day manufacturer rotation at the Bevic Convention Center'],
    notes: 'Invictus Launch Week 2954 (May 2024). Free play May 17 (16:00 UTC) - May 29 (23:00 UTC). Schedule comm-link: 19914.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/19878-About-Invictus-Launch-Week-2954',
  },
  {
    id: 'iae-2023',
    name: 'Intergalactic Aerospace Expo 2953',
    start: '2023-11-17T16:00:00Z',
    end: '2023-11-30T17:00:00Z',
    ships: ['100+ rotating ships — daily 48-hour manufacturer halls'],
    notes: 'IAE 2953 (Nov 2023). Ran Nov 17 (16:00 UTC) through Nov 30.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/19596-Intergalactic-Aerospace-Expo-2953-Free-Fly',
  },
  {
    id: 'invictus-2023',
    name: 'Invictus Launch Week 2953',
    start: '2023-05-19T16:00:00Z',
    end: '2023-05-30T20:00:00Z',
    ships: ['Military ship showcase — 2-day manufacturer rotation at the Bevic Convention Center'],
    notes: 'Invictus Launch Week 2953 (May 2023). Free play May 19 (16:00 UTC) - May 30 (20:00 UTC). Schedule comm-link: 19294.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/19230-About-Invictus-Launch-Week-2953',
  },
  {
    id: 'iae-2022',
    name: 'Intergalactic Aerospace Expo 2952',
    start: '2022-11-18T16:00:00Z',
    end: '2022-11-30T17:00:00Z',
    ships: ['100+ rotating ships — daily 48-hour manufacturer halls'],
    notes: 'IAE 2952 (Nov 2022). Ran Nov 18 (16:00 UTC) through Nov 30.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/18975-Intergalactic-Aerospace-Expo-2952-Free-Fly',
  },
];

export type EventStatus =
  | { state: 'ACTIVE'; event: FreeFlyEvent; endsAt: Date }
  | { state: 'CANCELLED_FREE_FLY'; event: FreeFlyEvent; endsAt: Date }
  | { state: 'UPCOMING'; event: FreeFlyEvent; startsAt: Date }
  | { state: 'INACTIVE'; nextLikely?: string };

/**
 * Derive current state from history + the current time.
 * - ACTIVE: now is between start and end of an event where freeFlyActive !== false
 * - CANCELLED_FREE_FLY: date-active event but CIG pulled the free fly access
 * - UPCOMING: nearest future event within 60 days
 * - INACTIVE: otherwise
 */
export function getEventStatus(now: Date = new Date()): EventStatus {
  // Active (or cancelled-free-fly)?
  for (const ev of FREE_FLY_HISTORY) {
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    if (now >= start && now <= end) {
      if (ev.freeFlyActive === false) {
        return { state: 'CANCELLED_FREE_FLY', event: ev, endsAt: end };
      }
      return { state: 'ACTIVE', event: ev, endsAt: end };
    }
  }

  // Upcoming within 60 days?
  const upcoming = FREE_FLY_HISTORY
    .map((ev) => ({ ev, start: new Date(ev.start) }))
    .filter(({ start }) => start.getTime() > now.getTime())
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  if (upcoming.length > 0) {
    const next = upcoming[0];
    const daysAway = (next.start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (daysAway <= 60) {
      return { state: 'UPCOMING', event: next.ev, startsAt: next.start };
    }
  }

  return {
    state: 'INACTIVE',
    nextLikely: 'Next Free Fly TBD — historically Invictus (May) and IAE (November).',
  };
}

/**
 * Returns the active limited-time bonus override if one is live right now.
 * Returns null after the override's expiresAt — callers fall back to "50,000 UEC".
 */
export function getActiveBonusOverride(now: Date = new Date()): BonusOverride | null {
  for (const ev of FREE_FLY_HISTORY) {
    if (!ev.bonusOverride) continue;
    const start = new Date(ev.start);
    const expires = new Date(ev.bonusOverride.expiresAt);
    if (now >= start && now <= expires) return ev.bonusOverride;
  }
  return null;
}

export const REFERRAL_URL =
  'https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC';
export const REFERRAL_CODE = 'STAR-GCQJ-N6NC';
export const HUB_URL = 'https://dayonecitizen.com';
