import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL } from '@/data/events';

export const metadata: Metadata = {
  title: 'Foundation Festival 2026 — Dates & Free Fly Status',
  description:
    'Foundation Festival 2026 runs July 29 – August 10 with a confirmed Free Fly, plus Twitch Drops through Aug 12 — here is everything CIG confirmed.',
  alternates: { canonical: '/foundation-festival-2026' },
  keywords: [
    'foundation festival 2026',
    'star citizen foundation festival',
    'is there a free fly for foundation festival 2026',
    'foundation festival free fly',
    'star citizen foundation festival twitch drops',
    'star citizen argo atls referral',
    'foundation festival 2026 dates',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'Foundation Festival 2026 — Dates & Free Fly Status',
    description:
      'Foundation Festival 2026 runs July 29 – August 10 with a confirmed Free Fly. Twitch Drops run through Aug 12 — the honest, sourced breakdown.',
  },
};

// Official sources for Foundation Festival 2026 as of this writing.
const SOURCES = {
  foundationFestival2026:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21237-Twitch-Drops-Foundation-Festival-2026',
  freeFlyAnnouncement:
    'https://support.robertsspaceindustries.com/hc/en-us/articles/360037529633-Welcome-to-the-Star-Citizen-Free-Fly-Event',
} as const;

const LAST_CHECKED = 'July 29, 2026';

