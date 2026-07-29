import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { LightboxImage } from '@/components/LightboxImage';
import { FREE_FLY_HISTORY, getEventStatus, HUB_URL } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

export const metadata: Metadata = {
  title: 'When Is the Next Star Citizen Free Fly? (July 2026)',
  description:
    'A Free Fly is live right now: Foundation Festival 2026 runs July 29 – August 10 with five ships free to fly. Dates, sources, and what comes after.',
  alternates: { canonical: '/next-free-fly' },
  keywords: [
    'next star citizen free fly',
    'when is the next star citizen free fly',
    'star citizen free fly dates',
    'star citizen next free fly 2026',
    'star citizen free fly schedule',
    'upcoming star citizen free fly',
    'star citizen iae 2956 free fly',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'When Is the Next Star Citizen Free Fly?',
    description:
      'One is live now: Foundation Festival 2026, July 29 – August 10. After that, the most likely window is IAE in late November.',
  },
};

// Official RSI Comm-Link sources for every historical claim on this page.
const SOURCES = {
  citizenConDirect2955:
    'https://robertsspaceindustries.com/comm-link/SCW/19355-API',
  iae2955:
    'https://robertsspaceindustries.com/en/comm-link/transmission/20861-Intergalactic-Aerospace-Expo-2955-Free-Fly-And-Manufacturer-Schedule',
  defenseConAbout:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21147-DefenseCon-2956-About',
  defenseConSchedule:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21129-DefenseCon-2956-Schedule',
  defenseConCountdown:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21134-Countdown-To-DefenseCon',
} as const;

