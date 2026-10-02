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
import { HUB_URL, FREE_FLY_HISTORY, getIae2956, type FreeFlyEvent } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

// Re-render hourly so every state-dependent string on this page (metadata,
// headline, status box, FAQ, JSON-LD) flips the moment IAE 2956 is added to
// FREE_FLY_HISTORY, and again when it starts and ends — no redeploy needed.
export const revalidate = 3600;

// Only meaningful while IAE 2956 is unannounced — bump it whenever the
// official Comm-Links are re-checked.
const LAST_CHECKED = 'September 29, 2026';

type Phase = 'unannounced' | 'upcoming' | 'active' | 'cancelled' | 'ended';

function phaseOf(iae: FreeFlyEvent | undefined, now: Date = new Date()): Phase {
  if (!iae) return 'unannounced';
  const start = new Date(iae.start);
  const end = new Date(iae.end);
  if (now > end) return 'ended';
  if (now >= start) return iae.freeFlyActive === false ? 'cancelled' : 'active';
  return 'upcoming';
}

function endDay(iae: FreeFlyEvent): string {
  return new Date(iae.end).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

const KEYWORDS = [
  'iae 2956',
  'star citizen iae 2026',
  'iae 2956 free fly',
  'iae 2956 dates',
  'iae 2956 arccorp',
  'intergalactic aerospace expo 2956',
  'star citizen november free fly',
  'when is the star citizen free to play event',
];

export async function generateMetadata(): Promise<Metadata> {
  const iae = getIae2956();
  const phase = phaseOf(iae);
  const base = {
    alternates: { canonical: '/iae-2956' },
    keywords: KEYWORDS,
  };

  if (!iae || phase === 'unannounced') {
    return {
      ...base,
      title: 'IAE 2956 Free Fly — Expected November 2026',
      description:
        'IAE 2956 is not announced yet. Based on the pattern, expect late November 2026 — IAE 2955 ran Nov 20–Dec 3, 2025. The sourced breakdown, updated live.',
      openGraph: {
        images: ['/images/og-image.png'],
        title: 'IAE 2956 — Star Citizen Free Fly Expected November 2026',
        description:
          'IAE 2956 is unannounced. Here is what five years of November Free Flys say to expect — and how to be ready.',
      },
    };
  }

  const range = formatRangeUTC(iae.start, iae.end);
  const copy: Record<Exclude<Phase, 'unannounced'>, { title: string; description: string }> = {
    upcoming: {
      title: `IAE 2956 Free Fly Confirmed — ${range}`,
      description: `CIG has confirmed the IAE 2956 Free Fly: ${range}. Free for anyone with an RSI account — dates, free ships, and how to claim 50,000 UEC before it starts.`,
    },
    active: {
      title: `IAE 2956 Free Fly Is Live — Ends ${endDay(iae)}`,
      description: `The IAE 2956 Free Fly is live now through ${endDay(iae)}. Play Star Citizen free with an RSI account — what's free to fly and how to claim 50,000 UEC.`,
    },
    cancelled: {
      title: 'IAE 2956 Free Fly Cancelled — What Still Works',
      description: `CIG pulled the Free Fly portion of IAE 2956 (${range}). New RSI accounts can still claim 50,000 UEC with a referral code — here is what changed and what still works.`,
    },
    ended: {
      title: `IAE 2956 Free Fly Recap — ${range}`,
      description: `The IAE 2956 Free Fly ran ${range} and has ended. Full record of the dates and free ships, sourced from CIG's official Comm-Link — plus when to expect the next one.`,
    },
  };
  const { title, description } = copy[phase];
  return {
    ...base,
    title,
    description,
    openGraph: { images: ['/images/og-image.png'], title, description },
  };
}

function buildFaqs(iae2956: FreeFlyEvent | undefined, now: Date = new Date()) {
  if (iae2956) {
    const start = new Date(iae2956.start);
    const end = new Date(iae2956.end);
    const range = formatRangeUTC(iae2956.start, iae2956.end);
    const active = now >= start && now <= end;
    const past = now > end;
    const cancelled = iae2956.freeFlyActive === false;
    const whenAnswer = active
      ? `IAE 2956 is running right now, ${range}. Check the countdown banner at the top of this page for the exact time remaining.`
      : past
        ? `IAE 2956 ran ${range}. See the Free Fly schedule for what's next.`
        : `Confirmed: IAE 2956 runs ${range}. The countdown banner at the top of this page tracks the time remaining until it starts.`;
    const bonus = iae2956.bonusOverride
      ? ` New accounts created with a referral code during the event get ${iae2956.bonusOverride.text}.`
      : ' New accounts created with a referral code get 50,000 UEC.';
    return [
      { q: 'When is IAE 2956?', a: whenAnswer },
      {
        q: 'Will IAE 2956 have a Free Fly?',
        a: cancelled
          ? `CIG announced a Free Fly for IAE 2956 (${range}) but then pulled free access. ${iae2956.cancelledNote ?? ''}`.trim()
          : `Yes, confirmed by CIG in an official Comm-Link. IAE 2956 (${range}) is free for anyone with an RSI account — no purchase needed.${bonus}`,
      },
      {
        q: 'What ships will be free during IAE 2956?',
        a: iae2956.ships.length
          ? `Confirmed so far: ${iae2956.ships.join('; ')}.`
          : 'CIG has not published the manufacturer schedule yet — check back closer to launch.',
      },
      {
        q: 'How long does IAE usually last?',
        a: `IAE 2956 runs ${range}. Recent years ran a similar length: IAE 2955 (November 20 – December 3, 2025) and IAE 2954 (November 22 – December 5, 2024), each about two weeks.`,
      },
      {
        q: 'Where is IAE 2956 held?',
        a: 'CIG’s official IAE 2956 Comm-Link (linked above) names this year’s venue. The host city has moved before: IAE 2953 and 2954 were held at the Tobin Expo Center in New Babbage on microTech, and IAE 2955 moved to Orison on Crusader.',
      },
    ];
  }

  return [
    {
      q: 'When is IAE 2956?',
      a: 'Not announced. Cloud Imperium Games has not published dates for the Intergalactic Aerospace Expo 2956. Based on the pattern — IAE has run every year since at least 2951 (2021), always starting mid-to-late November, and CIG posted its “Save the Date” announcement on November 7 in 2024 and November 6 in 2025 — the expected window is late November 2026. Treat any specific dates you see elsewhere as guesses until an official RSI Comm-Link exists.',
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
    {
      q: 'Where will IAE 2956 be held — ArcCorp?',
      a: 'Not announced. The host city has moved before: IAE 2953 and 2954 were held at the Tobin Expo Center in New Babbage on microTech, and IAE 2955 moved to Orison on Crusader. CIG has not said where IAE 2956 will be, so treat any ArcCorp claims as unconfirmed until an official announcement.',
    },
  ];
}

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
  const iae2956 = getIae2956();
  const phase = phaseOf(iae2956);
  const faqs = buildFaqs(iae2956);
  const iae2955 = FREE_FLY_HISTORY.find((ev) => ev.id === 'iae-2025');
  const range = iae2956 ? formatRangeUTC(iae2956.start, iae2956.end) : '';

  const headline: Record<Phase, string> = {
    unannounced: 'IAE 2956: The Next Big Star Citizen Free Fly (Expected November)',
    upcoming: `IAE 2956 Free Fly: Confirmed for ${range}`,
    active: 'The IAE 2956 Free Fly Is Live Now',
    cancelled: 'IAE 2956: The Free Fly Was Cancelled',
    ended: `IAE 2956 Free Fly Recap (${range})`,
  };

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />
      <PageBackdrop seed={9} />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          <span className="eyebrow">IAE 2956</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            {headline[phase]}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            {iae2956
              ? <>Confirmed by official RSI Comm-Link &middot; status: {phase === 'upcoming' ? 'announced' : phase === 'active' ? 'live now' : phase}</>
              : <>Last checked {LAST_CHECKED} &middot; status: not announced</>}
          </p>

          {/* GEO answer — honest, quotable, derived from the event calendar */}
          {iae2956 ? (
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {phase === 'upcoming' && (
                <>
                  <strong className="text-white">Confirmed:</strong> the
                  Intergalactic Aerospace Expo 2956 Free Fly runs{' '}
                  <strong className="text-white">{range}</strong>, per CIG&apos;s
                  official Comm-Link. It is free for anyone with an RSI account — no
                  purchase needed.{' '}
                </>
              )}
              {phase === 'active' && (
                <>
                  The Intergalactic Aerospace Expo 2956 Free Fly is{' '}
                  <strong className="text-white">live right now</strong> and runs
                  through <strong className="text-white">{endDay(iae2956)}</strong>{' '}
                  ({range}). Anyone with a free RSI account can play — no purchase
                  needed.{' '}
                </>
              )}
              {phase === 'cancelled' && (
                <>
                  CIG pulled the Free Fly portion of the Intergalactic Aerospace Expo
                  2956 ({range}). {iae2956.cancelledNote ?? ''}{' '}
                </>
              )}
              {phase === 'ended' && (
                <>
                  The Intergalactic Aerospace Expo 2956 Free Fly ran{' '}
                  <strong className="text-white">{range}</strong> and has ended.{' '}
                </>
              )}
              {iae2956.ships.length > 0 && phase !== 'cancelled' && (
                <>Free to fly: {iae2956.ships.join('; ')}.</>
              )}
            </p>
          ) : (
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            The Intergalactic Aerospace Expo 2956 has{' '}
            <strong className="text-white">not been announced</strong>. Based on
            the yearly pattern — an IAE Free Fly every November since at least
            2951 (2021) — the expected window is{' '}
            <strong className="text-white">late November 2026</strong>. Last
            year&apos;s IAE 2955 ran{' '}
            <strong className="text-white">November 20 – December 3, 2025</strong>,
            and in each of the last two years CIG&apos;s announcement itself has
            landed in the <strong className="text-white">first week of November</strong>.
            Historically it is the biggest free-to-play event of the year:
            roughly two weeks, 100+ ships rotating through daily manufacturer
            showcases, free for anyone with an RSI account.
          </p>
          )}

          <LightboxImage
            src="/images/iae-2952-expo.webp"
            alt="The IAE 2952 banner tower over New Babbage, which hosted the Intergalactic Aerospace Expo that year"
            width={1400}
            height={788}
            containerClassName="mt-8 rounded-xl border border-white/10"
            className="h-auto w-full rounded-xl"
          />

          {/* Confirmed box — derived from the iae-2026 entry once it exists */}
          {iae2956 ? (
            <section className="mt-14">
              <h2 className="heading-display text-2xl sm:text-3xl">
                What&apos;s confirmed
              </h2>
              <div className="mt-6 rounded-2xl border border-orange/40 bg-orange/10 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-orange">
                  {phase === 'active' ? 'Live now' : phase === 'ended' ? 'Ended' : phase === 'cancelled' ? 'Free Fly cancelled' : 'Officially announced'}
                </p>
                <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-white">Dates (UTC)</dt>
                    <dd className="mt-1 text-white/85">{range}</dd>
                  </div>
                  {iae2956.ships.length > 0 && (
                    <div>
                      <dt className="font-semibold text-white">Free to fly</dt>
                      <dd className="mt-1">
                        <ul className="list-disc space-y-1 pl-5 text-white/85">
                          {iae2956.ships.map((ship) => (
                            <li key={ship}>{ship}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold text-white">Signup bonus</dt>
                    <dd className="mt-1 text-white/85">
                      {iae2956.bonusOverride
                        ? iae2956.bonusOverride.text
                        : '50,000 UEC when you create your free RSI account with a referral code.'}
                    </dd>
                  </div>
                </dl>
                {iae2956.source && (
                  <p className="mt-5 text-xs text-muted">
                    Source:{' '}
                    <SourceLink href={iae2956.source}>official RSI Comm-Link</SourceLink>
                  </p>
                )}
              </div>
            </section>
          ) : (
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
                to FREE_FLY_HISTORY in src/data/events.ts as id "iae-2026".
                Everything on this page (metadata, headline, this box, FAQ,
                Event JSON-LD) switches to the confirmed copy automatically.
              */}
              <p className="mt-3 text-xs text-muted">
                Last checked {LAST_CHECKED}. Watching official RSI Comm-Links only.
              </p>
            </div>
          </section>
          )}

          {/* What happened at IAE 2955 — recap, verified facts only */}
          {iae2955 && (
            <section className="mt-14">
              <h2 className="heading-display text-2xl sm:text-3xl">
                What happened at IAE 2955
              </h2>
              <p className="mt-4 text-muted">
                {iae2956
                  ? 'Last year’s expo is a good guide to the format.'
                  : 'The most recent IAE is the best evidence for what to expect.'}{' '}
                <SourceLink href={iae2955.source ?? 'https://robertsspaceindustries.com/comm-link'}>
                  IAE 2955
                </SourceLink>{' '}
                ran {formatRangeUTC(iae2955.start, iae2955.end)} in Orison on
                Crusader — the expo’s debut there — and was free for
                anyone with an RSI account. It included a{' '}
                <strong className="text-white">Crusader Intrepid event loaner</strong>{' '}
                plus a daily rotation of flyable ships across every manufacturer,
                and saw the{' '}
                <strong className="text-white">RSI Perseus make its flight-ready
                debut</strong>{' '}
                on Day 1 — the kind of surprise-ship reveal IAE is known for.
              </p>
            </section>
          )}

          {/* The pattern, from the record */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Five years of November Free Flys
            </h2>
            <LightboxImage
              src="/images/iae-2953-arch.webp"
              alt="The entrance arch at IAE 2953 in New Babbage"
              width={1400}
              height={600}
              containerClassName="mt-6 rounded-xl border border-white/10"
              className="h-auto w-full rounded-xl"
            />
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
              {iae2956 ? 'How IAE usually works' : 'What IAE 2956 will probably look like'}
            </h2>
            <p className="mt-4 text-muted">
              {iae2956
                ? 'Past IAEs have followed a familiar format: roughly two weeks, '
                : 'If the pattern holds: roughly two weeks starting mid-to-late November, '}
              a convention-hall showcase with a different ship
              manufacturer featured each day, that manufacturer&apos;s ships free
              to fly for 48 hours, and a finale stretch where everything flies at
              once. Recent IAEs have also debuted brand-new flyable ships on Day 1
              — the RSI Perseus in 2025. It is the single best window of the year
              to try Star Citizen for free.
            </p>
            <LightboxImage
              src="/images/iae-manufacturer-hall.webp"
              alt="The Aegis Dynamics showcase hall at a past Intergalactic Aerospace Expo — each manufacturer gets a themed hall on its featured day"
              width={1400}
              height={600}
              containerClassName="mt-6 rounded-xl border border-white/10"
              className="h-auto w-full rounded-xl"
            />
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">
              {phase === 'unannounced'
                ? 'Don’t wait for November'
                : phase === 'upcoming'
                  ? 'Get your account ready before IAE 2956 starts'
                  : phase === 'active'
                    ? 'IAE 2956 is live — play free now'
                    : 'Be ready for the next Free Fly'}
            </h2>
            <p className="mt-4 text-white/80">
              {phase === 'active'
                ? `Create your free RSI account, download the launcher, and you're in until ${iae2956 ? endDay(iae2956) : 'the event ends'}. A referral code only works at signup — it can't be added later — so use one now and your 50,000 UEC bonus is waiting when you first log in.`
                : `Make your free account before the Free Fly starts. A referral code only works at signup — it can't be added later — so create your free RSI account with one now and your 50,000 UEC bonus will be waiting whenever you first log in${phase === 'unannounced' || phase === 'upcoming' ? ', whether or not IAE 2956 is live yet' : ''}.`}
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
      {iae2956 && phase !== 'cancelled' && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: `${iae2956.name} Free Fly`,
              startDate: iae2956.start,
              endDate: iae2956.end,
              eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              location: { '@type': 'VirtualLocation', url: 'https://freeflyevent.com/iae-2956' },
              description: `Star Citizen Free Fly during the Intergalactic Aerospace Expo 2956 — free to play for anyone with an RSI account, ${range}.`,
              organizer: {
                '@type': 'Organization',
                name: 'Cloud Imperium Games',
                url: 'https://www.robertsspaceindustries.com/',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: 'https://freeflyevent.com/iae-2956',
                validFrom: iae2956.start,
              },
            }),
          }}
        />
      )}
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
