import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { LightboxImage } from '@/components/LightboxImage';
import { PageBackdrop } from '@/components/PageBackdrop';
import { FREE_FLY_HISTORY, getEventStatus, getIae2956, HUB_URL, type EventStatus } from '@/data/events';
import { formatDateLong, formatMonthDayUTC, formatRangeUTC } from '@/lib/format';

// Re-render hourly so the live status and FAQ flip without a redeploy.
export const revalidate = 3600;

/**
 * The "next window" wording, derived from the event calendar so it follows
 * IAE 2956 through unannounced -> announced -> live -> ended.
 */
function nextWindow(now: Date = new Date()) {
  const status = getEventStatus(now);
  const iae = getIae2956();
  const iaeEnded = !!iae && now > new Date(iae.end);

  if (status.state === 'ACTIVE') {
    const ends = formatMonthDayUTC(status.endsAt);
    return {
      meta: `${status.event.name} Free Fly is live now, through ${ends}. Live status, official sources, and how to be ready.`,
      og: `${status.event.name} Free Fly is live now — ends ${ends}.`,
      sentence: `${status.event.name} is live now, through ${ends}.`,
    };
  }
  if (status.state === 'UPCOMING' || (iae && !iaeEnded && status.state === 'INACTIVE')) {
    const ev = status.state === 'UPCOMING' ? status.event : iae!;
    const range = formatRangeUTC(ev.start, ev.end);
    return {
      meta: `When is the next Star Citizen Free Fly? ${ev.name} is confirmed for ${range}. Live status, official sources, and how to be ready.`,
      og: `${ev.name} Free Fly is confirmed for ${range}.`,
      sentence: `The next realistic window is ${ev.name} (${range}).`,
    };
  }
  if (iae && iaeEnded) {
    const range = formatRangeUTC(iae.start, iae.end);
    return {
      meta: `When is the next Star Citizen Free Fly? IAE 2956 ran ${range}; next window TBD. Live status, official sources, and how to be ready.`,
      og: `IAE 2956 ran ${range} — the next Free Fly window is TBD.`,
      sentence: 'IAE 2956 has ended, so the next realistic window is the May flagship event, which CIG has not announced yet.',
    };
  }
  return {
    meta: 'When is the next Star Citizen Free Fly? Live status, the yearly pattern (IAE in late November), official sources, and how to be ready.',
    og: 'Live Free Fly status plus the yearly pattern — IAE in late November is the most dependable window.',
    sentence: 'The next realistic window is IAE in late November.',
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta, og } = nextWindow();
  return {
    title: 'When Is the Next Star Citizen Free Fly?',
    description: meta,
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
      images: ['/images/og-image.png'],
      title: 'When Is the Next Star Citizen Free Fly?',
      description: og,
    },
  };
}

