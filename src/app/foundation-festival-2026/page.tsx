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
  title: 'Foundation Festival 2026 Free Fly — Live July 29 to August 10',
  description:
    'The Foundation Festival 2026 Free Fly is live: play Star Citizen free July 29 – August 10 with five ships. Referral bonus, Twitch Drops, and every confirmed detail.',
  alternates: { canonical: '/foundation-festival-2026' },
  keywords: [
    'foundation festival 2026',
    'star citizen foundation festival',
    'foundation festival 2026 free fly',
    'foundation festival free fly ships',
    'star citizen foundation festival twitch drops',
    'star citizen argo atls referral',
    'foundation festival 2026 dates',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'Foundation Festival 2026 Free Fly — Live July 29 to August 10',
    description:
      'Play Star Citizen free through August 10 with five ships. The referral bonus adds a "Ready for Anything" Career Kit — the sourced breakdown.',
  },
};

// Official sources for Foundation Festival 2026.
const SOURCES = {
  foundationFestival2026:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21211-Foundation-Festival-2026',
  referralBonus2026:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21225-Foundation-Festival-2026-Referral-Bonus',
  twitchDrops2026:
    'https://robertsspaceindustries.com/en/comm-link/transmission/21237-Twitch-Drops-Foundation-Festival-2026',
} as const;

const LAST_CHECKED = 'July 29, 2026';

