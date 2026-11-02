'use client';

import { useEffect, useState } from 'react';

const dayOpts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };

function format(start: Date, end: Date, timeZone?: string): string {
  const day = start.toLocaleDateString('en-US', { ...dayOpts, timeZone });
  const from = start.toLocaleTimeString('en-US', { ...timeOpts, timeZone });
  const to = end.toLocaleTimeString('en-US', { ...timeOpts, timeZone, timeZoneName: 'short' });
  return `${day} · ${from}–${to}`;
}

/**
 * A start–end time shown in the visitor's own time zone. The server render
 * (and crawlers, and no-JS visitors) get UTC; the browser swaps in local time
 * after hydration, so there's no hydration mismatch.
 */
export function LocalTimeRange({ startsAt, durationMinutes }: { startsAt: string; durationMinutes: number }) {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const [text, setText] = useState(() => format(start, end, 'UTC'));
  const [local, setLocal] = useState(false);

  useEffect(() => {
    setText(format(start, end));
    setLocal(true);
    // startsAt/durationMinutes are the real inputs; Date objects change identity every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startsAt, durationMinutes]);

  return (
    <time dateTime={start.toISOString()}>
      {text}
      {local ? ' (your time)' : ''}
    </time>
  );
}
