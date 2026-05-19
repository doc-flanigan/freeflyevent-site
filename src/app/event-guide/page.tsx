import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Your First Free Fly — A Complete Beginner\'s Guide',
  description:
    'Step-by-step guide for new players: sign up, claim your 50,000 UEC referral bonus, download the launcher, and what to do during your first Star Citizen Free Fly event.',
  alternates: { canonical: '/event-guide' },
  openGraph: {
    title: 'Your First Free Fly — Beginner\'s Guide',
    description:
      'Sign up, claim 50,000 UEC, download, and what to do first during a Star Citizen Free Fly.',
  },
};

type Step = {
  num: string;
  title: string;
  body: React.ReactNode;
  tip?: React.ReactNode;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Make a free RSI account',
    body: (
      <>
        Go to robertsspaceindustries.com and click <em>Enlist Now</em>. Use a
        real email — your account is permanent and your in-game progress is
        tied to it.
      </>
    ),
    tip: (
      <>
        Paste{' '}
        <code className="rounded bg-spaceBlack/60 px-1.5 py-0.5 font-mono text-orange">
          {REFERRAL_CODE}
        </code>{' '}
        into the <strong>Referral Code</strong> field on the signup form. This
        is the only reliable way to lock in your 50,000 UEC bonus.
        <p className="text-muted text-sm mt-4">
          Once you&apos;re signed up,{' '}
          <a
            href="https://dayonecitizen.com"
            className="text-orange underline hover:text-orange-dark"
            target="_blank"
            rel="noopener"
          >
            DayOneCitizen.com
          </a>{' '}
          will walk you through your first 30 days step by step.
        </p>
      </>
    ),
  },
  {
    num: '02',
    title: 'Confirm the bonus posted',
    body: (
      <>
        After verifying your email, log into your RSI dashboard. The 50,000 UEC
        will appear as a credit on your account. If it didn&apos;t, you have
        ~24 hours to add the code in account settings — but don&apos;t rely on
        it.
      </>
    ),
  },
  {
    num: '03',
    title: 'Download the RSI Launcher',
    body: (
      <>
        From your account dashboard, download the launcher. It installs the
        Star Citizen client (~100 GB). Start the download immediately —
        you&apos;ll spend the wait reading the rest of this guide.
      </>
    ),
    tip: 'Pre-launch on event day: log in once an hour or two before the event opens. Patches drop on day one and the launcher always queues.',
  },
  {
    num: '04',
    title: 'Pick a ship from the Free Fly roster',
    body: (
      <>
        During the event, several ships are temporarily unlocked for everyone.
        Featured ships rotate event to event — DefenseCon (formerly Invictus
        Launch Week) spotlights military ships, IAE rotates 100+ ships through
        the event. Check the homepage for the current roster.
      </>
    ),
  },
  {
    num: '05',
    title: 'Run the new-player tutorial',
    body: (
      <>
        Spawn at your starting station, follow the tutorial markers, and learn
        flight, quantum travel, and ship combat fundamentals. About 30–45
        minutes. Skip it and you&apos;ll be lost.
      </>
    ),
  },
  {
    num: '06',
    title: 'Try a delivery mission',
    body: (
      <>
        Open the contracts terminal at any station and pick a delivery
        mission. Pick up boxes on one moon, deliver to another. You&apos;ll
        learn quantum jumps, planetary landing, and basic UI flow — and
        you&apos;ll get paid.
      </>
    ),
  },
  {
    num: '07',
    title: 'Visit a major planet',
    body: (
      <>
        Microtech is snow and dense forests. ArcCorp is a planet-spanning
        city. Crusader is a gas giant with floating platforms. Hurston is
        industrial. Each is enormous; pick one and quantum-jump there.
      </>
    ),
  },
  {
    num: '08',
    title: 'Group up',
    body: (
      <>
        Star Citizen is at its best with friends. Use Spectrum (in-game chat)
        or join a Star Citizen Discord. Multi-crew ships need crews — that&apos;s
        the magic of the game.
      </>
    ),
  },
  {
    num: '09',
    title: 'Decide before the event ends',
    body: (
      <>
        If you&apos;re hooked, grab a Game Package while you&apos;re still
        inside the event window — your progress, hangar items, and referral
        bonus carry over to a paid account seamlessly.
      </>
    ),
  },
];

export default function EventGuidePage() {
  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main>
        <section className="container-narrow py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Beginner&apos;s Guide</span>
            <h1 className="heading-display mt-4 text-4xl sm:text-6xl">
              Your First Free Fly
            </h1>
            <p className="mt-5 text-lg text-muted">
              A complete, no-jargon walkthrough for first-time Star Citizen
              players. Follow it in order — each step assumes you finished the
              previous one.
            </p>
          </div>
        </section>

        <section className="container-narrow pb-20">
          <ol className="space-y-5">
            {STEPS.map((s) => (
              <li key={s.num} className="card flex gap-5 sm:gap-7">
                <div className="flex-shrink-0">
                  <span className="font-display text-2xl font-bold tracking-tight text-orange/70">
                    {s.num}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {s.title}
                  </h2>
                  <div className="mt-2 text-white/85">{s.body}</div>
                  {s.tip && (
                    <div className="mt-4 rounded-md border-l-2 border-orange bg-orange/5 px-4 py-3 text-sm text-white/85">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                        Tip
                      </span>
                      {s.tip}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="container-narrow pb-24">
          <div className="rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <span className="eyebrow">Need a Glossary?</span>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              Confused by terms like <em>UEC, pledge, aUEC, AC?</em>
            </h2>
            <p className="mt-3 text-muted">
              We keep the plain-English glossary on the main hub. Free Fly is
              packed with acronyms — when you hit one you don&apos;t know,
              dayonecitizen.com has the answer.
            </p>
            <Link
              href={HUB_URL}
              target="_blank"
              rel="noopener"
              className="btn-secondary mt-6"
            >
              Open the dayonecitizen.com Glossary →
            </Link>
          </div>
        </section>

        <section className="container-narrow pb-24 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl">
            Ready? Take 90 seconds and create your account.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Even if the event hasn&apos;t started yet — your referral bonus
            locks in the moment you sign up.
          </p>
          <div className="mt-8">
            <CTAButton size="lg" />
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Free Fly Events',
                item: 'https://freeflyevent.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Event Guide',
                item: 'https://freeflyevent.com/event-guide',
              },
            ],
          }),
        }}
      />
    </>
  );
}
