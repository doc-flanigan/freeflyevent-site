import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { EventHistoryTable } from '@/components/EventHistoryTable';
import { FREE_FLY_HISTORY, HUB_URL } from '@/data/events';

export const metadata: Metadata = {
  title: { absolute: 'Star Citizen Free Fly Event History (2022–2026)' },
  description:
    'Every Star Citizen Free Fly event since 2022 — Invictus Launch Week, DefenseCon, and IAE — with verified dates, flyable ships, and official RSI Comm-Link sources.',
  alternates: { canonical: '/event-history' },
  openGraph: {
    title: 'Star Citizen Free Fly Event History (2022–2026)',
    description:
      'Sortable archive of every Star Citizen Free Fly event with verified dates, flyable ships, and official RSI Comm-Link sources.',
  },
};

export default function EventHistoryPage() {
  const totalDays = FREE_FLY_HISTORY.reduce((sum, ev) => {
    const days = Math.round(
      (new Date(ev.end).getTime() - new Date(ev.start).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return sum + days;
  }, 0);

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main>
        <section className="container-narrow py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Archive</span>
            <h1 className="heading-display mt-4 text-4xl sm:text-6xl">
              Free Fly Event History
            </h1>
            <p className="mt-5 text-lg text-white/90">
              Star Citizen runs several Free Fly events per year, and the two
              reliable anchors are the May military expo (Invictus Launch Week,
              hosted as DefenseCon in 2026) and the Intergalactic Aerospace
              Expo (IAE) in late November.
            </p>
            <p className="mt-4 text-muted">
              A typical Free Fly lasts 10&ndash;14 days, and no purchase is
              needed &mdash; you create a free account, download the game, and
              fly. Every event below is verified against the official RSI
              Comm-Link announcement linked in its row, so you can check the
              dates and ship lineups at the source. Wondering when the next
              window opens? See our{' '}
              <Link href="/next-free-fly" className="text-orange hover:text-white">
                next Free Fly forecast
              </Link>
              , and if you&apos;re planning to jump in, the{' '}
              <Link href="/event-guide" className="text-orange hover:text-white">
                event guide
              </Link>{' '}
              walks you through your first session step by step.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Events tracked" value={FREE_FLY_HISTORY.length.toString()} />
            <Stat label="Total free play days" value={`${totalDays}+`} />
            <Stat label="Annual cadence" value="2+ / year" />
          </div>
        </section>

        <section className="container-narrow pb-16">
          <EventHistoryTable />
        </section>

        <section className="container-narrow pb-20">
          <div className="rounded-xl border border-white/10 bg-blackMid/60 p-6 sm:p-8">
            <span className="eyebrow">Stay in the loop</span>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              Get notified when the next Free Fly opens.
            </h2>
            <p className="mt-3 text-muted">
              We post date confirmations and full event roundups on
              dayonecitizen.com. Subscribe there for event alerts and
              beginner-friendly Star Citizen guides.
            </p>
            <Link
              href={HUB_URL}
              target="_blank"
              rel="noopener"
              className="btn-secondary mt-6"
            >
              Subscribe at dayonecitizen.com →
            </Link>
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
                name: 'Event History',
                item: 'https://freeflyevent.com/event-history',
              },
            ],
          }),
        }}
      />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-blackMid/60 p-5">
      <div className="font-display text-3xl font-bold text-orange">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{label}</div>
    </div>
  );
}
