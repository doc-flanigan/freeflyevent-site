import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CTAButton } from '@/components/CTAButton';
import { EventCard } from '@/components/EventCard';
import { EventHistoryTable } from '@/components/EventHistoryTable';
import { FreeFlyGuide } from '@/components/FreeFlyGuide';
import { TwitchClip } from '@/components/TwitchClip';
import { LightboxImage } from '@/components/LightboxImage';
import { FREE_FLY_HISTORY, getEventStatus, getActiveBonusOverride, HUB_URL, REFERRAL_URL } from '@/data/events';

const DEFENSECON_CLIP_ID = 'SneakyResourcefulStingrayBlargNaut-oB90qB92tLYAmJbF';

export async function generateMetadata(): Promise<Metadata> {
  const status = getEventStatus();
  if (status.state === 'ACTIVE') {
    const bonus = getActiveBonusOverride();
    return {
      title: bonus
        ? 'Star Citizen Free Fly ACTIVE — 50,000 UEC + Drake Gear Pack Through May 27 | freeflyevent.com'
        : 'Star Citizen Free Fly ACTIVE Now — DefenseCon 2956 Live Through May 27 | freeflyevent.com',
      description: bonus
        ? "DefenseCon 2956 Free Fly is live right now through May 27. Sign up with a referral code and claim 50,000 UEC + a free Drake DefenseCon Gear Pack — gear pack offer ends May 27."
        : "Star Citizen is free to play right now — DefenseCon 2956 Free Fly is live through May 27. No purchase needed. Create a free account and claim 50,000 UEC with a referral code before the event ends.",
      keywords: [
        'Star Citizen free fly active',
        'Star Citizen free to play now',
        'DefenseCon 2956 free fly',
        'DefenseCon free fly back on',
        'Star Citizen free fly May 2026',
        'Star Citizen DefenseCon 2026',
        'Star Citizen free fly reinstated',
        'play Star Citizen free',
        'Star Citizen referral bonus',
        'STAR-GCQJ-N6NC',
      ],
      openGraph: {
        title: 'Star Citizen Free Fly is LIVE — DefenseCon 2956 Through May 27',
        description:
          "Star Citizen is free to play right now. DefenseCon 2956 Free Fly runs through May 27 — create your free account and lock in 50,000 UEC before it ends.",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Star Citizen Free Fly is LIVE — DefenseCon 2956 (ends May 27)',
        description:
          "Play Star Citizen free right now. DefenseCon 2956 Free Fly is back on through May 27. Claim 50,000 UEC with a referral code at signup.",
      },
    };
  }
  if (status.state === 'CANCELLED_FREE_FLY') {
    return {
      title: 'DefenseCon Free Fly Cancelled — 50,000 UEC Bonus Still Available | freeflyevent.com',
      description:
        "CIG cancelled the Star Citizen Free Fly for DefenseCon 2026 due to server performance issues — the first time this has ever happened. You can still create a free RSI account and claim 50,000 UEC with a referral code.",
      keywords: [
        'Star Citizen free fly cancelled',
        'DefenseCon free fly cancelled',
        'Star Citizen free fly not available 2026',
        'free fly cancelled server issues',
        'Star Citizen DefenseCon 2026',
        'Star Citizen 50000 UEC no free fly',
        'Star Citizen referral bonus DefenseCon',
        'STAR-GCQJ-N6NC',
      ],
      openGraph: {
        title: 'DefenseCon Free Fly Cancelled — 50,000 UEC Still Available',
        description:
          "CIG pulled the Free Fly for DefenseCon 2026 due to server load — a first in Star Citizen history. Your 50,000 UEC referral bonus still works. Sign up now.",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Star Citizen Free Fly Cancelled (DefenseCon 2026)',
        description:
          "First ever Free Fly cancellation. Server issues forced CIG's hand — but your 50,000 UEC signup bonus still works.",
      },
    };
  }
  return {};
}

