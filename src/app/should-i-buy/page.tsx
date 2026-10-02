import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { LightboxImage } from '@/components/LightboxImage';
import { PageBackdrop } from '@/components/PageBackdrop';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Should I Buy Star Citizen? An Honest Answer (2026)',
  description:
    'Try Star Citizen free during a Free Fly event before you buy: an honest breakdown of the pros, cons, alpha state, prices, and who it\'s really for.',
  alternates: { canonical: '/should-i-buy' },
  keywords: [
    'should I buy Star Citizen',
    'is Star Citizen worth it 2026',
    'Star Citizen review 2026',
    'Star Citizen starter pack',
    'Star Citizen free fly worth buying',
    'Star Citizen alpha worth it',
  ],
  openGraph: {
    images: ['/images/og-image.png'],
    title: 'Should I Buy Star Citizen? An Honest Answer',
    description:
      'Try Star Citizen free during a Free Fly event before you buy: an honest breakdown of the pros, cons, alpha state, prices, and who it\'s really for.',
  },
};


const faqs = [
  {
    q: 'Is Star Citizen free to play?',
    a: 'No. Star Citizen requires a Game Package purchase (from $45 on sale — $60 list price, as of September 2026). However, CIG runs periodic Free Fly events several times a year where anyone can play for free for a limited window — usually one to two weeks. These are the best way to try the game before buying.',
  },
  {
    q: 'Should I buy Star Citizen during a Free Fly event?',
    a: 'Only if you have played it and liked it. Play for about 20 hours first. If you had a good time, buy a starter Game Package. If Free Fly left you cold, do not buy: the paid game is the same game, minus the event ships. If you have not played yet, wait for the next Free Fly.',
  },
  {
    q: 'Is Star Citizen fully released or still in early access?',
    a: 'Star Citizen is in Alpha (the Alpha 4.x era as of 2026). It is not fully released and does not have a confirmed full-release date. The game is actively playable and receives regular updates, but it is incomplete software with known bugs and missing systems. Squadron 42, the single-player campaign, is in late development and also not yet released.',
  },
  {
    q: 'Do I lose my ships and progress if there is a wipe?',
    a: 'Ships you purchased with real money (pledged ships) are never wiped — they are permanently on your account. In-game currency (aUEC), some earned items, and reputation progress can be wiped during major patch updates. Wipes are announced in advance and are a normal part of alpha development.',
  },
];