const faqs = [
  {
    q: 'When is the next Star Citizen Free Fly in 2026?',
    a: 'One is live right now: the Foundation Festival 2026 Free Fly runs July 29 – August 10, 2026, with five ships free to fly and no purchase required (official Comm-Link 21211). After it ends, the most dependable window is the Intergalactic Aerospace Expo (IAE) in late November, which has run a November Free Fly every year since at least 2951 (2021). Check the live banner at the top of this page — it updates the moment CIG posts an official Comm-Link.',
  },
  {
    q: 'How often does Star Citizen do Free Fly events?',
    a: 'Typically a few times a year. The most dependable is the Intergalactic Aerospace Expo (IAE) each November. There is usually also a free-to-play flagship event in May — Invictus Launch Week in past years, replaced by DefenseCon in 2026 — plus occasional extras around patches or conventions.',
  },
  {
    q: 'Is there a Free Fly happening right now?',
    a: 'Yes — the Foundation Festival 2026 Free Fly is live from July 29 through August 10, 2026. The status banner at the top of every page on this site shows the live countdown; it updates automatically from the official event calendar.',
  },
  {
    q: 'How long does a Free Fly last?',
    a: 'Usually one to two weeks. The two most recent free-to-play events both ran about 14 days: IAE 2955 (November 20 – December 3, 2025) and DefenseCon 2956 (May 14–27, 2026).',
  },
  {
    q: 'Will CitizenCon 2026 have a Free Fly?',
    a: 'Unknown. CitizenCon 2953 and 2954 were in-person conventions, and CitizenCon Direct 2955 (October 11, 2025) was a free digital-only stream with no Free Fly attached. Whether CitizenCon 2956 happens, what format it takes, and whether a Free Fly accompanies it are all unannounced.',
  },
  {
    q: 'How do I get notified about the next Free Fly?',
    a: 'Bookmark this page and check the banner — it flips the moment an event is announced in an official RSI Comm-Link. You can also follow the new-player guides at dayonecitizen.com. CIG typically announces Free Fly dates one to two weeks before each event begins.',
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
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

export default function NextFreeFlyPage() {
  const status = getEventStatus();
  const recent = FREE_FLY_HISTORY.slice(0, 6);

  // Live headline adapts to the event calendar in src/data/events.ts.
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
    detail = 'CIG has not announced the next event. Based on the yearly pattern, the strongest candidate is the Intergalactic Aerospace Expo (IAE) in late November. The banner above updates the instant a new event is announced.';
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

          {/* GEO answer — static, honest, quotable */}
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            You don&apos;t have to wait — a Free Fly is{' '}
            <strong className="text-white">live right now</strong>. The{' '}
            <strong className="text-white">Foundation Festival 2026</strong> Free Fly
            runs <strong className="text-white">July 29 – August 10, 2026</strong>, with
            five ships free to fly and no purchase required — see our{' '}
            <Link href="/foundation-festival-2026" className="text-orange underline-offset-2 hover:underline">
              Foundation Festival 2026 breakdown
            </Link>{' '}
            for every confirmed detail. After it ends, the most dependable yearly window
            is the{' '}
            <strong className="text-white">
              Intergalactic Aerospace Expo (IAE) in late November
            </strong>
            , which has run a Free Fly every year since 2021.
          </p>

          {/* Live status — updates automatically from the event calendar */}
          <div className="mt-8 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Live status</p>
            <h2 className="heading-display mt-2 text-xl text-white">{headline}</h2>
            <p className="mt-3 text-white/85">{detail}</p>
          </div>

          {/* Live-event callout — Foundation Festival 2026 Free Fly confirmed
              (Comm-Link 21211). Remove this box after the event ends Aug 10
              and the page reverts to pattern-watch framing. */}
          <div className="mt-6 rounded-2xl border border-orange/40 bg-blackMid/60 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-orange">
              Live now — confirmed Free Fly
            </p>
            <h2 className="heading-display mt-2 text-xl text-white">
              Foundation Festival 2026 — play free July 29 through August 10
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              CIG confirmed it in Comm-Link 21211: everyone can play free with five
              ships through August 10. The referral bonus — an Argo ATLS for the
              recruiter, a &ldquo;Ready for Anything&rdquo; Career Kit for the new
              player, both requiring the new player to pledge for a starter pack or
              ship — runs until August 12, 20:00 UTC. See the{' '}
              <Link href="/foundation-festival-2026" className="text-orange underline-offset-2 hover:underline">
                full Foundation Festival 2026 page
              </Link>{' '}
              for every confirmed detail, including what&apos;s still unpublished
              (ship names, exact end time).
            </p>
            <p className="mt-3 text-xs text-muted">
              The banner above counts down to the end of the event.
            </p>
          </div>

          {/* Expected windows — pattern, not announcement */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The two windows to watch in 2026
            </h2>
            <p className="mt-4 text-muted">
              Neither of these is an announcement — CIG has confirmed nothing for
              the rest of 2026. They are expectations based on how the event
              calendar has repeated in past years, with the historical instances
              sourced from official RSI Comm-Links.
            </p>

            <div className="mt-6 space-y-5">
              {/* IAE — strong pattern */}
              <div className="rounded-xl border border-orange/30 bg-blackMid/60 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="heading-display text-lg text-white">
                    Intergalactic Aerospace Expo (IAE) — late November
                  </h3>
                  <span className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange">
                    Strong yearly pattern
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  IAE has run a November Free Fly every year since at least 2951
                  (2021), making it the most dependable free-to-play window on the
                  calendar.{' '}
                  <SourceLink href={SOURCES.iae2955}>IAE 2955</SourceLink> ran
                  November 20 – December 3, 2025, was free for anyone with an RSI
                  account, and included a Crusader Intrepid loaner plus a daily
                  rotation of flyable ships from every manufacturer. IAE 2956 is
                  unannounced, but if the pattern holds, expect it in late
                  November 2026.
                </p>
                <p className="mt-3 text-xs text-muted">
                  Pattern-based expectation — not an announcement.
                </p>
              </div>

              {/* CitizenCon — uncertain */}
              <div className="rounded-xl border border-white/10 bg-blackMid/60 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="heading-display text-lg text-white">
                    CitizenCon — October
                  </h3>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    Uncertain
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Treat this one with caution. CitizenCon 2953 (2023) and 2954
                  (2024) were in-person conventions, but{' '}
                  <SourceLink href={SOURCES.citizenConDirect2955}>
                    CitizenCon Direct 2955
                  </SourceLink>{' '}
                  (October 11, 2025) was a free digital-only stream with no Free
                  Fly component at all. Whether CitizenCon 2956 happens, what
                  format it takes, and whether any Free Fly accompanies it are
                  all unannounced.
                </p>
                <p className="mt-3 text-xs text-muted">
                  Pattern-based expectation — not an announcement.
                </p>
              </div>
            </div>
          </section>

          {/* How you'll know it's official */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              How you&apos;ll know it&apos;s official
            </h2>
            <p className="mt-4 text-muted">
              CIG announces every Free Fly through an official Comm-Link on{' '}
              <SourceLink href="https://robertsspaceindustries.com/comm-link">
                robertsspaceindustries.com
              </SourceLink>
              , usually one to two weeks before the event starts. Until a
              Comm-Link exists, any date you see anywhere is a guess. When the
              announcement drops, this page updates and the status banner at the
              top flips to a live countdown.
            </p>
          </section>

          {/* What happened in May 2026 */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What happened in May 2026
            </h2>
            <p className="mt-4 text-muted">
              The most recent free-to-play event was{' '}
              <SourceLink href={SOURCES.defenseConAbout}>DefenseCon 2956</SourceLink>{' '}
              (May 14–27, 2026), which was free to play and offered 48-hour ship
              rentals across the{' '}
              <SourceLink href={SOURCES.defenseConSchedule}>
                full manufacturer lineup
              </SourceLink>
              . In the game&apos;s fiction, Invictus Launch Week was{' '}
              <SourceLink href={SOURCES.defenseConCountdown}>
                &ldquo;pulled back to Sol&rdquo;
              </SourceLink>{' '}
              and DefenseCon replaced it as the May flagship. Every past event is
              logged on our{' '}
              <Link href="/event-history" className="text-orange underline-offset-2 hover:underline">
                event history page
              </Link>
              .
            </p>
          </section>

          {/* Recent history as evidence of the pattern */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Recent Free Fly events
            </h2>
            <p className="mt-4 text-muted">
              The cadence is visible in the record — a May flagship and a
              November IAE, year after year:
            </p>
            <LightboxImage
              src="/images/free-fly-community-fleet.webp"
              alt="Players line their ships up for a community fleet photo during Invictus Launch Week 2953"
              width={1400}
              height={600}
              containerClassName="mt-6 rounded-xl border border-white/10"
              className="h-auto w-full rounded-xl"
            />

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
              <CTAButton size="lg" trackingLabel="next-free-fly-cta" />
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
              <Link href="/foundation-festival-2026" className="btn-secondary">
                Foundation Festival 2026 breakdown →
              </Link>
              <Link href="/free-fly-schedule" className="btn-secondary">
                2026 Free Fly schedule →
              </Link>
              <Link href="/iae-2956" className="btn-secondary">
                IAE 2956 — what we know →
              </Link>
              <Link href="/is-star-citizen-free" className="btn-secondary">
                Is Star Citizen free? →
              </Link>
              <Link href="/event-guide" className="btn-secondary">
                Your first Free Fly guide →
              </Link>
              <Link href="/glossary" className="btn-secondary">
                Free Fly glossary →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/next-free-fly" />

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
