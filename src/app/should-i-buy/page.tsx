import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
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
            You just played it for free. Now you&apos;re wondering if it&apos;s worth the
            money. Here&apos;s the unfiltered answer — pros, cons, what state the game is
            actually in, and who it&apos;s genuinely for.
          </p>

          {/* Quick verdict */}
          <div className="mt-10 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
            <h2 className="heading-display text-xl text-white">The quick answer</h2>
            <p className="mt-3 text-white/85">
              <strong className="text-orange">If you had a good time during Free Fly</strong> — buy
              a starter package. Don&apos;t go above ~$65. Give it 20 hours before judging
              it against finished games.
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
                ['A starter ship', 'Aurora MR, Avenger Titan, or Mustang Alpha depending on the package. All are capable solo ships. Any ship in the game can be rented in-game with UEC — you don\'t need to buy additional ships.'],
                ['Access to everything in the live game', 'All star systems, all gameplay loops, all future patches. There is no DLC. Content that ships after you buy is included.'],
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
                    'Space flight and ship combat',
                    'Mining, cargo trading, bounty hunting, salvage',
                    'On-foot FPS in stations and bunkers',
                    'Server meshing — the universe is technically persistent',
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
                    'Like the feeling of piloting a real spacecraft — controls, physics, fuel',
                    'Have friends to play with (multi-crew is where it shines)',
                    'Can tolerate alpha-level jank in exchange for ambition',
                    'Enjoy emergent stories — the best moments aren\'t scripted',
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
                    'Need a polished, finished product to enjoy it',
                    'Play mostly solo and prefer structured progression',
                    'Are on a tight budget — $45 is real money if you\'re not sure',
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
                    <th className="px-4 py-3">Starter Ship</th>
                    <th className="px-4 py-3">SQ42?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Starter (Aurora / Mustang)', '~$45', 'Aurora MR or Mustang Alpha', 'No'],
                    ['Avenger Titan Starter', '~$55', 'Avenger Titan (recommended)', 'No'],
                    ['Combo (game + SQ42)', '~$65', 'Aurora or Avenger Titan', 'Yes'],
                  ].map(([name, price, ship, sq42]) => (
                    <tr key={name as string} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 font-semibold text-white">{name}</td>
                      <td className="px-4 py-3 text-orange">{price}</td>
                      <td className="px-4 py-3 text-muted">{ship}</td>
                      <td className="px-4 py-3 text-muted">{sq42}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted">
              Prices vary by sale. CIG runs sales around Invictus/DefenseCon and IAE.
              Never pay above these ranges for a starter.
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

          {/* Final CTA area */}
          <section className="mt-14 text-center">
            <p className="text-muted">Still on the fence?</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/event-history" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
              <Link href={`${HUB_URL}`} target="_blank" rel="noopener" className="btn-secondary">
                New player guides at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
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
              { '@type': 'ListItem', position: 1, name: 'Free Fly Events', item: 'https://freeflyevent.com' },
              { '@type': 'ListItem', position: 2, name: 'Should I Buy?', item: 'https://freeflyevent.com/should-i-buy' },
            ],
          }),
        }}
      />
    </>
  );
}
