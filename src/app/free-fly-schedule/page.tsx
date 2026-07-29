import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { FREE_FLY_HISTORY, getEventStatus, HUB_URL } from '@/data/events';
import { formatRangeUTC } from '@/lib/format';

// Re-render hourly so "Live now" / "Ended" states flip without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Star Citizen Free Fly Schedule 2026 — Every Confirmed & Expected Window',
  description:
    'The full Star Citizen Free Fly schedule for 2026: confirmed event dates, the window live right now, and when the next free-to-play period is expected.',
  alternates: { canonical: '/free-fly-schedule' },
  keywords: [
    'star citizen free fly schedule',
    'star citizen free fly schedule 2026',
    'star citizen free fly calendar',
    'star citizen free to play dates',
    'star citizen event schedule 2026',
  ],
  openGraph: {
    images: ['/images/hero/hero-01.jpg'],
    title: 'Star Citizen Free Fly Schedule 2026',
    description:
      'Every confirmed and expected Star Citizen Free Fly window in 2026, kept current from official RSI Comm-Links.',
  },
};

const faqs = [
  {
    q: 'What is the Star Citizen Free Fly schedule for 2026?',
    a: 'Two windows are confirmed so far: DefenseCon 2956 ran May 14–27, and the Foundation Festival 2026 Free Fly runs July 29 – August 10. Based on the yearly pattern, the next expected window is the Intergalactic Aerospace Expo (IAE) in late November — CIG has not announced IAE 2956 dates yet.',
  },
  {
    q: 'Is there a fixed Free Fly schedule?',
    a: 'No. Cloud Imperium Games does not publish an annual calendar. Each Free Fly is announced through an official Comm-Link, usually one to two weeks before the event starts. What repeats is the pattern: a May flagship event, a mid-year Foundation Festival, and the IAE in late November.',
  },
  {
    q: 'How often does Star Citizen have Free Fly events?',
    a: 'Several times a year. The dependable anchors are the May flagship (Invictus in past years, DefenseCon in 2026), Foundation Festival in mid-year (it included a Free Fly in 2024, 2025, and 2026), and the Intergalactic Aerospace Expo every November since at least 2951 (2021).',
  },
  {
    q: 'How long does each Free Fly last?',
    a: 'Usually one to two weeks. Recent examples: Foundation Festival 2026 runs 13 days (July 29 – August 10), DefenseCon 2956 ran 14 days, and IAE 2955 ran about two weeks including its finale days.',
  },
];

/** Expected-but-unannounced windows shown after the confirmed rows. */
const EXPECTED = [
  {
    name: 'Intergalactic Aerospace Expo 2956',
    window: 'Late November 2026 (expected)',
    note: 'Not announced. IAE has run a November Free Fly every year since at least 2951 (2021).',
    href: '/iae-2956',
  },
];

