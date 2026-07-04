import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Should I Buy Star Citizen? An Honest Answer (2026)',
  description:
    'You just tried Star Citizen during Free Fly. Here\'s an honest, no-hype breakdown of what you actually get, what state the game is in, who it\'s for, and what it costs.',
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
    title: 'Should I Buy Star Citizen? An Honest Answer',
    description:
      'No hype, no pitch. What you get, what state the game is in, who loves it, and who should wait.',
  },
};

const faqs = [
  {
    q: 'Is Star Citizen free to play?',
    a: 'No. Star Citizen requires a Game Package purchase (from $45 for a starter pack). However, CIG runs periodic Free Fly events several times a year where anyone can play for free for a limited window — usually one to two weeks. These are the best way to try the game before buying.',
  },
  {
    q: 'Is Star Citizen fully released or still in early access?',
    a: 'Star Citizen is in Alpha (the Alpha 4.x era as of 2026). It is not fully released and does not have a confirmed full-release date. The game is actively playable and receives regular updates, but it is incomplete software with known bugs and missing systems. Squadron 42, the single-player campaign, is in late development and also not yet released.',
  },
  {
    q: 'Do I lose my ships and progress if there is a wipe?',
    a: 'Ships you purchased with real money (pledged ships) are never wiped — they are permanently on your account. In-game currency (aUEC), some earned items, and reputation progress can be wiped during major patch updates. Wipes are announced in advance and are a normal part of alpha development.',
  },
  {
    q: 'Can you earn ships in-game without spending real money?',
    a: 'Yes — you can rent ships in-game using aUEC (in-game currency earned through missions, trading, and other activities), and CIG has stated that all ships will eventually be earnable in-game at full release. In the current alpha, some ships can be bought outright with aUEC, while others are rent-only or pledge-only. The rental system lets you try many ships without spending real money.',
  },
  {
    q: 'Is Star Citizen pay-to-win?',
    a: 'This is debated in the community. Larger ships bought with real money do give an advantage in cargo capacity and capability. However, skill, teamwork, and knowledge of game systems matter significantly, starter ships can take on larger gameplay loops than you would expect, and the most effective PvP ships are not always the most expensive ones. CIG has stated that everything will be earnable in-game at full release. For a casual player it does not feel pay-to-win; for a competitive PvP player, the advantage of pledged ship variety is real.',
  },
  {
    q: 'What is the minimum PC spec to play Star Citizen?',
    a: 'For a playable experience in 2026: CPU — Ryzen 5 3600 or Intel i7-9700K or better; RAM — 32 GB (16 GB is the listed minimum but 32 GB is strongly recommended); Storage — NVMe SSD required, as HDDs produce extremely long load times; GPU — GTX 1080 Ti / RX 5700 XT or better for medium settings at 1080p. Check the official RSI minimum specs page for current requirements, as these are updated with major patches.',
  },
];