const faqs = [
  {
    q: 'Is there a Free Fly for Foundation Festival 2026?',
    a: 'Yes. Cloud Imperium Games’ official Free Fly support article confirms a Free Fly running July 29 – August 10, 2026, with five ships available to test fly for free: RSI Aurora Mk II, Drake Cutter, Drake Golem, Crusader Intrepid, and RSI Salvation. Foundation Festival paired with a Free Fly in both 2024 and 2025, and 2026 continues the pattern.',
  },
  {
    q: 'When does Foundation Festival 2026 start?',
    a: 'July 29, 2026, running through August 10. CIG’s FAQ in Comm-Link 21237 states: "Starting July 29, with the launch of Foundation Festival, any community streamer who opts in to Twitch Drops will be eligible to host the campaign and have their viewers earn rewards." The official Free Fly support article confirms the festival window (and the accompanying Free Fly) runs July 29 – August 10.',
  },
  {
    q: 'What are the Foundation Festival 2026 Twitch Drops?',
    a: 'A separate promotional campaign running July 29 – August 12, 2026. Watching 4 total hours on any Drops-Enabled Star Citizen stream earns an ATLS Foundation Fest Livery. A new recurring or gift subscription to a participating Star Citizen streamer earns a Banu Lockbox Replica. Prime subs, renewals, and sub tokens do not count toward the subscription drop. You need linked Twitch and RSI accounts, and only one Twitch account can be linked per RSI account.',
  },
  {
    q: 'How do I get the free Argo ATLS?',
    a: 'CIG has teased it but not published terms. The entire announcement, per FAQ #11 of Comm-Link 21237: "Additionally, during Foundation Festival, recruiting a new player will earn you a free Argo ATLS. More details coming soon!" CIG has not said what (if anything) the new player receives, has not named a UEC amount, and has not given the promo’s dates. Don’t expect it to auto-apply — wait for the follow-up announcement.',
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

export default function FoundationFestival2026Page() {
  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Foundation Festival 2026</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            Foundation Festival 2026: Dates, Twitch Drops &amp; Free Fly Status
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Last checked {LAST_CHECKED} &middot; source:{' '}
            <SourceLink href={SOURCES.foundationFestival2026}>
              Comm-Link 21237
            </SourceLink>
          </p>

          {/* GEO answer — static, honest, quotable */}
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Foundation Festival 2026 runs <strong className="text-white">July 29 –
            August 10</strong>, with a{' '}
            <strong className="text-white">confirmed Free Fly</strong> for the
            full event — five ships are available to test fly for free. CIG has
            also confirmed a Twitch Drops campaign running{' '}
            <strong className="text-white">July 29 – August 12</strong> and teased a
            referral reward, though its terms are unpublished. CIG says more
            details are coming.
          </p>

          {/* Is there a Free Fly — this page's core value */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Is There a Free Fly for Foundation Festival 2026?
            </h2>
            <div className="mt-6 rounded-2xl border border-orange/30 bg-blackMid/60 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-orange">
                Confirmed
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Yes. CIG&apos;s official{' '}
                <SourceLink href={SOURCES.freeFlyAnnouncement}>
                  Free Fly support article
                </SourceLink>{' '}
                confirms a Free Fly running{' '}
                <strong className="text-white">July 29 – August 10, 2026</strong>,
                with five ships available to test fly for free: RSI Aurora Mk II,
                Drake Cutter, Drake Golem, Crusader Intrepid, and RSI Salvation.
                Foundation Festival paired with a Free Fly in{' '}
                <strong className="text-white">both 2024 and 2025</strong>, and
                2026 continues the pattern.
              </p>
              <p className="mt-3 text-xs text-muted">
                Last checked {LAST_CHECKED}.
              </p>
            </div>
          </section>

          {/* When it starts */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              When Does Foundation Festival 2026 Start?
            </h2>
            <p className="mt-4 text-muted">
              <strong className="text-white">July 29, 2026, running through August 10.</strong>{' '}
              CIG&apos;s FAQ in{' '}
              <SourceLink href={SOURCES.foundationFestival2026}>Comm-Link 21237</SourceLink>{' '}
              states: &ldquo;Starting July 29, with the launch of Foundation Festival, any
              community streamer who opts in to Twitch Drops will be eligible to host the
              campaign and have their viewers earn rewards.&rdquo; CIG&apos;s official{' '}
              <SourceLink href={SOURCES.freeFlyAnnouncement}>
                Free Fly support article
              </SourceLink>{' '}
              confirms the festival&apos;s Free Fly window closes August 10 — a separate,
              longer window than the Twitch Drops campaign below, which runs through Aug 12.
            </p>
          </section>

          {/* Twitch Drops */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What Are the Foundation Festival 2026 Twitch Drops?
            </h2>
            <p className="mt-4 text-muted">
              A Twitch Drops campaign runs{' '}
              <strong className="text-white">July 29 – August 12, 2026</strong> —
              this is the Drops window, not a stated end date for the festival itself.
            </p>
            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-orange/30 bg-blackMid/60 p-6">
                <h3 className="heading-display text-lg text-white">
                  Watch 4 hours → ATLS Foundation Fest Livery
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Watch 4 total hours on any &ldquo;Drops Enabled&rdquo; Star Citizen stream
                  to earn an Anvil ATLS Foundation Fest livery.
                </p>
              </div>
              <div className="rounded-xl border border-orange/30 bg-blackMid/60 p-6">
                <h3 className="heading-display text-lg text-white">
                  New sub → Banu Lockbox Replica
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  A new recurring or gift subscription to a participating Star Citizen
                  streamer earns a Banu Lockbox Replica. Prime subs, renewals, and sub
                  tokens do <strong className="text-white">not</strong> count.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-blackMid/60 p-6">
                <h3 className="heading-display text-lg text-white">Requirements</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Your Twitch and RSI accounts must be linked, and only one Twitch account
                  can be linked per RSI account.
                </p>
              </div>
            </div>
          </section>

          {/* Referral reward */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              How Do I Get the Free Argo ATLS?
            </h2>
            <div className="mt-6 rounded-2xl border border-white/10 bg-blackMid/60 p-6 sm:p-8">
              <p className="text-white/85">
                CIG has teased a referral reward but has not published its terms. The entire
                announcement, per FAQ #11 of{' '}
                <SourceLink href={SOURCES.foundationFestival2026}>Comm-Link 21237</SourceLink>
                : &ldquo;Additionally, during Foundation Festival, recruiting a new player
                will earn you a free Argo ATLS. More details coming soon!&rdquo;
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
                <li>No word on whether the new player receives anything.</li>
                <li>No UEC amount or reward has been named.</li>
                <li>No start or end dates for the referral promo have been given.</li>
              </ul>
              <p className="mt-4 text-sm text-white/85">
                We won&apos;t promise you an ATLS until CIG publishes the actual terms. What
                you can do right now is make sure any new player you bring in signs up with a
                referral code — codes can only be added at signup, not after — so
                you&apos;re both ready the moment CIG confirms how the reward works.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Get your account ready</h2>
            <p className="mt-4 text-white/80">
              The Foundation Festival 2026 Free Fly runs through August 10, and a
              referral code only works at signup — it cannot be added later. Create
              your free RSI account now with a code and claim your 50,000 UEC bonus.
            </p>
            <div className="mt-6">
              <CTAButton size="lg" trackingLabel="foundation-festival-2026-cta" />
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
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? &rarr;
              </Link>
              <Link href="/is-star-citizen-free" className="btn-secondary">
                Is Star Citizen free? &rarr;
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com &rarr;
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/foundation-festival-2026" />

      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Foundation Festival 2026 Twitch Drops',
            startDate: '2026-07-29',
            endDate: '2026-08-12',
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'VirtualLocation',
              url: SOURCES.foundationFestival2026,
            },
            description:
              'Star Citizen Foundation Festival 2026 Twitch Drops campaign. Watch 4 hours on a Drops Enabled stream for an ATLS Foundation Fest livery, or gift/recur a sub to a participating streamer for a Banu Lockbox Replica.',
            organizer: {
              '@type': 'Organization',
              name: 'Cloud Imperium Games',
              url: 'https://www.robertsspaceindustries.com/',
            },
          }),
        }}
      />
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
              { '@type': 'ListItem', position: 2, name: 'Foundation Festival 2026', item: 'https://freeflyevent.com/foundation-festival-2026' },
            ],
          }),
        }}
      />
    </>
  );
}