export default function HomePage() {
  // Server-side initial state — used for the static SEO/schema content.
  // The banner re-derives state on the client every minute so it stays
  // accurate without a redeploy.
  const status = getEventStatus();

  const bonusOverride = getActiveBonusOverride();

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
              <div className="mt-8">
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

        {/* DEFENSECON CANCELLATION — visible only when free fly was pulled */}
        {status.state === 'CANCELLED_FREE_FLY' && (
          <section id="cancellation" className="container-narrow py-16 sm:py-20">
            <div className="rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-12">

              {/* Header */}
              <div className="mb-8 max-w-2xl">
                <span className="eyebrow text-muted/80">DefenseCon 2026 — What Happened</span>
                <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                  The first time in Star Citizen history a Free Fly has been cancelled.
                </h2>
                <p className="mt-5 text-white/80">
                  CIG pulled the Free Fly portion of DefenseCon 2956 mid-event due to server
                  performance issues — something that has never happened in over a decade of
                  Free Fly events. They didn&apos;t go quiet: they went live on Twitch to explain
                  it directly to the community.
                </p>
              </div>

              {/* Twitch embed */}
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#9147ff]"
                    aria-hidden
                  >
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9147ff]">
                    Official statement — CIG on Twitch
                  </span>
                </div>
                <TwitchClip
                  clipId={DEFENSECON_CLIP_ID}
                  title="CIG explains the DefenseCon Free Fly cancellation"
                />
              </div>

              {/* Rolling with it */}
              <div className="grid gap-6 sm:grid-cols-3 border-t border-white/10 pt-8">
                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    What CIG said
                  </div>
                  <p className="text-sm text-white/80">
                    Server load under the DefenseCon traffic made a stable Free Fly
                    experience impossible. CIG made the call to pull it rather than let
                    new players hit a broken game as their first impression.
                  </p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    The community take
                  </div>
                  <p className="text-sm text-white/80">
                    Disappointing? Yes. But CIG were transparent about it in real time.
                    This is Star Citizen — the community rolls with the punches.
                    The game will get a better Free Fly window when the servers can
                    handle it.
                  </p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    What you can still do
                  </div>
                  <p className="text-sm text-white/80">
                    The <strong className="text-orange">50,000 UEC referral bonus</strong> is
                    still available — create a free RSI account now and it&apos;s locked in
                    for the next Free Fly. Buying a Game Package during DefenseCon still
                    earns the <strong className="text-white">referral clothing pack</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton size="lg">Claim Your 50,000 UEC Bonus Anyway</CTAButton>
                <Link
                  href="/event-history"
                  className="btn-secondary"
                >
                  See all past Free Fly events →
                </Link>
              </div>
            </div>
          </section>
        )}

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

            {/* SEO cross-link: dayonecitizen */}
            <section className="mt-12 rounded-lg border border-orange/30 bg-blackMid px-6 py-5">
              <h2 className="text-lg font-bold text-white mb-2">New to Star Citizen?</h2>
              <p className="text-muted text-sm leading-relaxed">
                Free Fly is a great time to start. If you&apos;ve never played before,{' '}
                <a
                  href="https://dayonecitizen.com"
                  className="text-orange underline hover:text-orange-dark"
                  target="_blank"
                  rel="noopener"
                >
                  DayOneCitizen.com
                </a>{' '}
                has a plain-English guide for your first 30 days in the &apos;Verse.
              </p>
            </section>
          </div>
        </section>

        {/* REFERRAL BONUS — URGENCY */}
        <section id="referral-bonus" className="container-narrow py-20 sm:py-28">
          <div className="rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/10 via-blackMid to-spaceBlack p-8 sm:p-12">
            {bonusOverride ? (
              /* Gear pack active: heading full-width → 2-col (action | image) → warning full-width */
              <>
                <div className="mb-8">
                  <span className="eyebrow">The Referral Bonus</span>
                  <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                    50,000 UEC + Drake Gear Pack — only if you use a code{' '}
                    <span className="text-orange">at signup</span>.
                  </h2>
                  <div className="mt-4 rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
                    <strong className="text-yellow-300">Limited offer through May 27:</strong> New accounts created with a referral code also receive a free Drake DefenseCon Gear Pack. After May 27, only the standard 50,000 UEC applies.
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div>
                    <p className="text-white/85">
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
                    <p className="text-muted text-sm mt-3">
                      Want the full referral code details?{' '}
                      <a
                        href="https://screferralreward.com"
                        className="text-orange underline hover:text-orange-dark"
                        target="_blank"
                        rel="noopener"
                      >
                        screferralreward.com
                      </a>{' '}
                      has everything you need.
                    </p>
                  </div>

                  <LightboxImage
                    src="/images/defensecon-2956.webp"
                    alt="Drake DefenseCon 2956 Gear Pack — limited signup bonus through May 27"
                    width={800}
                    height={450}
                    containerClassName="block rounded-xl border-4 border-yellow-400 shadow-[0_0_28px_rgba(250,204,21,0.4)]"
                    className="w-full h-auto"
                  />
                </div>

                <div className="mt-8 rounded-xl border border-orange bg-orange/15 p-6 sm:p-8">
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
              </>
            ) : (
              /* Default: 2-col (text + warning) */
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
                  <p className="text-muted text-sm mt-3">
                    Want the full referral code details?{' '}
                    <a
                      href="https://screferralreward.com"
                      className="text-orange underline hover:text-orange-dark"
                      target="_blank"
                      rel="noopener"
                    >
                      screferralreward.com
                    </a>{' '}
                    has everything you need.
                  </p>
                </div>

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
            )}
          </div>
        </section>

        {/* FEATURED EVENT CARD */}
        <section className="container-narrow pb-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">
                {status.state === 'ACTIVE'
                  ? 'Right Now'
                  : status.state === 'CANCELLED_FREE_FLY'
                    ? 'Free Fly Cancelled'
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
                  : status.state === 'CANCELLED_FREE_FLY'
                    ? 'CANCELLED_FREE_FLY'
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
              New to SC? Visit dayonecitizen.com →
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD: Event schema for the active, cancelled, or upcoming event */}
      {(status.state === 'ACTIVE' || status.state === 'CANCELLED_FREE_FLY' || status.state === 'UPCOMING') && (
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
                status.state === 'CANCELLED_FREE_FLY'
                  ? 'https://schema.org/EventMovedOnline'
                  : 'https://schema.org/EventScheduled',
              location: {
                '@type': 'VirtualLocation',
                url: REFERRAL_URL,
              },
              description: `${status.event.name} — ${
                status.state === 'CANCELLED_FREE_FLY'
                  ? 'Free Fly access was cancelled by CIG due to performance issues. New players can still sign up for a free RSI account and claim 50,000 UEC with a referral code.'
                  : `Star Citizen Free Fly event. ${status.event.notes ?? ''}`
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
      {/* JSON-LD: FAQPage — surfaces FAQ accordion in Bing rich results */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a Star Citizen Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Star Citizen Free Fly event is a limited-time period — typically 10 days — when Cloud Imperium Games opens Star Citizen to everyone at no cost. No purchase is required: you create a free RSI account, download the launcher, and play. Free Fly events run roughly twice a year: Invictus Launch Week (or DefenseCon) in May and the Intergalactic Aerospace Expo (IAE) in November.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get the 50,000 UEC referral bonus during Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'During signup on robertsspaceindustries.com, paste a referral code into the Referral Code field on the account creation form. Using code STAR-GCQJ-N6NC will credit your new account with 50,000 UEC — Star Citizen\'s in-game currency — the moment you log in. The code must be entered at or within 24 hours of signup; it cannot be added later.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I still get the 50,000 UEC bonus if there is no active Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The 50,000 UEC referral bonus is awarded when you create a free RSI account using a referral code — regardless of whether a Free Fly event is active. Creating the account now locks in your bonus before the next Free Fly opens.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the next Star Citizen Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Star Citizen Free Fly events follow a predictable annual pattern: a military-themed event (Invictus Launch Week or DefenseCon) in May, and the Intergalactic Aerospace Expo (IAE) in November. Check the freeflyevent.com homepage for the current event status, countdown timer, and announced dates.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I keep progress after a Free Fly event ends?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your RSI account and any UEC you earned persist after the Free Fly ends. In-game assets acquired with loaner ships are returned, but your account, referral bonus UEC, and any purchases made during the event remain. If you buy a Game Package during Free Fly, all progress carries over seamlessly.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
