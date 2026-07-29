import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { FREE_FLY_HISTORY, HUB_URL } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

export const metadata: Metadata = {
  title: 'IAE 2956 — Star Citizen Free Fly Expected November 2026',
  description:
    'The Intergalactic Aerospace Expo 2956 has not been announced yet. Expected late November 2026 based on five straight years of November Free Flys — the sourced breakdown.',
  alternates: { canonical: '/iae-2956' },
  keywords: [
    'iae 2956',
    'star citizen iae 2026',
    'iae 2956 free fly',
    'iae 2956 dates',
    'intergalactic aerospace expo 2956',
    'star citizen november free fly',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'IAE 2956 — Star Citizen Free Fly Expected November 2026',
    description:
      'IAE 2956 is unannounced. Here is what five years of November Free Flys say to expect — and how to be ready.',
  },
};

const LAST_CHECKED = 'July 29, 2026';

const faqs = [
  {
    q: 'When is IAE 2956?',
    a: 'Not announced. Cloud Imperium Games has not published dates for the Intergalactic Aerospace Expo 2956. Based on the pattern — IAE has run every year since at least 2951 (2021), always starting mid-to-late November — the expected window is late November 2026. Treat any specific dates you see elsewhere as guesses until an official RSI Comm-Link exists.',
  },
  {
    q: 'Will IAE 2956 have a Free Fly?',
    a: 'Every IAE since at least 2951 (2021) has included a Free Fly, making it the most dependable free-to-play window of the year. That is a five-year pattern, not a 2026 announcement — this page updates the moment CIG confirms.',
  },
  {
    q: 'What ships will be free during IAE 2956?',
    a: 'Unknown until CIG publishes the schedule. Historically IAE rotates 100+ ships through daily manufacturer showcases — IAE 2955 (November 2025) included a Crusader Intrepid event loaner plus a daily manufacturer rotation, with the RSI Perseus making its flyable debut on Day 1.',
  },
  {
    q: 'How long does IAE usually last?',
    a: 'About two weeks. IAE 2955 ran November 20 – December 3, 2025; IAE 2954 ran November 22 – December 5, 2024, ending with a multi-day finale where all event ships were flyable at once.',
  },
];

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="text-orange underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

export default function Iae2956Page() {
  const iaeHistory = FREE_FLY_HISTORY.filter((ev) => ev.id.startsWith('iae-'));

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          <span className="eyebrow">IAE 2956</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            IAE 2956: The Next Big Star Citizen Free Fly (Expected November)
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Last checked {LAST_CHECKED} &middot; status: not announced
          </p>

          {/* GEO answer — static, honest, quotable */}
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            The Intergalactic Aerospace Expo 2956 has{' '}
            <strong className="text-white">not been announced</strong>. Based on
            the yearly pattern — an IAE Free Fly every November since at least
            2951 (2021) — the expected window is{' '}
            <strong className="text-white">late November 2026</strong>.
            Historically it is the biggest free-to-play event of the year:
            roughly two weeks, 100+ ships rotating through daily manufacturer
            showcases, free for anyone with an RSI account.
          </p>

          {/* Not announced box */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What&apos;s confirmed so far
            </h2>
            <div className="mt-6 rounded-2xl border border-dashed border-orange/40 bg-blackMid/60 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-orange">
                Nothing yet — pattern only
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                CIG has published no Comm-Link, dates, or schedule for IAE 2956.
                Everything on this page is the five-year historical pattern,
                sourced from the official Comm-Links of past IAEs below. When the
                announcement lands — typically one to two weeks before the event —
                this page flips to confirmed dates and the countdown banner takes
                over.
              </p>
              {/*
                FLIP POINT: when CIG posts the IAE 2956 Comm-Link, add the event
                to FREE_FLY_HISTORY in src/data/events.ts (banner/countdown/JSON-LD
                derive automatically), replace this dashed box with a confirmed
                live-status box (pattern: /foundation-festival-2026), and update
                the GEO answer paragraph + FAQ #1 above.
              */}
              <p className="mt-3 text-xs text-muted">
                Last checked {LAST_CHECKED}. Watching official RSI Comm-Links only.
              </p>
            </div>
          </section>

          {/* The pattern, from the record */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Five years of November Free Flys
            </h2>
            <p className="mt-4 text-muted">
              Every row below is sourced from an official RSI Comm-Link:
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
                  {iaeHistory.map((ev) => (
                    <tr key={ev.id} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 font-semibold text-white">
                        {ev.source ? (
                          <SourceLink href={ev.source}>{ev.name}</SourceLink>
                        ) : (
                          ev.name
                        )}
                      </td>
                      <td className="px-4 py-3 text-orange">{formatRangeUTC(ev.start, ev.end)}</td>
                      <td className="px-4 py-3 text-muted">{ev.ships[0] ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted">
              IAE 2951 (2021) and 2952 (2022) also ran November Free Flys — the
              table shows the events tracked in our{' '}
              <Link href="/event-history" className="text-orange underline-offset-2 hover:underline">
                full event history
              </Link>
              .
            </p>
          </section>

          {/* What to expect */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What IAE 2956 will probably look like
            </h2>
            <p className="mt-4 text-muted">
              If the pattern holds: roughly two weeks starting mid-to-late
              November, a convention-hall showcase with a different ship
              manufacturer featured each day, that manufacturer&apos;s ships free
              to fly for 48 hours, and a finale stretch where everything flies at
              once. Recent IAEs have also debuted brand-new flyable ships on Day 1
              — the RSI Perseus in 2025. It is the single best window of the year
              to try Star Citizen for free.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Don&apos;t wait for November</h2>
            <p className="mt-4 text-white/80">
              {`A Free Fly is often live sooner than you think — check the banner at
              the top of this page. Either way, create your free RSI account with a
              referral code now (it can't be added later) and the 50,000 UEC bonus
              will be waiting whenever you first log in.`}
            </p>
            <div className="mt-6">
              <CTAButton size="lg" trackingLabel="iae-2956-cta" />
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
              <Link href="/free-fly-schedule" className="btn-secondary">
                2026 Free Fly schedule →
              </Link>
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
              <Link href="/free-ships-right-now" className="btn-secondary">
                What ships are free right now? →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/iae-2956" />
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
              { '@type': 'ListItem', position: 2, name: 'IAE 2956', item: 'https://freeflyevent.com/iae-2956' },
            ],
          }),
        }}
      />
    </>
  );
}
