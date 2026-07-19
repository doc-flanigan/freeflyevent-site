import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Is Star Citizen Free? Free Fly Explained',
  description:
    'Star Citizen is not free-to-play — but Free Fly events let you play free. The difference, what a free account gets, and when you can play.',
  alternates: { canonical: '/is-star-citizen-free' },
  keywords: [
    'is star citizen free',
    'is star citizen free to play',
    'can you play star citizen for free',
    'how to play star citizen for free',
    'star citizen free to play 2026',
    'is star citizen free on steam',
    'star citizen free account',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'Is Star Citizen Free? Free-to-Play vs Free Fly',
    description:
      'No, Star Citizen is not free-to-play — but you can play it free during Free Fly events. Here\'s the honest breakdown.',
  },
};

const faqs = [
  {
    q: 'Is Star Citizen free?',
    a: 'No. Star Citizen is a paid game — playing whenever you want requires a one-time Game Package purchase starting around $45 USD. There is no monthly subscription. However, you can play the full game for free during official Free Fly events, which Cloud Imperium runs several times a year.',
  },
  {
    q: 'When can I play Star Citizen for free?',
    a: 'During official Free Fly events, which run several times a year for roughly two weeks each. The most reliable windows are Invictus Launch Week in May and the Intergalactic Aerospace Expo (IAE) in November. Recent examples: DefenseCon 2956 (May 14-27, 2026), IAE 2955 (Nov 20-Dec 3, 2025), and Invictus Launch Week 2955 (May 15-27, 2025).',
  },
  {
    q: 'Do I need to buy anything during a Free Fly?',
    a: 'No. Free Fly events are official Cloud Imperium events, free for anyone with a free RSI account — no purchase needed. You create a free account, download the game, and play for the full event window.',
  },
  {
    q: 'Does my Free Fly progress carry over?',
    a: 'Your free RSI account is permanent, so everything tied to the account — your username and the 50,000 UEC referral bonus claimed at signup — stays with you. If you later buy a Game Package, you keep playing on that same account rather than starting over with a new one.',
  },
  {
    q: 'Is Star Citizen free on Steam?',
    a: 'Star Citizen is not on Steam at all. It is only available through the official Roberts Space Industries site (robertsspaceindustries.com). Any "Star Citizen on Steam" listing is not legitimate.',
  },
  {
    q: 'Will Star Citizen ever be free-to-play?',
    a: 'Cloud Imperium has not announced permanent free-to-play. The recurring Free Fly events are the official way to try it for free, and that model has been in place for years.',
  },
  {
    q: 'Do you have to pay monthly for Star Citizen?',
    a: 'No. Star Citizen has no subscription. A Game Package is a one-time purchase, and all future content updates are included at no extra cost.',
  },
];

