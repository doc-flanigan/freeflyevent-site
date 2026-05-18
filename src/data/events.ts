/**
 * Free Fly events data.
 *
 * Update this file when CIG announces a new event. The site automatically
 * derives banner state (ACTIVE / UPCOMING / INACTIVE) from `start` and `end`
 * compared to the current time.
 *
 * Dates are ISO 8601 in UTC. CIG typically runs Free Flys ~10 days.
 */

export type FreeFlyEvent = {
  id: string;
  name: string;
  start: string; // ISO UTC
  end: string; // ISO UTC
  ships: string[]; // ships unlocked during the event (empty if free fly was cancelled)
  freeFlyActive?: boolean; // false = event window exists but CIG cancelled free access
  cancelledNote?: string; // shown in banner when freeFlyActive is false
  notes?: string;
  source?: string; // canonical announcement URL (optional)
};

/**
 * History — keep newest first. Add new events to the top.
 * Dates from public CIG announcements / RSI Comm-Links.
 */
export const FREE_FLY_HISTORY: FreeFlyEvent[] = [
  {
    id: 'defensecon-2026',
    name: 'DefenseCon 2956',
    start: '2026-05-14T17:00:00Z',
    end: '2026-05-27T17:00:00Z',
    ships: ['Anvil Ironclad (Flight Ready debut)', 'Rotating Anvil & military fleet'],
    notes: 'DefenseCon 2956. Free Fly reinstated May 18 2026 and active through May 27. Initially cancelled ~May 14 due to server performance issues — first cancellation in SC history — then restored. Anvil Ironclad made its Flight Ready debut.',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/21134-Countdown-To-DefenseCon',
  },
  {
    id: 'iae-2025',
    name: 'Intergalactic Aerospace Expo 2025',
    start: '2025-11-21T17:00:00Z',
    end: '2025-12-02T17:00:00Z',
    ships: ['100+ rotating ships', 'Daily manufacturer showcase'],
    notes: 'IAE 2954. Largest ship showcase of the year.',
  },
  {
    id: 'invictus-2025',
    name: 'Invictus Launch Week 2025',
    start: '2025-05-23T17:00:00Z',
    end: '2025-06-03T17:00:00Z',
    ships: ['Aegis Hammerhead', 'Drake Cutlass Black', 'RSI Aurora MR'],
  },
  {
    id: 'iae-2024',
    name: 'Intergalactic Aerospace Expo 2024',
    start: '2024-11-22T17:00:00Z',
    end: '2024-12-03T17:00:00Z',
    ships: ['100+ rotating ships across 11 manufacturers'],
  },
  {
    id: 'invictus-2024',
    name: 'Invictus Launch Week 2024',
    start: '2024-05-17T17:00:00Z',
    end: '2024-05-28T17:00:00Z',
    ships: ['F7C Hornet', 'Cutlass Black', 'Aurora MR'],
  },
  {
    id: 'iae-2023',
    name: 'Intergalactic Aerospace Expo 2023',
    start: '2023-11-17T17:00:00Z',
    end: '2023-12-01T17:00:00Z',
    ships: ['100+ rotating ships', 'IAE 2953 showcase'],
  },
  {
    id: 'invictus-2023',
    name: 'Invictus Launch Week 2023',
    start: '2023-05-19T17:00:00Z',
    end: '2023-05-30T17:00:00Z',
    ships: ['Anvil Carrack', 'Cutlass Black', 'Aurora MR'],
  },
  {
    id: 'iae-2022',
    name: 'Intergalactic Aerospace Expo 2022',
    start: '2022-11-18T17:00:00Z',
    end: '2022-12-01T17:00:00Z',
    ships: ['100+ rotating ships'],
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

export const REFERRAL_URL =
  'https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC';
export const REFERRAL_CODE = 'STAR-GCQJ-N6NC';
export const HUB_URL = 'https://dayonecitizen.com';
