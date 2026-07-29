import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { LightboxImage } from '@/components/LightboxImage';
import { FREE_FLY_HISTORY, getEventStatus, HUB_URL } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

// Re-render hourly so the live answer flips with the event calendar
// without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'What Ships Are Free in Star Citizen Right Now? (Live List)',
  description:
    'The ships you can fly free in Star Citizen right now, straight from the current Free Fly event — plus what past events unlocked and how to fly them.',
  alternates: { canonical: '/free-ships-right-now' },
  keywords: [
    'star citizen free ships',
    'what ships are free in star citizen',
    'star citizen free ships right now',
    'star citizen free fly ships',
    'star citizen ships you can fly free',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'What Ships Are Free in Star Citizen Right Now?',
    description:
      'The live list of ships you can fly free during the current Star Citizen Free Fly event.',
  },
};

/** In-game screenshots for ships we have shots of (own library). */
const SHIP_IMAGES: Record<string, { src: string; alt: string; width: number; height: number }> = {
  'RSI Aurora Mk II': {
    src: '/images/aurora-over-lorville.webp',
    alt: 'An RSI Aurora silhouetted against the sunset over Lorville',
    width: 1400,
    height: 788,
  },
  'Drake Cutter': {
    src: '/images/drake-cutter-hangar.webp',
    alt: 'A Drake Cutter lifting off inside a hangar',
    width: 1400,
    height: 788,
  },
  'Crusader Intrepid': {
    src: '/images/crusader-intrepid-landed.webp',
    alt: 'A Crusader Intrepid landed on a pad',
    width: 1400,
    height: 788,
  },
};

/** Plain-English role notes for ships we can describe from official copy. */
const ROLE_NOTES: Record<string, string> = {
  'RSI Aurora Mk II': 'The classic starter — a single-seat ship built for first flights and light missions.',
  'Drake Cutter': 'A compact cargo ship: haul small loads and learn the trading loop.',
  'Drake Golem': 'A mining ship — crack rocks and try the industrial career.',
  'Crusader Intrepid': 'A single-seat courier for delivery missions.',
  'RSI Salvation': 'A salvage ship — strip hulls and try the salvage career.',
};

const STATIC_FAQS = [
  {
    q: 'Do I keep the free ships after the event?',
    a: 'No. Free Fly ships are available only during the event window. When it ends, access ends with it. What does carry over is your account — and the 50,000 UEC referral bonus if you signed up with a referral code.',
  },
  {
    q: 'How do I fly the free ships?',
    a: 'Create a free RSI account (use a referral code at signup — it cannot be added later), download the launcher and the game, and the event ships appear in your hangar for the duration of the Free Fly. No purchase is required.',
  },
  {
    q: 'Which events unlock the most ships?',
    a: 'The Intergalactic Aerospace Expo (IAE) every November is the biggest — historically 100+ ships free across rotating manufacturer days. May flagship events like DefenseCon 2956 have run similar large rotations. Mid-year events like Foundation Festival offer a smaller, curated lineup aimed at new players.',
  },
];