export default function ShouldIBuyPage() {
  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <span className="eyebrow">Honest take</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            Should I Buy Star Citizen?
          </h1>
          <p className="mt-5 text-lg text-muted">
            Buy Star Citizen only after you&apos;ve tried it free during a Free Fly event.
            If you enjoyed your free trial, a starter Game Package from $45 is worth it:
            one-time purchase, no subscription, and every future update included. If you
            haven&apos;t played yet, wait for the next Free Fly before spending anything —
            Star Citizen is one of the most ambitious games ever made, but it&apos;s a
            genuinely unfinished alpha with real bugs. Below: the unfiltered pros, cons,
            prices, and who it&apos;s actually for.
          </p>

          {/* Quick verdict */}
          <div className="mt-10 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <h2 className="heading-display text-xl text-white">The quick answer</h2>
            <p className="mt-3 text-white/85">
              <strong className="text-orange">If you had a good time during Free Fly</strong> — buy
              a starter package. Don&apos;t go above $60 — the $45 Citizen or $60 Generalist
              starter is all you need. Give it 20 hours before judging it against finished games.
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

          {/* What you actually get */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What a Game Package actually includes
            </h2>
            <p className="mt-4 text-muted">
              The minimum purchase is called a <strong className="text-white">Game Package</strong>.
              Starter packages run roughly $45–$65 USD. Here&apos;s what that gets you:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ['A starter ship', 'A flyable, capable solo ship — usable in-game, not just cosmetic. Any other ship in the game can be rented in-game with UEC — you don\'t need to buy additional ships.'],
                ['Access to everything in the live game', 'All star systems, all gameplay loops, all future patches. There is no DLC. Content that ships after you buy is included.'],
                ['3 months of insurance on your starter ship', 'Every starter pack includes 3-month insurance on the ship it comes with.'],
                ['No subscription', 'Star Citizen has no monthly fee. You pay once.'],
                ['1,000 aUEC — plus 50,000 UEC if you use a referral code', 'aUEC is the alpha test currency that wipes between patches. UEC is the permanent in-game currency that carries forward forever. Paste a referral code at signup and you receive 50,000 UEC on top of the starter aUEC — enough for rentals, gear, and ammo from day one.'],
                ['Squadron 42 — check your package', 'The single-player campaign is not included in every starter. Look for the "Squadron 42 combo" package if you want both. It\'s not required to play Star Citizen.'],
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
            <p className="mt-5 text-muted">
              One thing worth understanding before checkout: your purchase is not a typical
              one. CIG calls it a <strong className="text-white">pledge</strong>, because
              you&apos;re funding the ongoing development of an alpha game. In return you get
              access to the current alpha and all future updates to the base game — no
              subscription, no expansion paywalls.
            </p>
          </section>

          {/* State of the game */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The honest state of the game in 2026
            </h2>
            <p className="mt-4 text-muted">
              Star Citizen is in alpha. That word means something real here — not
              &ldquo;early access with a PR problem&rdquo; but a genuinely unfinished product
              with missing features and rough edges. That said:
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-orange/30 bg-orange/5 p-6">
                <h3 className="font-display text-base font-bold text-orange uppercase tracking-wide">What works well</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {[
                    'Two full star systems (Stanton + Pyro)',
                    'Seamless orbit-to-surface-to-interior travel — no loading screens',
                    'Space flight and ship combat',
                    'Mining, cargo trading, bounty hunting, salvage',
                    'On-foot FPS in stations and bunkers',
                    'Server meshing — the universe is technically persistent, and stability is the best it has ever been',
                    'Major patches roughly quarterly, with a public roadmap',
                    'It looks extraordinary',
                    'Multi-crew gameplay with friends',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-orange mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-blackMid/60 p-6">
                <h3 className="font-display text-base font-bold text-muted uppercase tracking-wide">What&apos;s still rough</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {[
                    'Crashes and server resets happen',
                    'Some missions are broken at any given patch',
                    'Performance varies significantly by hardware',
                    'The new-player experience has gaps',
                    'Some purchased ships are not yet flight ready',
                    'Long-term progression systems (housing, full economy, base building) are incomplete',
                    'Economy balance changes between patches',
                    'UI/UX is inconsistent across systems',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-muted mt-0.5">–</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-blackMid/60 p-6">
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                The timeline, honestly
              </h3>
              <p className="mt-3 text-sm text-muted">
                Star Citizen has been in development since 2012, has raised more than
                $1 billion in crowdfunding — the most of any game in history — and
                remains unfinished. Squadron 42 — the
                single-player campaign — is in late development and not yet released.
                CIG has repeatedly missed its own target windows, so don&apos;t buy
                expecting a full release on any particular date. Buy for what the game
                is today, not what it might become.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-blackMid/60 p-6">
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                Wipes: what you keep, what you lose
              </h3>
              <p className="mt-3 text-sm text-muted">
                During some major patches CIG wipes in-game progress: earned aUEC, some
                inventory items, and reputation reset. Anything bought with real money —
                your ships and your Game Package — is <strong className="text-white">never
                wiped</strong>. Wipes are announced in advance and are a normal part of
                alpha development, but they sting if you&apos;ve spent weeks grinding credits.
              </p>
            </div>
          </section>

          {/* Hardware */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Can your PC actually run it?
            </h2>
            <p className="mt-4 text-muted">
              Star Citizen is one of the most hardware-intensive games available. If your
              system is under spec, performance will be rough regardless of settings — and
              the game will feel much worse than it actually is. Don&apos;t buy (or judge)
              it on hardware that can&apos;t run it. A realistic baseline for a playable
              experience in 2026:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ['CPU', 'Ryzen 5 3600 or Intel i7-9700K, or better'],
                ['RAM', '32 GB recommended — 16 GB is the listed minimum, but 32 GB is strongly recommended for stability'],
                ['Storage', 'NVMe SSD required. HDDs produce extremely long load times and are not practically viable'],
                ['GPU', 'GTX 1080 Ti / RX 5700 XT or better for medium settings at 1080p'],
              ].map(([part, spec]) => (
                <li key={part as string} className="flex gap-4 rounded-xl border border-white/10 bg-blackMid/60 p-5">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" aria-hidden />
                  <div>
                    <strong className="text-white">{part}</strong>
                    <p className="mt-1 text-sm text-muted">{spec}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Requirements shift with major patches — check the official specs on{' '}
              <a
                href="https://robertsspaceindustries.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                robertsspaceindustries.com
              </a>{' '}
              before buying.
            </p>
          </section>

          {/* Who it's for */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Who Star Citizen is for
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange">
                  You&apos;ll love it if you…
                </h3>
                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    'Enjoy open-world sandboxes with minimal hand-holding',
                    'Played Elite Dangerous, No Man\'s Sky, Eve Online, or X4 and wanted more',
                    'Like the feeling of piloting a real spacecraft — controls, physics, fuel',
                    'Have friends to play with (multi-crew is where it shines)',
                    'Want to be part of something being built — testing systems, watching features arrive patch by patch',
                    'Can tolerate alpha-level jank in exchange for ambition',
                    'Enjoy emergent stories — the best moments aren\'t scripted',
                    'Want a welcoming community — player organizations run their own events and genuinely take new players in',
                    'Had any fun during Free Fly and want more of it',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-orange flex-shrink-0">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-muted">
                  You should wait if you…
                </h3>
                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    'Bounced hard during Free Fly — the paid game is the same experience',
                    'Need a polished, finished product with a complete story (Squadron 42 isn\'t out yet)',
                    'Play mostly solo, casually, 30 minutes at a time — the loop rewards longer sessions',
                    'Are on a tight budget — for $45–60 you can buy many complete, award-winning games',
                    'Have hardware below spec — an HDD or under 16 GB RAM misrepresents the game',
                    'Need a predictable release date — CIG\'s track record on timelines is poor',
                    'Want competitive balance — this is not an esport',
                    'Get frustrated by bugs and instability',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-muted flex-shrink-0">–</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Try before you buy — the spine */}
          <section className="mt-14 rounded-2xl border border-orange/30 bg-orange/5 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">
              Haven&apos;t played yet? Don&apos;t buy — try it free first
            </h2>
            <p className="mt-4 text-white/80">
              CIG opens the full game to everyone several times a year during{' '}
              <strong className="text-white">Free Fly events</strong> — typically around
              Invictus Launch Week (May), CitizenCon, and IAE (November). For the event
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
              How to buy without overspending
            </h2>
            <p className="mt-4 text-muted">
              This is the most important advice on this page: buy a starter package and
              stop there. The single most common regret in the SC community is
              buying a large ship too early. You can earn ships in-game with
              UEC and try every profession before committing real money.
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
                    ['Citizen Starter Pack', '$45 (on sale from $60)', 'The most affordable entry point. A capable starter ship that gets you into the Persistent Universe without overcommitting.'],
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
            <p className="mt-4 text-xs text-muted">
              For most new players the Citizen or Generalist pack is the better first buy —{' '}
              <a
                href="https://dayonecitizen.com/day-one-citizen/starter-package"
                className="text-orange underline hover:text-orange-dark"
                target="_blank"
                rel="noopener"
              >
                dayonecitizen.com&apos;s starter package guide
              </a>{' '}
              compares them in plain English.
              Prices vary by sale — CIG runs sales around Invictus and IAE. Never pay above
              these ranges for a starter. Squadron 42 (the single-player campaign, not yet
              released) is not included in every package — if you want it, confirm your
              package includes SQ42 before purchasing.
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
              <CTAButton size="lg" />
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