export default function ShouldIBuyPage() {
  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />
      <PageBackdrop seed={15} />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Free Fly decision</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            Should I Buy Star Citizen?
          </h1>
          <p className="mt-5 text-lg text-muted">
            Playing Free Fly now, or about to? Buy only after you&apos;ve tried it.
            If you enjoyed your Free Fly, a starter Game Package from $45 on sale ($60 list,
            as of September 2026) is worth it: one-time purchase, no subscription, and every
            future update included. If you haven&apos;t played yet, wait for the next Free Fly
            before spending anything. Star Citizen is a genuinely unfinished alpha with real bugs.
          </p>

          {/* Quick verdict */}
          <div className="mt-10 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <h2 className="heading-display text-xl text-white">The quick answer</h2>
            <p className="mt-3 text-white/85">
              <strong className="text-orange">If you had a good time during Free Fly</strong> — buy
              a starter package. Don&apos;t overspend — the $45-on-sale Citizen Starter or $60
              Generalist pack is all you need to start. Give it 20 hours before judging it against finished games.
            </p>
            <p className="mt-3 text-white/85">
              <strong className="text-orange">If Free Fly left you cold</strong> — don&apos;t buy.
              The paid game is the same game, minus the event ships. Nothing has changed
              about whether it clicks for you.
            </p>
            <p className="mt-3 text-white/85">
              <strong className="text-orange">If you weren&apos;t sure</strong> — wait for the
              next Free Fly. IAE in November is coming, and it&apos;s usually the bigger of
              the two annual events.
            </p>
          </div>

          {/* Event-window checklist */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Using the Free Fly window to decide
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                ['Play first, then decide', 'Give it about 20 hours before judging it against finished games. Free Fly is the only free way to find out if it clicks for you.'],
                ['Test your PC for free', 'Star Citizen is demanding. A bad run on weak hardware says little about the game. 32 GB of RAM and an NVMe SSD are recommended; check the official specs on robertsspaceindustries.com.'],
                ['Expect rough edges', 'It is an alpha. Crashes and broken missions happen. If that bothers you, that is your answer.'],
                ['Buy a starter pack, nothing bigger', 'The Citizen or Generalist starter pack is all you need. Other ships can be rented in-game with UEC (the in-game currency).'],
                ['Use a referral code at signup', 'Enter it when you create the account, or within 24 hours. It cannot be added later. It is the one deadline that matters.'],
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

          {/* Handoff to the full answer */}
          <section className="mt-14 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <span className="eyebrow">The full answer</span>
            <p className="mt-3 text-lg text-white/90">
              The full answer — what&apos;s in a package, wipes, PC requirements — is in the{' '}
              <a
                href="https://dayonecitizen.com/day-one-citizen/worth-buying"
                className="font-semibold text-orange underline hover:text-orange-dark"
                target="_blank"
                rel="noopener"
              >
                Day One Citizen guide
              </a>
              .
            </p>
          </section>

          {/* Short summary of the evergreen points */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The short version of the rest
            </h2>
            <ul className="mt-5 space-y-2 text-muted">
              {[
                'A Game Package gives you a starter ship and access to the live game. There is no subscription. Squadron 42, the single-player campaign, is not in every package, so check before you buy.',
                'Star Citizen is an alpha. CIG has no confirmed full-release date, so buy for what the game is today.',
                'Ships and packages bought with real money are never wiped. In-game aUEC and some progress can reset in major updates.',
                'It needs a strong PC. Check the official specs before you buy.',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-orange flex-shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Try before you buy — the spine */}
          <section className="mt-14 rounded-2xl border border-orange/30 bg-orange/5 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">
              Haven&apos;t played yet? Don&apos;t buy — try it free first
            </h2>
            <p className="mt-4 text-white/80">
              CIG opens the full game to everyone several times a year during{' '}
              <strong className="text-white">Free Fly events</strong> — typically a May
              flagship event (DefenseCon in 2026), Foundation Festival in mid-year, and
              IAE (November). For the event
              window, usually one to two weeks, you can create a free RSI account, download
              the game, and play the full Persistent Universe at no cost. No purchase, no
              credit card.
            </p>
            <p className="mt-3 text-white/80">
              You&apos;re often given loaner ships larger or more capable than the usual
              starters, so a Free Fly is as close as this game gets to a real demo. It is
              the single best way to answer this page&apos;s question for yourself before
              spending a dollar.
            </p>
            <div className="mt-6">
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
            </div>
          </section>

          {/* Pricing */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Starter pack prices
            </h2>
            <p className="mt-4 text-muted">
              Buy a starter package and stop there. The most common regret in the Star Citizen
              community is buying a large ship too early. Prices below are as of September 2026.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Citizen Starter Pack', '$45 on sale ($60 list)', 'The most affordable entry point. A capable starter ship that gets you into the Persistent Universe without overcommitting.'],
                    ['Generalist Starter Pack', '$60', 'A solid all-rounder for exploring multiple gameplay styles before specializing.'],
                    ['Role-specific packs (Miner, Duelist, Salvager, Hauler, Outsider, Privateer)', '$75–$125', 'Ships built for one activity. Only pick one if you already have a clear playstyle in mind.'],
                  ].map(([name, price, bestFor]) => (
                    <tr key={name as string} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 font-semibold text-white">{name}</td>
                      <td className="px-4 py-3 text-orange">{price}</td>
                      <td className="px-4 py-3 text-muted">{bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure className="mt-6">
              <LightboxImage
                src="/images/guides/getting-started-game-package-starter-packs-list.jpg"
                alt="RSI Getting Started page listing the current Star Citizen starter Game Packages with prices"
                width={1200}
                height={561}
                containerClassName="block overflow-hidden rounded-xl border border-white/10"
                className="w-full h-auto"
              />
              <figcaption className="mt-2 text-xs text-muted">
                The starter Game Package list on RSI&apos;s Getting Started page —
                this is the screen you&apos;ll see at checkout. Stick to the
                starter tier.
              </figcaption>
            </figure>
            <p className="mt-4 text-xs text-muted">
              Prices vary by sale. CIG runs sales around Invictus and IAE. Never pay above
              these ranges for a starter.{' '}
              <a
                href="https://dayonecitizen.com/day-one-citizen/starter-package"
                className="text-orange underline hover:text-orange-dark"
                target="_blank"
                rel="noopener"
              >
                dayonecitizen.com&apos;s starter package guide
              </a>{' '}
              compares the starter packs in plain English.
            </p>
          </section>

          {/* The referral section — earned, not pushed */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">
              One thing to do before you click buy
            </h2>
            <p className="mt-4 text-white/80">
              If you&apos;ve decided to buy, there&apos;s one step that costs nothing and
              gives you real value: use a referral code when you create your account.
            </p>
            <p className="mt-3 text-white/80">
              Paste{' '}
              <span className="font-mono font-bold text-orange">{REFERRAL_CODE}</span> into
              the <strong>Referral Code</strong> field on the RSI signup form. Your account
              gets credited with{' '}
              <strong className="text-white">50,000 UEC</strong> — in-game currency worth roughly
              $5 — the moment you log in. It&apos;s available even for free accounts; you
              don&apos;t need to buy anything to claim it.
            </p>
            <div className="mt-4 rounded-lg border border-orange/30 bg-spaceBlack/60 p-3 text-xs text-muted">
              ⚠️ The code must be entered at signup or within 24 hours. It cannot be
              added after that window — no support ticket can override it.
            </div>
            <div className="mt-6">
              <CTAButton
                size="lg"
                trackingLabel="should-i-buy-referral"
                variants={{
                  a: 'Play Free — Claim Your 50,000 UEC Bonus',
                  b: 'Create Your Account — Claim 50,000 UEC',
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

          {/* Final CTA area */}
          <section className="mt-14 text-center">
            <p className="text-muted">Still on the fence?</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
              <Link href={`${HUB_URL}`} target="_blank" rel="noopener" className="btn-secondary">
                New player guides at dayonecitizen.com →
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Weighing Star Citizen against the rest of the genre first?{' '}
              <a
                href="https://bestspacesim.com/is-star-citizen-worth-it"
                className="text-orange underline hover:text-orange-dark"
              >
                bestspacesim.com&apos;s honest worth-it verdict
              </a>{' '}
              scores it against Elite Dangerous, No Man&apos;s Sky, and more.
            </p>
          </section>

        </div>
      </main>

      <PageSources route="/should-i-buy" />

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
              { '@type': 'ListItem', position: 2, name: 'Should I Buy?', item: 'https://freeflyevent.com/should-i-buy' },
            ],
          }),
        }}
      />
    </>
  );
}
