import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export const metadata: Metadata = {
  title: 'Is Star Citizen Free? Free-to-Play vs Free Fly (2026)',
  description:
    'Star Citizen is not free-to-play — but you can play it for free during Free Fly events. Here\'s the difference, what a free account gets you, and when you can play at no cost.',
  alternates: { canonical: '/is-star-citizen-free' },
  keywords: [
    'is star citizen free',
    'is star citizen free to play',
    'can you play star citizen for free',
    'star citizen free to play 2026',
    'is star citizen free on steam',
    'star citizen free account',
  ],
  openGraph: {
    title: 'Is Star Citizen Free? Free-to-Play vs Free Fly',
    description:
      'No, Star Citizen is not free-to-play — but you can play it free during Free Fly events. Here\'s the honest breakdown.',
  },
};

const faqs = [
  {
    q: 'Is Star Citizen free to play?',
    a: 'No. Star Citizen is not a free-to-play game like Fortnite or Warframe. To play any time you want, you buy a one-time Game Package starting around $45 USD. There is no monthly subscription.',
  },
  {
    q: 'So how can I play Star Citizen for free?',
    a: 'During official Free Fly events, Cloud Imperium opens the full game to everyone at no cost for roughly 10 days. You make a free account, download the game, and play — no purchase required. Free Flys run several times a year, most reliably during Invictus Launch Week (May) and the Intergalactic Aerospace Expo (November).',
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
    q: 'Does a free Star Citizen account cost anything to keep?',
    a: 'No. A free RSI account is free forever. You can claim a 50,000 UEC referral bonus on it at signup, but you can only actually launch the game when you own a Game Package or when a Free Fly event is live.',
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
              <strong className="text-orange">Short answer:</strong> Star Citizen is{' '}
              <strong className="text-white">not free-to-play</strong> — playing it whenever
              you want costs a one-time <strong className="text-white">~$45</strong> Game
              Package. But you <strong className="text-white">can play it completely free</strong>{' '}
              during periodic <Link href="/" className="text-orange underline-offset-2 hover:underline">Free Fly events</Link>,
              when Cloud Imperium opens the whole game to everyone for about 10 days at a time.
            </p>
          </div>

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
