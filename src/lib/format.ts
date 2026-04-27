/**
 * Date and duration formatting helpers.
 *
 * All event dates are stored in UTC. We display in the visitor's local
 * timezone for ACTIVE/UPCOMING countdowns, but format the history table
 * in UTC so it doesn't shift between visitors.
 */

export function formatRangeUTC(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  const monthShort = (d: Date) =>
    d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = (d: Date) => d.getUTCDate();
  const year = end.getUTCFullYear();

  if (sameMonth) {
    return `${monthShort(start)} ${day(start)}–${day(end)}, ${year}`;
  }
  return `${monthShort(start)} ${day(start)} – ${monthShort(end)} ${day(end)}, ${year}`;
}

export function formatDateLong(d: Date): string {
  return d.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function durationLabel(ms: number): string {
  if (ms <= 0) return '0d 0h 0m 0s';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