// Official RSI Comm-Link sources for every historical claim on this page.
const SOURCES = {
  citizenCon2026NotHeld: 'https://www.youtube.com/watch?v=SsOtI2dtvBc',
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

/** After IAE 2956 ends, "IAE in late November" is no longer the next window. */
function iae2956Ended(now: Date = new Date()): boolean {
  const iae = getIae2956();
  return !!iae && now > new Date(iae.end);
}

// FAQs 1 and 3 depend on whether an event is live or announced, so they are
// built from the event calendar and never go stale after an event ends.
function buildFaqs(status: EventStatus, now: Date = new Date()) {
  const lastEnded = FREE_FLY_HISTORY.find((ev) => new Date(ev.end) < now);
  const lastEndedLine = lastEnded
    ? `The most recent Free Fly was ${lastEnded.name} (${formatRangeUTC(lastEnded.start, lastEnded.end)}).`
    : '';

  let nextAnswer: string;
  let nowAnswer: string;
  if (status.state === 'ACTIVE' || status.state === 'CANCELLED_FREE_FLY') {
    const afterIt = status.event.id.startsWith('iae-')
      ? 'After it ends, CIG has not announced the next one — historically the next window is a May flagship event (Invictus Launch Week, or DefenseCon in 2026).'
      : 'After it ends, the most dependable window is the Intergalactic Aerospace Expo (IAE) in late November, which has run a November Free Fly every year since at least 2951 (2021).';
    nextAnswer = `${status.event.name} is running now (${formatRangeUTC(status.event.start, status.event.end)}). ${afterIt}`;
    nowAnswer = `Yes — ${status.event.name} runs ${formatRangeUTC(status.event.start, status.event.end)}. The status banner at the top of every page on this site shows the live countdown.`;
  } else if (status.state === 'UPCOMING') {
    nextAnswer = `The next announced Free Fly is ${status.event.name}, ${formatRangeUTC(status.event.start, status.event.end)}. The countdown is live in the banner at the top of this page.`;
    nowAnswer = `Not yet — ${status.event.name} is announced for ${formatRangeUTC(status.event.start, status.event.end)}. The banner at the top of this page counts down to the start. ${lastEndedLine}`.trim();
  } else if (iae2956Ended(now)) {
    nextAnswer = `CIG has not announced the next one yet. ${lastEndedLine} Historically the next window is a May flagship event — Invictus Launch Week in past years, DefenseCon in 2026. Check the live banner at the top of this page — it updates the moment CIG posts an official Comm-Link.`;
    nowAnswer = `Not at the moment. ${lastEndedLine} The status banner at the top of every page on this site flips to a live countdown as soon as CIG announces the next event.`;
  } else {
    nextAnswer = `CIG has not announced the next one yet. ${lastEndedLine} The most dependable next window is the Intergalactic Aerospace Expo (IAE) in late November, which has run a November Free Fly every year since at least 2951 (2021) — IAE 2955 ran November 20 – December 3, 2025. Check the live banner at the top of this page — it updates the moment CIG posts an official Comm-Link.`;
    nowAnswer = `Not at the moment. ${lastEndedLine} The status banner at the top of every page on this site flips to a live countdown as soon as CIG announces the next event.`;
  }

  return [
    { q: 'When is the next Star Citizen Free Fly in 2026?', a: nextAnswer },
    {
      q: 'How often does Star Citizen do Free Fly events?',
      a: 'Typically a few times a year. The most dependable is the Intergalactic Aerospace Expo (IAE) each November. There is usually also a free-to-play flagship event in May — Invictus Launch Week in past years, replaced by DefenseCon in 2026 — plus a mid-year Foundation Festival and occasional extras around patches.',
    },
    { q: 'Is there a Free Fly happening right now?', a: nowAnswer },
    {
      q: 'How long does a Free Fly last?',
      a: 'Usually one to two weeks. Recent examples: IAE 2955 (November 20 – December 3, 2025), DefenseCon 2956 (May 14–27, 2026), and Foundation Festival 2026 (July 29 – August 10, 2026).',
    },
    {
      q: 'Will CitizenCon 2026 have a Free Fly?',
      a: `No — CIG has said it will not hold a CitizenCon in 2026 in any form (in-person, digital, or Direct), so there is no October Free Fly to wait for. For comparison, CitizenCon Direct 2955 (October 11, 2025) was a free digital-only stream with no Free Fly attached either. ${nextWindow(now).sentence}`,
    },
    {
      q: 'How do I get notified about the next Free Fly?',
      a: 'Bookmark this page and check the banner — it flips the moment an event is announced in an official RSI Comm-Link. You can also subscribe to the free Free Fly calendar feed at freeflyevent.com/free-fly.ics, which adds each confirmed window to Apple Calendar, Outlook, or Google Calendar. CIG typically announces Free Fly dates one to two weeks before each event begins.',
    },
  ];
}

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
  const faqs = buildFaqs(status);
  const lastEnded = FREE_FLY_HISTORY.find((ev) => new Date(ev.end) < new Date());
  const recent = FREE_FLY_HISTORY.slice(0, 6);
  const iae2956 = getIae2956();

  // Live headline adapts to the event calendar in src/data/events.ts.
  let headline: string;
  let detail: string;
  if (status.state === 'CANCELLED_FREE_FLY') {
    headline = `${status.event.name}: the Free Fly was cancelled`;
    detail = `CIG pulled free access for ${status.event.name} (${formatRangeUTC(status.event.start, status.event.end)}). ${status.event.cancelledNote ?? ''} You can still create a free RSI account and claim the 50,000 UEC referral bonus.`.replace(/\s+/g, ' ');
  } else if (status.state === 'ACTIVE') {
    headline = `A Free Fly is live right now: ${status.event.name}`;
    detail = `It runs ${formatRangeUTC(status.event.start, status.event.end)}. Make a free account and play the full game at no cost before it ends.`;
  } else if (status.state === 'UPCOMING') {
    const startMonth = MONTH_NAMES[new Date(status.event.start).getUTCMonth()];
    headline = `The next Free Fly is ${status.event.name}`;
    detail = `It begins in ${startMonth} — ${formatRangeUTC(status.event.start, status.event.end)}. The countdown is live in the banner above.`;
  } else {
    headline = 'No Free Fly is scheduled at this moment';
    detail = iae2956Ended()
      ? 'CIG has not announced the next event. Based on the yearly pattern, the strongest candidate is the May flagship event (Invictus Launch Week in past years, DefenseCon in 2026). The banner above updates the instant a new event is announced.'
      : 'CIG has not announced the next event. Based on the yearly pattern, the strongest candidate is the Intergalactic Aerospace Expo (IAE) in late November. The banner above updates the instant a new event is announced.';
  }

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />
      <PageBackdrop seed={0} />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Free Fly schedule</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            When Is the Next Star Citizen Free Fly?
          </h1>

          {/* GEO answer — quotable. The pattern-watch copy only renders while no
              event is live or announced; otherwise the live status box leads. */}
          {status.state === 'INACTIVE' && (
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            CIG has not announced the next Free Fly yet.
            {lastEnded && (
              <>
                {' '}The most recent one was{' '}
                <strong className="text-white">{lastEnded.name}</strong>, which ended on{' '}
                <strong className="text-white">{formatDateLong(new Date(lastEnded.end))}</strong>.
              </>
            )}
            {iae2956Ended() ? (
              <>
                {' '}Historically the next window is a{' '}
                <strong className="text-white">May flagship event</strong> —
                Invictus Launch Week in past years, DefenseCon in 2026.
              </>
            ) : (
              <>
                The most dependable next window is the{' '}
                <strong className="text-white">
                  Intergalactic Aerospace Expo (IAE) in late November
                </strong>
                , which has run a Free Fly every year since 2021. There is no CitizenCon
                in 2026, so nothing is expected in October.
              </>
            )}
          </p>
          )}

          {/* Live status — updates automatically from the event calendar */}
          <div className="mt-8 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Live status</p>
            <h2 className="heading-display mt-2 text-xl text-white">{headline}</h2>
            <p className="mt-3 text-white/85">{detail}</p>
          </div>

          {/* Expected windows — pattern, not announcement */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What to expect for the rest of 2026
            </h2>
            <p className="mt-4 text-muted">
              {iae2956 && iae2956Ended()
                ? 'IAE 2956 has ended, and CIG has not announced any further Free Fly for 2026.'
                : iae2956
                ? 'IAE 2956 is officially confirmed — details below. Beyond it, CIG has not announced any further Free Fly for 2026.'
                : 'CIG has not announced any further Free Fly for 2026. The IAE expectation below is based on how the event calendar has repeated in past years, with the historical instances sourced from official RSI Comm-Links.'}
            </p>

            <div className="mt-6 space-y-5">
              {/* IAE — strong pattern */}
              <div className="rounded-xl border border-orange/30 bg-blackMid/60 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="heading-display text-lg text-white">
                    {iae2956
                      ? `Intergalactic Aerospace Expo 2956 — ${formatRangeUTC(iae2956.start, iae2956.end)}`
                      : 'Intergalactic Aerospace Expo (IAE) — late November'}
                  </h3>
                  <span className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange">
                    {iae2956 ? 'Confirmed' : 'Strong yearly pattern'}
                  </span>
                </div>
                {iae2956 ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {iae2956.source ? (
                      <SourceLink href={iae2956.source}>CIG confirmed</SourceLink>
                    ) : (
                      'CIG confirmed'
                    )}{' '}
                    the IAE 2956 Free Fly for{' '}
                    {formatRangeUTC(iae2956.start, iae2956.end)}, free for anyone with
                    an RSI account. Full details, free ships, and the{' '}
                    {iae2956Ended() ? 'recap' : 'live status'} are on the{' '}
                    <Link href="/iae-2956" className="text-orange underline-offset-2 hover:underline">
                      IAE 2956 page
                    </Link>
                    .
                  </p>
                ) : (
                <>
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
                </>
                )}
              </div>

              {/* CitizenCon — not held in 2026 (ledger: citizencon-2026-not-held) */}
              <div className="rounded-xl border border-white/10 bg-blackMid/60 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="heading-display text-lg text-white">
                    CitizenCon — not happening in 2026
                  </h3>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    Confirmed off
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <SourceLink href={SOURCES.citizenCon2026NotHeld}>
                    CIG has said
                  </SourceLink>{' '}
                  it will not hold CitizenCon in 2026 in any form &mdash; in-person,
                  digital, or Direct. Even in 2025,{' '}
                  <SourceLink href={SOURCES.citizenConDirect2955}>
                    CitizenCon Direct 2955
                  </SourceLink>{' '}
                  (October 11, 2025) was a digital-only stream with no Free Fly
                  attached, so October has not been a reliable free-to-play window.
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
