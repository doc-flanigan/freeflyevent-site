import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { EventHistoryTable } from '@/components/EventHistoryTable';
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
      {/* FAQPage schema — lets AI cite pattern/cadence questions from this page */}
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
                name: 'How often does Star Citizen have Free Fly events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Star Citizen runs two Free Fly events per year. The first is a military-themed event in May — historically Invictus Launch Week, rebranded to DefenseCon in 2026. The second is the Intergalactic Aerospace Expo (IAE) in November, the largest ship showcase of the year. CIG has maintained this twice-annual cadence consistently since 2019.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long do Star Citizen Free Fly events last?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most Star Citizen Free Fly events run for approximately 7 to 11 days. The IAE in November tends to be the longest, often lasting 10 or more days. Invictus Launch Week and its successor DefenseCon typically run 7 to 9 days. Exact dates are announced by Cloud Imperium Games on the official RSI Comm-Link.',
                },
              },
              {
                '@type': 'Question',
                name: 'Has Star Citizen ever cancelled a Free Fly event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes — once. CIG cancelled the Free Fly portion of DefenseCon 2026 (May 2026) mid-event due to server performance issues under the DefenseCon traffic load. This was the first cancellation in over a decade of Free Fly events. CIG addressed the community live on Twitch when they made the call. The Free Fly was later reinstated on May 18 and ran through May 27.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between Invictus Launch Week and IAE Free Fly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Invictus Launch Week (now called DefenseCon) is a May event showcasing military and combat ships from the UEE Navy — typically 7 to 9 days. The Intergalactic Aerospace Expo (IAE) is a November event that rotates through 100+ ships across all manufacturers over its run — it is the larger of the two, usually 10+ days. Both include a Free Fly period allowing anyone to play at no cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the next Star Citizen Free Fly event in 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Based on the historical pattern, the next Star Citizen Free Fly event after DefenseCon 2956 (May 2026) is expected to be the Intergalactic Aerospace Expo (IAE) in November 2026. CIG has not yet announced official dates. Check freeflyevent.com for the latest confirmed dates and countdown when announced.',
                },
              },
              {
                '@type': 'Question',
                name: 'What ships were available during Invictus Launch Week 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'During Invictus Launch Week 2025 (May 23 – June 3, 2025), the Free Fly roster included the Aegis Hammerhead, Drake Cutlass Black, and RSI Aurora MR, along with a rotating daily schedule of military vessels. The full ship list rotated throughout the event window.',
                },
              },
              {
                '@type': 'Question',
                name: 'When was the Star Citizen IAE 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Star Citizen Intergalactic Aerospace Expo 2025 (IAE 2954) ran from November 21 to December 2, 2025 — 11 days. It featured 100+ ships rotating daily across manufacturer showcases, making it the largest Free Fly roster of the year.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is IAE or Invictus better for new players trying Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IAE (November) is generally better for new players because it features 100+ ships rotating daily, giving you the chance to test vastly different ship types across the entire game\'s lineup. DefenseCon/Invictus (May) focuses on military vessels. Both events are free to enter with a free RSI account, so neither requires a purchase.',
                },
              },
              {
                '@type': 'Question',
                name: 'What was the DefenseCon 2026 Free Fly incident?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CIG initially cancelled the Free Fly portion of DefenseCon 2956 on May 14, 2026 — the first Free Fly cancellation in Star Citizen history — citing server performance issues under DefenseCon\'s traffic load. CIG addressed the community live on Twitch. The Free Fly was reinstated on May 18, 2026 and ran through May 27.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I know when a Star Citizen Free Fly event is announced?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CIG announces Free Fly events on their official RSI Comm-Link (robertsspaceindustries.com/comm-link) and the Star Citizen subreddit. freeflyevent.com updates its status banner as soon as dates are confirmed. For event alerts subscribe to dayonecitizen.com — they post date confirmations and full event roundups when CIG makes announcements.',
                },
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
