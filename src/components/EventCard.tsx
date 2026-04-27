import { type FreeFlyEvent } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

type Props = {
  event: FreeFlyEvent;
  status: 'ACTIVE' | 'UPCOMING' | 'PAST';
  highlight?: boolean;
};

export function EventCard({ event, status, highlight = false }: Props) {
  const statusBadge = {
    ACTIVE: { text: 'ACTIVE NOW', cls: 'bg-orange text-spaceBlack' },
    UPCOMING: { text: 'UPCOMING', cls: 'bg-orange/15 text-orange border border-orange/40' },
    PAST: { text: 'PAST', cls: 'bg-white/5 text-muted border border-white/10' },
  }[status];

  return (
    <article
      className={`card flex flex-col gap-4 ${
        highlight ? 'border-orange/50 shadow-orange' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${statusBadge.cls}`}
        >
          {statusBadge.text}
        </span>
        <span className="text-xs text-muted">{formatRangeUTC(event.start, event.end)}</span>
      </div>

      <h3 className="font-display text-xl font-bold text-white">{event.name}</h3>

      {event.ships.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            What&apos;s Included
          </h4>
          <ul className="space-y-1 text-sm text-white/85">
            {event.ships.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-orange" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.notes && (
        <p className="border-t border-white/5 pt-3 text-sm text-muted">{event.notes}</p>
      )}

      <div className="mt-auto flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 ${
            status !== 'PAST'
              ? 'border border-orange/40 bg-orange/10 text-orange'
              : 'border border-white/10 bg-white/5 text-muted'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          50,000 UEC referral bonus {status !== 'PAST' ? 'available' : 'was available'}
        </span>
      </div>
    </article>
  );
}