export default function FreeShipsRightNowPage() {
  const status = getEventStatus();
  const recentPast = FREE_FLY_HISTORY.filter(
    (ev) => new Date(ev.end).getTime() < Date.now()
  ).slice(0, 4);

  // The live-answer FAQ derives from the event calendar so the FAQPage
  // JSON-LD never contradicts the page body (ISR refreshes both hourly).
  const liveAnswer =
    status.state === 'ACTIVE'
      ? `${status.event.ships.length} ships are free to fly during ${status.event.name} (${formatRangeUTC(status.event.start, status.event.end)}): ${status.event.ships.join(', ')}. No purchase is required — create a free RSI account and download the game.`
      : 'None at this moment — ships are only free during Free Fly event windows, and no event is live right now. The status banner on this site and the 2026 schedule page show when the next window opens.';
  const faqs = [
    { q: 'What ships are free in Star Citizen right now?', a: liveAnswer },
    ...STATIC_FAQS,
  ];

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          <span className="eyebrow">Free ships</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            What Ships Are Free in Star Citizen Right Now?
          </h1>

          {/* Live answer — derived from the event calendar, refreshes via ISR */}
          {status.state === 'ACTIVE' ? (
            <>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                <strong className="text-white">{status.event.ships.length === 1 ? 'Ships are' : `${status.event.ships.length} ships are`} free right now.</strong>{' '}
                {status.event.name} is live — anyone can play free{' '}
                {formatRangeUTC(status.event.start, status.event.end)}, no purchase
                required.
              </p>
              <div className="mt-8 rounded-2xl border border-orange/30 bg-orange/10 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-orange">
                  Free to fly during {status.event.name}
                </p>
                <ul className="mt-4 space-y-3">
                  {status.event.ships.map((ship) => (
                    <li key={ship} className="rounded-xl border border-white/10 bg-blackMid/60 p-4">
                      <p className="font-semibold text-white">{ship}</p>
                      {ROLE_NOTES[ship] && (
                        <p className="mt-1 text-sm text-muted">{ROLE_NOTES[ship]}</p>
                      )}
                      {SHIP_IMAGES[ship] && (
                        <LightboxImage
                          src={SHIP_IMAGES[ship].src}
                          alt={SHIP_IMAGES[ship].alt}
                          width={SHIP_IMAGES[ship].width}
                          height={SHIP_IMAGES[ship].height}
                          containerClassName="mt-3 rounded-lg border border-white/10"
                          className="h-auto w-full rounded-lg"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                <strong className="text-white">No ships are free right now</strong> —
                free access only exists during Free Fly event windows, and none is
                live at this moment. The banner above flips the instant one is
                announced, and the{' '}
                <Link href="/free-fly-schedule" className="text-orange underline-offset-2 hover:underline">
                  2026 schedule
                </Link>{' '}
                shows the next expected window.
              </p>
              <div className="mt-8 rounded-2xl border border-dashed border-white/20 bg-blackMid/60 p-6 sm:p-8">
                <p className="text-sm text-white/85">
                  While you wait: create your free RSI account with a referral code
                  now (it can&apos;t be added later) so the 50,000 UEC bonus is locked
                  in before the next window opens.
                </p>
              </div>
            </>
          )}

          {/* What free means */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              How free ships work during a Free Fly
            </h2>
            <p className="mt-4 text-muted">
              During a Free Fly window, CIG unlocks a set of ships for everyone —
              including brand-new accounts that have never spent a dollar. You fly
              them for the length of the event; when it ends, so does access. Big
              events like the{' '}
              <Link href="/iae-2956" className="text-orange underline-offset-2 hover:underline">
                Intergalactic Aerospace Expo
              </Link>{' '}
              rotate 100+ ships through manufacturer showcase days, while smaller
              events curate a handful that cover the main careers.
            </p>
          </section>

          {/* Past event lineups */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              What recent events unlocked
            </h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Dates</th>
                    <th className="px-4 py-3">Free ships</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPast.map((ev) => (
                    <tr key={ev.id} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 font-semibold text-white">{ev.name}</td>
                      <td className="px-4 py-3 text-orange">{formatRangeUTC(ev.start, ev.end)}</td>
                      <td className="px-4 py-3 text-muted">{ev.ships[0] ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Fly them free</h2>
            <p className="mt-4 text-white/80">
              A free RSI account is all you need during an event window — and a
              referral code at signup adds 50,000 UEC that stays on your account
              for good.
            </p>
            <div className="mt-6">
              <CTAButton size="lg" trackingLabel="free-ships-cta" />
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
              <Link href="/free-fly-schedule" className="btn-secondary">
                2026 Free Fly schedule →
              </Link>
              <Link href="/event-guide" className="btn-secondary">
                Your first Free Fly guide →
              </Link>
              <Link href="/foundation-festival-2026" className="btn-secondary">
                Foundation Festival 2026 →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/free-ships-right-now" />
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
              { '@type': 'ListItem', position: 2, name: 'Free Ships Right Now', item: 'https://freeflyevent.com/free-ships-right-now' },
            ],
          }),
        }}
      />
    </>
  );
}
