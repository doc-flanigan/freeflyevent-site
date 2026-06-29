import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { FREE_FLY_HISTORY, getEventStatus, HUB_URL } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

export const metadata: Metadata = {
  title: 'When Is the Next Star Citizen Free Fly? (2026 Schedule)',
  description:
    'When is the next Star Citizen Free Fly? Live event status plus the predictable yearly pattern — Invictus in May and IAE in November — so you know when you can play free next.',
  alternates: { canonical: '/next-free-fly' },
  keywords: [
    'next star citizen free fly',
    'when is the next star citizen free fly',
    'star citizen free fly dates',
    'star citizen next free fly 2026',
    'star citizen free fly schedule',
    'upcoming star citizen free fly',
  ],
  openGraph: {
    title: 'When Is the Next Star Citizen Free Fly?',
    description:
      'Live Free Fly status plus the predictable yearly pattern — Invictus (May) and IAE (November).',
  },
};

const faqs = [
  {
    q: 'How often does Star Citizen do Free Fly events?',
    a: 'Several times a year. The two you can count on are Invictus Launch Week (mid-to-late May) and the Intergalactic Aerospace Expo, or IAE (late November). Cloud Imperium also runs occasional extra Free Flys tied to patches or conventions.',
  },
  {
    q: 'When is the next Star Citizen Free Fly in 2026?',
    a: 'The next reliably-scheduled Free Fly is the Intergalactic Aerospace Expo (IAE) in late November 2026 — historically the biggest event of the year, with 100+ ships free to fly. Check the live banner at the top of this page for any earlier surprise events.',
  },
  {
    q: 'Is there a Free Fly happening right now?',
    a: 'The status banner at the top of every page on this site shows whether a Free Fly is currently active, upcoming, or not yet scheduled — it updates automatically from the official event calendar.',
  },
  {
    q: 'How long does a Free Fly last?',
    a: 'Most Free Fly events run about 10 days. That gives you a full week-and-a-half to download, install, and try the game before access closes.',
  },
  {
    q: 'How do I get notified about the next Free Fly?',
    a: 'Bookmark this page and check the banner, or follow the new-player guides at dayonecitizen.com. Free Fly dates are announced by Cloud Imperium roughly one to two weeks before each event begins.',
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function NextFreeFlyPage() {
  const status = getEventStatus();
  const recent = FREE_FLY_HISTORY.slice(0, 6);

  // Headline answer adapts to live status.
  let headline: string;
  let detail: string;
  if (status.state === 'ACTIVE') {
    headline = `A Free Fly is live right now: ${status.event.name}`;
    detail = `It runs ${formatRangeUTC(status.event.start, status.event.end)}. Make a free account and play the full game at no cost before it ends.`;
  } else if (status.state === 'UPCOMING') {
    const startMonth = MONTH_NAMES[new Date(status.event.start).getUTCMonth()];
    headline = `The next Free Fly is ${status.event.name}`;
    detail = `It begins in ${startMonth} — ${formatRangeUTC(status.event.start, status.event.end)}. The countdown is live in the banner above.`;
  } else {
    headline = 'No Free Fly is scheduled at this moment';
    detail = 'Based on Cloud Imperium’s consistent yearly pattern, the next one is most likely the Intergalactic Aerospace Expo (IAE) in late November. The banner above updates the instant a new event is announced.';
  }

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Free Fly schedule</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            When Is the Next Star Citizen Free Fly?
          </h1>

          {/* TL;DR live answer */}
          <div className="mt-8 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <h2 className="heading-display text-xl text-white">{headline}</h2>
            <p className="mt-3 text-white/85">{detail}</p>
            <p className="mt-3 text-sm text-muted">
              The two Free Flys you can plan around every year:{' '}
              <strong className="text-white">Invictus Launch Week (May)</strong> and{' '}
              <strong className="text-white">the Intergalactic Aerospace Expo / IAE (November)</strong>.
            </p>
          </div>

          {/* The predictable calendar */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The predictable Free Fly calendar
            </h2>
            <p className="mt-4 text-muted">
              Star Citizen Free Flys aren&apos;t random. Two anchor events repeat every year,
              and CIG sprinkles in the occasional extra. If you&apos;re planning when to try
              the game, aim for these windows:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ['Invictus Launch Week — May', 'A military-themed showcase. Runs roughly mid-to-late May for about 10 days. Reliable every year.'],
                ['Intergalactic Aerospace Expo (IAE) — November', 'The biggest event of the year. 100+ ships become free to fly on a rotating daily schedule, late November into early December. The best Free Fly to wait for if you want maximum variety.'],
                ['Occasional surprise Free Flys', 'CIG sometimes opens free access around major patches or conventions (like DefenseCon). These are announced with little notice — the banner above will catch them.'],
              ].map(([title, desc]) => (
                <li key={title as string} className="flex gap-4 rounded-xl border border-white/10 bg-blackMid/60 p-5">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" aria-hidden />
                  <div>
                    <strong className="text-white">{title}</strong>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Recent history as evidence of the pattern */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Recent Free Fly events
            </h2>
            <p className="mt-4 text-muted">
              The pattern is clear from the last few years — note the recurring May and
              November cadence:
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Dates</th>
                    <th className="px-4 py-3">Highlight</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((ev) => (
                    <tr key={ev.id} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 font-semibold text-white">{ev.name}</td>
                      <td className="px-4 py-3 text-orange">{formatRangeUTC(ev.start, ev.end)}</td>
                      <td className="px-4 py-3 text-muted">{ev.ships[0] ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted">
              See the{' '}
              <Link href="/event-history" className="text-orange underline-offset-2 hover:underline">
                full event history
              </Link>{' '}
              for every Free Fly on record.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Be ready before the next one</h2>
            <p className="mt-4 text-white/80">
              You don&apos;t have to wait for a Free Fly to create your account. Make it
              free now, claim your 50,000 UEC referral bonus, and you&apos;ll be ready to
              jump in the moment the next event goes live.
            </p>
            <div className="mt-6">
              <CTAButton size="lg" />
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/10 bg-blackMid/60 p-5">
                  <h3 className="font-semibold text-white">{q}</h3>
                  <p className="mt-2 text-sm text-muted">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-links */}
          <section className="mt-14 text-center">
            <p className="text-muted">Related</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/is-star-citizen-free" className="btn-secondary">
                Is Star Citizen free? →
              </Link>
              <Link href="/event-guide" className="btn-secondary">
                Your first Free Fly guide →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Free Fly Events', item: 'https://freeflyevent.com' },
              { '@type': 'ListItem', position: 2, name: 'Next Free Fly', item: 'https://freeflyevent.com/next-free-fly' },
            ],
          }),
        }}
      />
    </>
  );
}
