'use client';

import { useMemo, useState } from 'react';
import { FREE_FLY_HISTORY, type FreeFlyEvent } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

type SortKey = 'start' | 'name' | 'duration';
type Dir = 'asc' | 'desc';

function durationDays(ev: FreeFlyEvent): number {
  return Math.round(
    (new Date(ev.end).getTime() - new Date(ev.start).getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function EventHistoryTable({ limit }: { limit?: number }) {
  const [sortKey, setSortKey] = useState<SortKey>('start');
  const [dir, setDir] = useState<Dir>('desc');

  const rows = useMemo(() => {
    const sorted = [...FREE_FLY_HISTORY].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'start') {
        cmp = new Date(a.start).getTime() - new Date(b.start).getTime();
      } else if (sortKey === 'name') {
        cmp = a.name.localeCompare(b.name);
      } else if (sortKey === 'duration') {
        cmp = durationDays(a) - durationDays(b);
      }
      return dir === 'asc' ? cmp : -cmp;
    });
    return limit ? sorted.slice(0, limit) : sorted;
  }, [sortKey, dir, limit]);

  function toggle(key: SortKey) {
    if (key === sortKey) setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setDir(key === 'name' ? 'asc' : 'desc');
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-blackMid/60">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
              <Th label="Event" active={sortKey === 'name'} dir={dir} onClick={() => toggle('name')} />
              <Th
                label="Dates (UTC)"
                active={sortKey === 'start'}
                dir={dir}
                onClick={() => toggle('start')}
              />
              <Th
                label="Duration"
                active={sortKey === 'duration'}
                dir={dir}
                onClick={() => toggle('duration')}
              />
              <th scope="col" className="px-4 py-3">
                Highlights
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((ev) => (
              <tr
                key={ev.id}
                className="border-b border-white/5 transition-colors hover:bg-orange/5"
              >
                <td className="px-4 py-3 font-semibold text-white">{ev.name}</td>
                <td className="px-4 py-3 text-muted">{formatRangeUTC(ev.start, ev.end)}</td>
                <td className="px-4 py-3 text-muted">{durationDays(ev)} days</td>
                <td className="px-4 py-3 text-muted">{ev.ships[0] ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: Dir;
  onClick: () => void;
}) {
  return (
    <th scope="col" className="px-4 py-3">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 transition-colors ${
          active ? 'text-orange' : 'hover:text-white'
        }`}
      >
        {label}
        <span aria-hidden className="text-[10px]">
          {active ? (dir === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  );
}