export default function IsStarCitizenFreePage() {
  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Straight answer</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            Is Star Citizen Free?
          </h1>

          {/* TL;DR direct answer */}
          <div className="mt-8 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <p className="text-lg text-white/90">
              Star Citizen is <strong className="text-white">a paid game, not free-to-play</strong> —
              playing year-round requires a one-time{' '}
              <strong className="text-white">~$45 Game Package</strong> purchase. But Cloud
              Imperium runs several official{' '}
              <Link href="/" className="text-orange underline-offset-2 hover:underline">Free Fly events</Link>{' '}
              each year, when <strong className="text-white">anyone can play the full game for
              free</strong> with nothing but a free RSI account — no purchase needed. Check{' '}
              <Link href="/next-free-fly" className="text-orange underline-offset-2 hover:underline">
                when the next Free Fly is
              </Link>{' '}
              to find your next free window.
            </p>
          </div>

          <p className="mt-4 text-xs text-muted">
            Page reviewed July 18, 2026 — pricing and Free Fly details below are
            checked against official Cloud Imperium announcements.
          </p>

          {/* Free-to-play vs Free Fly */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              &ldquo;Free-to-play&rdquo; vs &ldquo;Free Fly&rdquo; — the confusion explained
            </h2>
            <p className="mt-4 text-muted">
              Most of the confusion comes from two similar-sounding terms that mean very
              different things:
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Term</th>
                    <th className="px-4 py-3">What it means for Star Citizen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-semibold text-white">Free-to-play</td>
                    <td className="px-4 py-3 text-muted">
                      A game that is permanently free to download and play (Fortnite, Warframe).{' '}
                      <strong className="text-white">Star Citizen is NOT this.</strong>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-semibold text-white">Free Fly</td>
                    <td className="px-4 py-3 text-muted">
                      Official limited-time events (a few times a year) when{' '}
                      <strong className="text-white">anyone can play the full game for free</strong>{' '}
                      for ~10 days. This is how you legitimately play at no cost.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* What the three tiers are */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Free account, Free Fly, or Game Package?
            </h2>
            <p className="mt-4 text-muted">
              There are three things people mix up. Here is exactly what each one gives you:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ['Free RSI account', 'Free forever. Lets you reserve a username, claim a 50,000 UEC referral bonus, and download the launcher — but you cannot launch into the game without either a Game Package or an active Free Fly event.'],
                ['Free Fly event', 'A limited window (~10 days, several times a year) when your free account can play the entire live game at no cost. No purchase required. This is the answer to "how do I play Star Citizen for free."'],
                ['Game Package (~$45+)', 'A one-time purchase that lets you play any time, keeps a starter ship, and includes all future updates. No subscription, no DLC.'],
              ].map(([title, desc]) => (
                <li key={title as string} className="flex gap-4 rounded-xl border border-white/10 bg-blackMid/60 p-5">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" aria-hidden />
                  <div>
                    <strong className="text-white">{title}</strong>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* When can you play free — verified recent windows */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              When can you play Star Citizen for free?
            </h2>
            <p className="mt-4 text-muted">
              Free Fly events are official Cloud Imperium events, announced on the RSI
              Comm-Link. They typically run about two weeks, and the two most reliable
              windows each year are <strong className="text-white">Invictus Launch Week in May</strong>{' '}
              and the <strong className="text-white">Intergalactic Aerospace Expo (IAE) in November</strong>.
              Recent Free Fly windows:
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Free Fly window</th>
                    <th className="px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['DefenseCon 2956', 'May 14 – 27, 2026', 'https://robertsspaceindustries.com/en/comm-link/transmission/21147-DefenseCon-2956-About'],
                    ['Intergalactic Aerospace Expo 2955', 'Nov 20 – Dec 3, 2025', 'https://robertsspaceindustries.com/en/comm-link/transmission/20861-Intergalactic-Aerospace-Expo-2955-Free-Fly-And-Manufacturer-Schedule'],
                    ['Invictus Launch Week 2955', 'May 15 – 27, 2025', 'https://robertsspaceindustries.com/en/comm-link/transmission/20491-About-Invictus-Launch-Week-2955'],
                  ].map(([name, dates, source]) => (
                    <tr key={name} className="border-b border-white/5">
                      <td className="px-4 py-3 font-semibold text-white">{name}</td>
                      <td className="px-4 py-3 text-muted">{dates}</td>
                      <td className="px-4 py-3">
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener"
                          className="text-orange underline-offset-2 hover:underline"
                        >
                          Official announcement
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-muted">
              To find the current window, see{' '}
              <Link href="/next-free-fly" className="text-orange underline-offset-2 hover:underline">
                when the next Star Citizen Free Fly is
              </Link>
              . And if a Free Fly is live right now, our{' '}
              <Link href="/event-guide" className="text-orange underline-offset-2 hover:underline">
                Free Fly event guide
              </Link>{' '}
              walks you from free account to first takeoff, step by step.
            </p>
          </section>

          {/* Myth-busting */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              &ldquo;Free Star Citizen download&rdquo; results are usually wrong
            </h2>
            <p className="mt-4 text-muted">
              If a search result promises a permanent free copy, a Steam download, or a
              &ldquo;free key,&rdquo; treat it as a red flag. The only legitimate ways to
              play Star Citizen for free are:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {[
                'During an official Free Fly event on robertsspaceindustries.com',
                'There is no Steam version, no free permanent copy, and no legitimate free key',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Referral bonus — earned mention */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">
              Free, but with a free 50,000 UEC head start
            </h2>
            <p className="mt-4 text-white/80">
              Whether you&apos;re joining for a Free Fly or buying in, paste a referral code
              into the <strong>Referral Code</strong> field when you create your account.
              Your account is credited with{' '}
              <strong className="text-white">50,000 UEC</strong> — permanent in-game
              currency — at no cost. It works on free accounts too.
            </p>
            <p className="mt-3 text-white/80">
              Use{' '}
              <span className="font-mono font-bold text-orange">{REFERRAL_CODE}</span>{' '}
              at signup.
            </p>
            <div className="mt-4 rounded-lg border border-orange/30 bg-spaceBlack/60 p-3 text-xs text-muted">
              ⚠️ The code must be entered at signup or within 24 hours — it cannot be added later.
            </div>
            <div className="mt-6">
              <CTAButton
                size="lg"
                trackingLabel="is-free-referral"
                variants={{
                  a: 'Play Free — Claim Your 50,000 UEC Bonus',
                  b: 'Start Free — 50,000 UEC Bonus Included',
                }}
              />
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
            <p className="text-muted">Next steps</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
              <Link href="/should-i-buy" className="btn-secondary">
                Should I buy it? →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/is-star-citizen-free" />

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
              { '@type': 'ListItem', position: 2, name: 'Is Star Citizen Free?', item: 'https://freeflyevent.com/is-star-citizen-free' },
            ],
          }),
        }}
      />
    </>
  );
}