export default function FreeFlySchedulePage() {
  const status = getEventStatus();
  const now = new Date();

  // Confirmed 2026 windows, oldest first for calendar reading order.
  const confirmed2026 = FREE_FLY_HISTORY
    .filter((ev) => new Date(ev.start).getUTCFullYear() === 2026)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const rowStatus = (start: string, end: string) => {
    if (now >= new Date(start) && now <= new Date(end)) return 'LIVE NOW';
    if (now > new Date(end)) return 'Ended';
    return 'Upcoming';
  };

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main className="container-narrow py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">

          <span className="eyebrow">Free Fly schedule</span>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">
            Star Citizen Free Fly Schedule 2026
          </h1>

          {/* GEO answer — derived from the event calendar, updates via ISR */}
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            {status.state === 'ACTIVE' ? (
              <>
                A Free Fly is <strong className="text-white">live right now</strong>:{' '}
                <strong className="text-white">{status.event.name}</strong> runs{' '}
                {formatRangeUTC(status.event.start, status.event.end)}.{' '}
              </>
            ) : (
              <>
                No Free Fly is live at this moment.{' '}
              </>
            )}
            CIG does not publish a fixed annual calendar — each window is announced
            by official Comm-Link, usually one to two weeks ahead. The repeating
            pattern: a <strong className="text-white">May flagship event</strong>, a{' '}
            <strong className="text-white">mid-year Foundation Festival</strong>, and
            the <strong className="text-white">IAE in late November</strong>.
          </p>

          {/* 2026 calendar table */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">The 2026 windows</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-spaceBlack/60 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Window</th>
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmed2026.map((ev) => {
                    const s = rowStatus(ev.start, ev.end);
                    return (
                      <tr key={ev.id} className="border-b border-white/5 hover:bg-orange/5">
                        <td className="px-4 py-3 text-orange">{formatRangeUTC(ev.start, ev.end)}</td>
                        <td className="px-4 py-3 font-semibold text-white">{ev.name}</td>
                        <td className="px-4 py-3">
                          {s === 'LIVE NOW' ? (
                            <span className="rounded-full border border-orange bg-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
                              Live now
                            </span>
                          ) : (
                            <span className="text-muted">{s}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {EXPECTED.map((row) => (
                    <tr key={row.name} className="border-b border-white/5 hover:bg-orange/5">
                      <td className="px-4 py-3 text-muted">{row.window}</td>
                      <td className="px-4 py-3 font-semibold text-white">
                        <Link href={row.href} className="hover:text-orange">
                          {row.name} →
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                          Expected
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted">
              &ldquo;Expected&rdquo; rows are pattern-based, not announcements. Every
              confirmed row is sourced from an official RSI Comm-Link — see the full{' '}
              <Link href="/event-history" className="text-orange underline-offset-2 hover:underline">
                event history
              </Link>{' '}
              for past years.
            </p>
          </section>

          {/* The yearly pattern */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              The pattern behind the schedule
            </h2>
            <p className="mt-4 text-muted">
              Free Fly windows track CIG&apos;s recurring events. The May flagship
              (Invictus Launch Week through 2025, DefenseCon in 2026) brings a
              military-themed showcase. Foundation Festival lands mid-year and is
              aimed squarely at new players. The Intergalactic Aerospace Expo in
              late November is the biggest of the three — historically 100+ ships
              free to fly across rotating manufacturer days. If you can only make
              one window a year, IAE is the one to plan around.
            </p>
          </section>

          {/* Alerts */}
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">Get the next window on your calendar</h2>
            <p className="mt-4 text-muted">
              The status banner at the top of every page here flips the moment an
              event is announced. You can also subscribe to the free{' '}
              <a
                href="https://dayonecitizen.com/api/calendar/free-fly"
                className="text-orange underline-offset-2 hover:underline"
              >
                Free Fly calendar feed (.ics)
              </a>{' '}
              maintained by our sister site dayonecitizen.com — it carries the
              current confirmed window and works with Google Calendar, Outlook,
              and Apple Calendar.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
            <h2 className="heading-display text-2xl">Be ready before the window opens</h2>
            <p className="mt-4 text-white/80">
              Your RSI account is free and takes two minutes — and a referral code
              only works at signup. Create it now with the code, claim the 50,000
              UEC bonus, and you&apos;re set for whichever window comes next.
            </p>
            <div className="mt-6">
              <CTAButton size="lg" trackingLabel="free-fly-schedule-cta" />
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
              <Link href="/free-ships-right-now" className="btn-secondary">
                What ships are free right now? →
              </Link>
              <Link href="/iae-2956" className="btn-secondary">
                IAE 2956 — what we know →
              </Link>
              <Link href="/next-free-fly" className="btn-secondary">
                When is the next Free Fly? →
              </Link>
              <Link href={HUB_URL} target="_blank" rel="noopener" className="btn-secondary">
                New player guide at dayonecitizen.com →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <PageSources route="/free-fly-schedule" />
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
              { '@type': 'ListItem', position: 2, name: 'Free Fly Schedule', item: 'https://freeflyevent.com/free-fly-schedule' },
            ],
          }),
        }}
      />
    </>
  );
}
