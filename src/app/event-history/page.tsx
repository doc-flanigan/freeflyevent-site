import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { EventHistoryTable } from '@/components/EventHistoryTable';
import { CTAButton } from '@/components/CTAButton';
import { FREE_FLY_HISTORY, HUB_URL } from '@/data/events';

export const metadata: Metadata = {
  title: 'Star Citizen Free Fly Event History',
  description:
    'A complete history of Star Citizen Free Fly events — Invictus Launch Week and Intergalactic Aerospace Expo (IAE) — sortable by date, name, and duration.',
  alternates: { canonical: '/event-history' },
  openGraph: {
    title: 'Star Citizen Free Fly Event History',
    description:
      'Sortable archive of every Star Citizen Free Fly event with dates and featured ships.',
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
            <p className="mt-5 text-muted">
              Every Free Fly event we&apos;ve catalogued, sortable by date,
              name, or length. Useful for predicting the next one — Invictus
              Launch Week sits in May; IAE sits in November. CIG has run them
              annually since 2019.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Events tracked" value={FREE_FLY_HISTORY.length.toString()} />
            <Stat label="Total free play days" value={`${totalDays}+`} />
            <Stat label="Annual cadence" value="2 / year" />
          </div>
        </section>

        <section className="container-narrow pb-16">
          <EventHistoryTable />
        </section>

        <section className="container-narrow pb-20">
          <div className="rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/10 via-blackMid to-spaceBlack p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">Don&apos;t Miss the Next One</span>
                <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
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
              <div className="rounded-xl border border-white/10 bg-spaceBlack/60 p-6">
                <h3 className="font-display text-lg font-bold text-white">
                  Already convinced?
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Make your free RSI account today. The 50,000 UEC bonus is
                  locked from the moment you sign up — your account is ready
                  the next time the event opens.
                </p>
                <div className="mt-5">
                  <CTAButton />
                </div>
              </div>
            </div>
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
