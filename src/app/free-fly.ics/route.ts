import { FREE_FLY_HISTORY, type FreeFlyEvent } from '@/data/events';

// Subscribable iCalendar feed of confirmed Free Fly windows. Built from
// FREE_FLY_HISTORY, so adding an announced event is the only edit needed —
// subscribers pick it up on their calendar app's next refresh. Pattern-based
// expectations (e.g. "IAE, late November") are never published here; only
// windows CIG has announced in a Comm-Link.
export const revalidate = 3600;

const SITE = 'https://freeflyevent.com';
/** Keep the last year of windows so a new subscriber sees the cadence. */
const LOOKBACK_MS = 365 * 24 * 60 * 60 * 1000;

/** RFC 5545 UTC date-time: 20260729T160000Z (no separators, no milliseconds). */
function icsDate(iso: string | Date): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** Escape TEXT values per RFC 5545 §3.3.11. */
function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Fold content lines longer than 75 octets per RFC 5545 §3.1. */
function fold(line: string): string {
  const bytes = Buffer.from(line, 'utf8');
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    // Don't split a multi-byte UTF-8 character.
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    parts.push(bytes.subarray(start, end).toString('utf8'));
    start = end;
    limit = 74; // continuation lines start with a space
  }
  return parts.join('\r\n ');
}

function vevent(ev: FreeFlyEvent, stamp: string): string[] {
  const ships = ev.ships.length ? ` Featured ships: ${ev.ships.join(', ')}.` : '';
  const description =
    `Star Citizen is free to play during ${ev.name} — no purchase needed. Create a free RSI account, download the launcher, and fly.${ships}` +
    ` Use referral code STAR-GCQJ-N6NC at signup for 50,000 UEC. Guide: ${SITE}/event-guide` +
    (ev.source ? ` Official announcement: ${ev.source}` : '');
  return [
    'BEGIN:VEVENT',
    `UID:${ev.id}@freeflyevent.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(ev.start)}`,
    `DTEND:${icsDate(ev.end)}`,
    `SUMMARY:${esc(`Star Citizen Free Fly — ${ev.name}`)}`,
    `DESCRIPTION:${esc(description)}`,
    `URL:${ev.source ?? `${SITE}/next-free-fly`}`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
  ];
}

export function GET() {
  const now = new Date();
  const stamp = icsDate(now);
  const events = FREE_FLY_HISTORY.filter(
    (ev) => ev.freeFlyActive !== false && new Date(ev.end).getTime() >= now.getTime() - LOOKBACK_MS,
  );

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//freeflyevent.com//Star Citizen Free Fly//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Star Citizen Free Fly',
    `X-WR-CALDESC:${esc('Confirmed Star Citizen Free Fly windows from freeflyevent.com. Only events CIG has announced — no guesses.')}`,
    'REFRESH-INTERVAL;VALUE=DURATION:PT6H',
    'X-PUBLISHED-TTL:PT6H',
    ...events.flatMap((ev) => vevent(ev, stamp)),
    'END:VCALENDAR',
  ];

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="free-fly.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
