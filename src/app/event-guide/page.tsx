import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Star Citizen Free Fly Event Guide — What to Do First',
  description:
    'Step-by-step guide for new players: sign up, claim your 50,000 UEC referral bonus, download the launcher, and what to do during your first Star Citizen Free Fly event.',
  alternates: { canonical: '/event-guide' },
  openGraph: {
    title: 'Star Citizen Free Fly Event Guide — What to Do First',
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
      {/* HowTo schema — AI surfaces step-by-step results for "how to play Star Citizen free fly" */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Play Star Citizen During a Free Fly Event',
            description:
              'A step-by-step guide for new players joining a Star Citizen Free Fly event — from creating an RSI account and claiming a 50,000 UEC referral bonus, to downloading the game and completing your first missions.',
            totalTime: 'PT90M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Make a free RSI account',
                text: 'Go to robertsspaceindustries.com and click Enlist Now. Use a real email — your account is permanent and your in-game progress is tied to it. Paste referral code STAR-GCQJ-N6NC into the Referral Code field on the signup form. This is the only reliable way to lock in your 50,000 UEC bonus.',
                url: 'https://freeflyevent.com/event-guide#step-01',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Confirm the referral bonus posted',
                text: 'After verifying your email, log into your RSI dashboard. The 50,000 UEC will appear as a credit on your account. If it did not appear, you have approximately 24 hours to add the code in account settings — but do not rely on this grace period.',
                url: 'https://freeflyevent.com/event-guide#step-02',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Download the RSI Launcher',
                text: 'From your account dashboard, download the launcher. It installs the Star Citizen client (approximately 100 GB). Start the download immediately. Log in an hour or two before the event opens on launch day — patches drop on day one and the launcher always queues.',
                url: 'https://freeflyevent.com/event-guide#step-03',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Pick a ship from the Free Fly roster',
                text: 'During the event, several ships are temporarily unlocked for everyone. Featured ships rotate event to event — DefenseCon spotlights military vessels, and the IAE rotates 100+ ships. Check the freeflyevent.com homepage for the current roster.',
                url: 'https://freeflyevent.com/event-guide#step-04',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Run the new-player tutorial',
                text: 'Spawn at your starting station, follow the tutorial markers, and learn flight, quantum travel, and ship combat fundamentals. Takes about 30 to 45 minutes. Skipping it will leave you lost.',
                url: 'https://freeflyevent.com/event-guide#step-05',
              },
              {
                '@type': 'HowToStep',
                position: 6,
                name: 'Try a delivery mission',
                text: 'Open the contracts terminal at any station and pick a delivery mission. Pick up cargo on one moon, deliver to another. You will learn quantum jumps, planetary landing, and basic UI flow — and earn aUEC in the process.',
                url: 'https://freeflyevent.com/event-guide#step-06',
              },
              {
                '@type': 'HowToStep',
                position: 7,
                name: 'Visit a major planet',
                text: 'Microtech is snow and dense forests. ArcCorp is a planet-spanning city. Crusader is a gas giant with floating platforms. Hurston is industrial. Each is enormous — pick one and quantum-jump there.',
                url: 'https://freeflyevent.com/event-guide#step-07',
              },
              {
                '@type': 'HowToStep',
                position: 8,
                name: 'Group up with other players',
                text: 'Star Citizen is at its best with friends. Use Spectrum (in-game chat) or join a Star Citizen Discord server. Multi-crew ships need crews — that is the core experience of the game.',
                url: 'https://freeflyevent.com/event-guide#step-08',
              },
              {
                '@type': 'HowToStep',
                position: 9,
                name: 'Decide before the event ends',
                text: 'If you are hooked, grab a Game Package while you are still inside the event window. Your progress, hangar items, and referral bonus UEC carry over to a paid account seamlessly.',
                url: 'https://freeflyevent.com/event-guide#step-09',
              },
            ],
          }),
        }}
      />
      {/* FAQPage schema — AI cites individual Q&A pairs for beginner questions */}
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
                name: 'How do I sign up for a Star Citizen Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Go to robertsspaceindustries.com and click Enlist Now to create a free account. No purchase is required to play during a Free Fly. When you sign up, paste referral code STAR-GCQJ-N6NC into the Referral Code field to claim 50,000 UEC at no cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'How big is the Star Citizen download?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Star Citizen game client is approximately 100 GB. Download the RSI Launcher from your account dashboard — it manages the installation. On a 100 Mbps connection expect 2 to 3 hours; on gigabit fiber around 15 to 20 minutes. Start the download as soon as you sign up — patches also release during event week and add to the queue.',
                },
              },
              {
                '@type': 'Question',
                name: 'What ships can I fly during a Star Citizen Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each Free Fly event unlocks a rotating selection of ships for all players at no cost. DefenseCon (May) highlights military vessels from the UEE Navy. The Intergalactic Aerospace Expo (IAE) in November rotates through 100+ ships across all manufacturers over the event duration. Check the freeflyevent.com homepage for the current event\'s ship lineup.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I add a referral code after signing up for Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RSI offers a grace period of approximately 24 hours to add a referral code via account settings after signup. However, this is unreliable — the only guaranteed method is entering code STAR-GCQJ-N6NC in the Referral Code field on the signup form itself. After 24 hours, the code cannot be added and the 50,000 UEC bonus is forfeited permanently with no support override.',
                },
              },
              {
                '@type': 'Question',
                name: 'What should I do first in Star Citizen during a Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Run the new-player tutorial at your starting station immediately after logging in. It covers flight, quantum travel, and combat basics in about 30 to 45 minutes. Then take a delivery mission from the contracts terminal to learn quantum jumps and planetary landing. After that, explore one of the major planets: Microtech, ArcCorp, Crusader, or Hurston.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best starter ship during a Star Citizen Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For a solo new player the Avenger Titan is the most recommended ship during Free Fly — it is fast, easy to fly, has a small cargo hold, and handles both combat and delivery missions well. For seeing large capital ships, join an experienced player\'s crew rather than attempting to fly a multi-crew vessel solo.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I launch Star Citizen for the first time during Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Open the RSI Launcher after installing it from your account dashboard. Click INSTALL for Star Citizen and wait for the ~100 GB download to complete. Then click LAUNCH. The first launch may require an additional day-one patch. Log in with your RSI account credentials and you will spawn at the Welcome Hub.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is quantum travel in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Quantum travel is Star Citizen\'s faster-than-light system for covering large distances between planets, moons, and stations within a star system. To quantum jump: press F2 to open your star map and select a destination, then hold B to spool your quantum drive, and hold B again to confirm the jump. Travel times range from a few seconds to several minutes depending on distance.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I join a friend\'s ship in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Add your friend as a contact in-game, then ask them to invite you to their party via the Social menu. Once in the same party, travel to the same location — your friend can invite you aboard their ship through the Crew menu. Alternatively, spawn at the same station by selecting it in your ASOP terminal to meet up before heading out.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I keep my progress after a Free Fly event ends?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your RSI account, referral bonus UEC, and in-game purchases persist after the Free Fly ends. Loaner ships provided for the event are returned, but your account, UEC balance, and any Game Package you purchased carry over seamlessly. Nothing is lost when the event window closes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Star Citizen Free Fly available in my country?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Star Citizen Free Fly events are available worldwide wherever robertsspaceindustries.com is accessible. There are no regional restrictions on account creation or gameplay. The RSI Launcher and game client are available globally, though server latency will vary depending on your location relative to CIG\'s data centers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need a credit card to sign up for Star Citizen Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Creating a free RSI account for a Free Fly event requires only an email address — no credit card or payment method. You only need to provide payment information if you choose to purchase a Game Package after trying the game. The 50,000 UEC referral bonus is also free and requires no purchase.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
