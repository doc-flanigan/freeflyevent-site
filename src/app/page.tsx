import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CTAButton } from '@/components/CTAButton';
import { EventCard } from '@/components/EventCard';
import { EventHistoryTable } from '@/components/EventHistoryTable';
import { FreeFlyGuide } from '@/components/FreeFlyGuide';
import { FREE_FLY_HISTORY, getEventStatus, HUB_URL, REFERRAL_URL } from '@/data/events';

export default function HomePage() {
  // Server-side initial state — used for the static SEO/schema content.
  // The banner re-derives state on the client every minute so it stays
  // accurate without a redeploy.
  const status = getEventStatus();

  // Featured event = active OR upcoming OR most recent.
  const featuredEvent =
    status.state === 'ACTIVE' || status.state === 'UPCOMING'
      ? status.event
      : FREE_FLY_HISTORY[0];

  return (
    <>
      {/* Banner: ABOVE the nav, full width, the most visible element on page */}
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main>
        {/* HERO */}
        <section className="relative">
          <HeroCarousel>
            <div className="max-w-3xl">
              <span className="eyebrow mb-5">Star Citizen · Free Fly Tracker</span>
              <h1 className="heading-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                Star Citizen <span className="text-orange">Free Fly</span> Events
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
                Anyone can play Star Citizen for free during Free Fly events. Find
                out when the next one is, what&apos;s included, and how to lock in
                a 50,000 UEC referral bonus before you launch.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton size="lg" />
                <Link
                  href="#current-event"
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-orange"
                >
                  See current event status ↓
                </Link>
              </div>
            </div>
          </HeroCarousel>
        </section>

        {/* CURRENT / UPCOMING — large status banner */}
        <section id="current-event" className="container-wide -mt-8 sm:-mt-12 relative z-10">
          <EventStatusBanner variant="hero" />
        </section>

        {/* WHAT IS A FREE FLY */}
        <section className="container-narrow py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">The Basics</span>
              <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                What is a Free Fly event?
              </h2>
            </div>
            <div className="space-y-4 lg:col-span-7 text-white/85">
              <p>
                Twice a year, Cloud Imperium Games — the studio behind Star
                Citizen — opens the game to everyone. For roughly 10 days,{' '}
                <strong className="text-white">no purchase is required.</strong>{' '}
                You make a free RSI account, download the launcher, and you&apos;re
                in.
              </p>
              <p>
                The two main events are <strong className="text-orange">Invictus
                Launch Week</strong> in May (a Navy fleet showcase) and the{' '}
                <strong className="text-orange">Intergalactic Aerospace Expo
                (IAE)</strong> in November (the largest ship show of the year,
                with 100+ ships rotating through the free roster).
              </p>
              <p>
                Free Fly is the moment to try Star Citizen. If you bounce off,
                you&apos;ve lost nothing. If you&apos;re hooked, you&apos;ll know
                it within an afternoon — and you can decide whether to grab a
                Game Package while still inside the event window.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT CAN YOU DO — checklist */}
        <section className="border-y border-white/5 bg-blackMid/40">
          <div className="container-narrow py-20 sm:py-28">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow">Your First 60 Minutes</span>
              <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                What can you do during a Free Fly?
              </h2>
              <p className="mt-4 text-muted">
                Use this checklist whether the event is live now or you&apos;re
                preparing for the next one. Each step is bite-sized — get
                through them and you&apos;ll have a real sense of the game.
              </p>
            </div>
            <FreeFlyGuide />
          </div>
        </section>

        {/* REFERRAL BONUS — URGENCY */}
        <section id="referral-bonus" className="container-narrow py-20 sm:py-28">
          <div className="rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/10 via-blackMid to-spaceBlack p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">The Referral Bonus</span>
                <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                  50,000 UEC — only if you use a code{' '}
                  <span className="text-orange">at signup</span>.
                </h2>
                <p className="mt-5 text-white/85">
                  When you create your RSI account, paste a referral code into
                  the <span className="font-mono">Referral Code</span> field.
                  You receive 50,000 UEC — Star Citizen&apos;s in-game currency
                  — the moment you log in. That&apos;s real money to spend on
                  rentals, ammo, components, and gear during the event.
                </p>
                <div className="mt-6 rounded-lg border border-orange/40 bg-spaceBlack/60 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                    Use this code
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-orange">
                    STAR-GCQJ-N6NC
                  </div>
                </div>
                <div className="mt-6">
                  <CTAButton size="lg">Create Your Free Account Now</CTAButton>
                </div>
              </div>

              {/* The 24-hour grace period warning — prominent */}
              <div className="rounded-xl border border-orange bg-orange/15 p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange text-spaceBlack"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    </svg>
                  </span>
                  <h3 className="heading-display text-xl text-white">
                    Important: use the code at signup.
                  </h3>
                </div>
                <p className="text-white/90">
                  RSI offers a 24-hour grace period to add a referral code after
                  signup, but in practice it&apos;s easy to miss. The reliable
                  path:{' '}
                  <strong className="text-orange">
                    paste the code into the Referral Code field on the signup
                    form itself.
                  </strong>
                </p>
                <p className="mt-3 text-sm text-white/75">
                  After 24 hours have passed, the code cannot be added — you
                  forfeit the 50,000 UEC permanently. There&apos;s no support
                  ticket that fixes it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED EVENT CARD */}
        <section className="container-narrow pb-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">
                {status.state === 'ACTIVE'
                  ? 'Right Now'
                  : status.state === 'UPCOMING'
                    ? 'Next Event'
                    : 'Most Recent Event'}
              </span>
              <h2 className="heading-display mt-3 text-3xl">{featuredEvent.name}</h2>
            </div>
            <Link
              href="/event-history"
              className="hidden text-sm text-orange hover:underline sm:inline"
            >
              All events →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <EventCard
              event={featuredEvent}
              status={
                status.state === 'ACTIVE'
                  ? 'ACTIVE'
                  : status.state === 'UPCOMING'
                    ? 'UPCOMING'
                    : 'PAST'
              }
              highlight
            />
            {FREE_FLY_HISTORY[1] && (
              <EventCard event={FREE_FLY_HISTORY[1]} status="PAST" />
            )}
          </div>
        </section>

        {/* HISTORY TABLE */}
        <section className="border-t border-white/5 bg-blackMid/30">
          <div className="container-narrow py-20 sm:py-24">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow">Track Record</span>
                <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
                  Free Fly Event History
                </h2>
                <p className="mt-3 max-w-xl text-muted">
                  Every Free Fly we&apos;ve catalogued. Use this to estimate
                  when the next one is likely — patterns repeat year over year.
                </p>
              </div>
              <Link
                href="/event-history"
                className="hidden whitespace-nowrap text-sm text-orange hover:underline sm:inline"
              >
                Sortable view →
              </Link>
            </div>
            <EventHistoryTable limit={6} />
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/event-history"
                className="inline-block text-sm text-orange hover:underline"
              >
                View full sortable history →
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="container-narrow py-24 text-center">
          <span className="eyebrow">Don&apos;t Wait</span>
          <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
            Free Flys end. Your account doesn&apos;t.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Make the account today. The 50,000 UEC bonus is locked the moment
            you sign up with a referral code, and it&apos;s waiting for you when
            the next event opens.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton size="lg" />
            <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
              New to SC? Visit o7citizen.com →
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD: Event schema for the active or upcoming event */}
      {(status.state === 'ACTIVE' || status.state === 'UPCOMING') && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: status.event.name,
              startDate: status.event.start,
              endDate: status.event.end,
              eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
              eventStatus:
                status.state === 'ACTIVE'
                  ? 'https://schema.org/EventScheduled'
                  : 'https://schema.org/EventScheduled',
              location: {
                '@type': 'VirtualLocation',
                url: REFERRAL_URL,
              },
              description: `${status.event.name} — Star Citizen Free Fly event. ${
                status.event.notes ?? ''
              }`,
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
                url: REFERRAL_URL,
                validFrom: status.event.start,
              },
            }),
          }}
        />
      )}
    </>
  );
}