const faqs = [
  {
    q: 'Is there a Free Fly for Foundation Festival 2026?',
    a: 'Yes — it is live right now. Cloud Imperium Games’ official announcement (Comm-Link 21211, "Foundation Festival 2026") confirms: "From July 29 through August 10, everyone can play for free and explore the \'verse with five distinct ships." No purchase is needed — create a free RSI account and download the game.',
  },
  {
    q: 'Which ships are free to fly during Foundation Festival 2026?',
    a: 'CIG has confirmed five ships but has not yet published their names — the announcement Comm-Link says only "five distinct ships," and CIG’s This Week in Star Citizen post says a full rundown is coming soon. This page will list the ships the moment CIG names them. Do not trust sites listing specific ships right now: they are guessing from prior years.',
  },
  {
    q: 'When does the Foundation Festival 2026 Free Fly end?',
    a: 'August 10, 2026, per Comm-Link 21211 ("From July 29 through August 10"). CIG has not published an exact end time, so treat the end of August 10 (UTC) as the cutoff and don’t leave it to the last hours. The referral bonus promo runs longer — until August 12 at 20:00 UTC — and the Twitch Drops campaign also ends August 12.',
  },
  {
    q: 'What are the Foundation Festival 2026 Twitch Drops?',
    a: 'A separate promotional campaign running July 29 – August 12, 2026. Watching 4 total hours on any Drops-Enabled Star Citizen stream earns an ATLS Foundation Fest Livery. A new recurring or gift subscription to a participating Star Citizen streamer earns a Banu Lockbox Replica. Prime subs, renewals, and sub tokens do not count toward the subscription drop. You need linked Twitch and RSI accounts, and only one Twitch account can be linked per RSI account.',
  },
  {
    q: 'How does the Argo ATLS referral bonus work?',
    a: 'The full terms are now published in Comm-Link 21225. The veteran player earns an Argo ATLS power suit (with Lifetime Insurance, non-meltable, non-giftable, one per player) when a new player uses their referral code and pledges for a starter pack or ship on the Pledge Store. The new player earns a "Ready for Anything" Career Kit: an RSI Venture armor set and undersuit, RSI MacFlex backpack, Pyro RYT Multi-Tool with mining, tractor beam, and healing attachments, a Greycat Cambio-Lite SRT attachment and canister, a Behring P4-AR rifle, and an all-purpose container. The new player’s kit is granted after the promotion ends on August 12; the veteran’s ATLS is granted immediately on the qualifying pledge. The standard 50,000 UEC signup bonus still applies with no purchase. The promotion runs until August 12, 2026, 20:00 UTC.',
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
            Foundation Festival 2026: Free Fly Dates, Ships &amp; Twitch Drops
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Last checked {LAST_CHECKED} &middot; source:{' '}
            <SourceLink href={SOURCES.foundationFestival2026}>
              Comm-Link 21211
            </SourceLink>
          </p>

          {/* GEO answer — static, honest, quotable */}
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            The Foundation Festival 2026 Free Fly is{' '}
            <strong className="text-white">live right now</strong>: from{' '}
            <strong className="text-white">July 29 through August 10</strong>, anyone can
            play Star Citizen for free with{' '}
            <strong className="text-white">five ships</strong> to try — no purchase
            required. The referral bonus adds a &ldquo;Ready for Anything&rdquo; Career Kit
            for new players and an Argo ATLS for the recruiter, running until{' '}
            <strong className="text-white">August 12, 20:00 UTC</strong>. A Twitch Drops
            campaign runs alongside through August 12.
          </p>

          {/* Free Fly confirmed — live status box */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The Foundation Festival 2026 Free Fly Is Live
            </h2>
            <div className="mt-6 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-orange">
                Confirmed — live through August 10
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                CIG&apos;s official announcement,{' '}
                <SourceLink href={SOURCES.foundationFestival2026}>Comm-Link 21211</SourceLink>
                , confirms it: &ldquo;From July 29 through August 10, everyone can play for
                free and explore the &apos;verse with five distinct ships.&rdquo; CIG has
                not yet named the five ships — its own weekly post says a full rundown is
                coming soon, and this page will list them the moment they&apos;re official.
                No exact end time has been published either, so don&apos;t gamble on the
                final hours of August 10.
              </p>
              <p className="mt-3 text-xs text-muted">
                Last checked {LAST_CHECKED}. Ship lineup and end time will be added when
                CIG publishes them.
              </p>
            </div>
          </section>

          {/* When it runs */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              When Does Foundation Festival 2026 Run?
            </h2>
            <p className="mt-4 text-muted">
              <strong className="text-white">July 29 – August 10, 2026</strong> for the
              Free Fly, per{' '}
              <SourceLink href={SOURCES.foundationFestival2026}>Comm-Link 21211</SourceLink>.
              Two companion promotions run longer: the{' '}
              <SourceLink href={SOURCES.referralBonus2026}>referral bonus</SourceLink>{' '}
              until August 12 at 20:00 UTC, and the Twitch Drops campaign through
              August 12.
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

          {/* Referral reward — full published terms */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The Referral Bonus: Argo ATLS &amp; &ldquo;Ready for Anything&rdquo; Career Kit
            </h2>
            <div className="mt-6 rounded-2xl border border-white/10 bg-blackMid/60 p-6 sm:p-8">
              <p className="text-white/85">
                CIG published the full terms in{' '}
                <SourceLink href={SOURCES.referralBonus2026}>Comm-Link 21225</SourceLink>.
                Both sides of the referral get gear, on top of the standard signup bonus:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                <li>
                  <strong className="text-white">New player:</strong> a &ldquo;Ready for
                  Anything&rdquo; Career Kit — RSI Venture armor set and undersuit, RSI
                  MacFlex backpack, Pyro RYT Multi-Tool with mining, tractor beam, and
                  healing attachments, a Greycat Cambio-Lite SRT attachment and canister, a
                  Behring P4-AR rifle, and an all-purpose container. Granted after the
                  promotion ends on August 12.
                </li>
                <li>
                  <strong className="text-white">Recruiter:</strong> an Argo ATLS power
                  suit with Lifetime Insurance (non-meltable, non-giftable, one per
                  player). Granted immediately on the qualifying pledge.
                </li>
                <li>
                  <strong className="text-white">The catch:</strong> both gear rewards
                  require the new player to use a referral code <em>and</em> pledge for a
                  starter pack or ship on the Pledge Store during the promo.
                </li>
                <li>
                  <strong className="text-white">No purchase needed</strong> for the
                  standard 50,000 UEC signup bonus — that credits on free account creation
                  with a referral code, as always.
                </li>
                <li>
                  Promotion runs until{' '}
                  <strong className="text-white">August 12, 2026, 20:00 UTC</strong>.
                </li>
              </ul>
              <p className="mt-4 text-sm text-white/85">
                One thing that hasn&apos;t changed: a referral code works at signup (or
                within 24 hours of creating the account) — after that it cannot be added.
                Sign up with a code first, decide about pledging later.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Play free right now</h2>
            <p className="mt-4 text-white/80">
              The Free Fly ends August 10 — and a referral code only works at signup, not
              after. Create your free RSI account with a code, claim your 50,000 UEC
              bonus, and you&apos;re set for the Career Kit if you decide to pledge later.
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
            name: 'Foundation Festival 2026 Free Fly',
            startDate: '2026-07-29',
            endDate: '2026-08-10',
            isAccessibleForFree: true,
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'VirtualLocation',
              url: SOURCES.foundationFestival2026,
            },
            description:
              'Star Citizen Foundation Festival 2026 Free Fly: play free July 29 – August 10, 2026 with five ships, no purchase required. Referral bonus (Argo ATLS + Ready for Anything Career Kit) runs until August 12, 20:00 UTC; Twitch Drops campaign through August 12.',
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
