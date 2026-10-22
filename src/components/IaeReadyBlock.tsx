import Link from 'next/link';
import { CTAButton, ArrowIcon } from './CTAButton';
import { FREE_FLY_HISTORY, getEventStatus, getIae2956 } from '@/data/events';
import { formatRangeSpacedUTC } from '@/lib/format';
import { ctaLabel } from '@/lib/cta-label';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Nov 17 – Dec 5": earliest start to latest end (month/day, UTC) across past IAE entries. */
function pastIaeRange(): string | null {
  const iae = FREE_FLY_HISTORY.filter(
    (ev) => /iae/i.test(ev.id) || /iae/i.test(ev.name),
  );
  if (iae.length === 0) return null;
  const key = (d: Date) => d.getUTCMonth() * 100 + d.getUTCDate();
  const fmt = (k: number) => `${MONTHS[Math.floor(k / 100)]} ${k % 100}`;
  const start = Math.min(...iae.map((ev) => key(new Date(ev.start))));
  const end = Math.max(...iae.map((ev) => key(new Date(ev.end))));
  return `${fmt(start)} – ${fmt(end)}`;
}

const READY_STEPS = [
  'Create your free RSI account now with our code. Use a referral code at signup so 50,000 UEC lands in your account when you log in. The code cannot be added after about 24 hours.',
  'Start the launcher download early. The game client is about a 100 GB download; plan on 150 GB free on an SSD.',
  'Run the new-player tutorial. 30–45 minutes well spent.',
];

export function IaeReadyBlock() {
  const iae = getIae2956();
  const range = pastIaeRange();
  const status = getEventStatus();

  return (
    <section id="iae-2956" className="container-narrow py-16 sm:py-20">
      <div className="card-surface p-6 sm:p-10">
        <span className="eyebrow">Biggest Free Fly of the year</span>
        <h2 className="heading-display mt-4 text-2xl sm:text-4xl">
          IAE 2956 — Intergalactic Aerospace Expo
        </h2>

        <p className="mt-4 font-semibold text-gold">
          {iae
            ? formatRangeSpacedUTC(iae.start, iae.end)
            : range
              ? `Official 2026 dates not announced yet. Past IAE Free Flys ran ${range}.`
              : 'Official 2026 dates not announced yet.'}
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <p className="text-white/85">
            Historically it is the biggest free-to-play event of the year: roughly two weeks,
            100+ ships rotating through daily manufacturer showcases, free for anyone with an
            RSI account.
          </p>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
              Get ready now
            </h3>
            <ol className="mt-3 space-y-3">
              {READY_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CTAButton size="lg" trackingLabel="home-iae" className="w-full sm:w-auto md:whitespace-nowrap">
            {ctaLabel('iae', status.state)}
          </CTAButton>
          <Link href="/iae-2956" className="group btn-secondary w-full px-8 py-4 text-base sm:w-auto">
            IAE 2956 Free Fly guide
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
