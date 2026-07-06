import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PageSources } from '@/components/PageSources';
import { CTAButton } from '@/components/CTAButton';
import { GlossaryClient, type GlossaryTerm } from '@/components/GlossaryClient';
import { HUB_URL } from '@/data/events';

export const metadata: Metadata = {
  title: 'Star Citizen Glossary — Free Fly Terms Explained',
  description:
    'Plain-English definitions for the Star Citizen terms new players hit during Free Fly events — UEC, aUEC, Game Package, LTI, quantum travel, and more.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: 'Star Citizen Free Fly Glossary',
    description:
      'Quick definitions for the jargon every new Free Fly player needs. No wiki-crawling required.',
  },
};

// Terms relevant to a brand-new Free Fly player.
// Anything beyond this scope lives at dayonecitizen.com/glossary.
const FREE_FLY_TERMS = new Set([
  // Brand / Community
  'o7', 'Fly Safe', "the 'Verse", 'Backer', 'CIG', 'RSI', 'Pledge', 'Game Package',
  'Referral Code', 'IAE', 'Invictus Launch Week', 'DefenseCon', 'CitizenCon',
  'Inside Star Citizen', 'Org', 'Squadron 42', 'Spectrum', 'Free Fly',
  // Currency
  'UEC', 'aUEC', 'Store Credit', 'LTI', 'CCU', 'Melt',
  // Gameplay
  'PU', 'Hangar', 'ASOP', 'Landing Pad', 'Loaner Ship', 'Quantum Travel',
  'mobiGlas', 'Global Chat', 'Hab', 'Inner Thought', 'Loadout', 'Armor',
  'PvP', 'PvE', 'FPS', 'NPC', 'Bounty', 'Mining', 'Cargo', 'SCU',
  'CrimeStat', 'Bedlogging', 'Gimbal',
  // Technical
  'PTU', 'Wipe', '30k', 'Hangar Ready', 'Flight Ready',
  // Locations
  'Stanton', 'Welcome Hub', 'Lorville', 'Area18', 'New Babbage', 'Orison', 'GrimHEX',
  // Ships (starter-relevant)
  'Aurora', 'Mustang', 'Avenger', 'Cutlass', 'Hornet',
]);

// Revalidate page every hour so new terms from dayonecitizen.com flow through.
export const revalidate = 3600;

async function fetchTerms(): Promise<GlossaryTerm[]> {
  try {
    const res = await fetch(`${HUB_URL}/api/glossary`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const all: GlossaryTerm[] = await res.json();
    return all.filter((t) => FREE_FLY_TERMS.has(t.term));
  } catch {
    return [];
  }
}

export default async function GlossaryPage() {
  const terms = await fetchTerms();

  return (
    <>
      <EventStatusBanner variant="bar" />
      <NavBar />

      <main>
        {/* Hero */}
        <section className="container-narrow py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Reference</span>
            <h1 className="heading-display mt-4 text-4xl sm:text-6xl">
              Star Citizen <span className="text-orange">Free Fly</span> Glossary
            </h1>
            <p className="mt-5 text-lg text-muted">
              The {FREE_FLY_TERMS.size} terms a new player is most likely to hit
              during a Free Fly event — defined in plain English, no wiki required.
              The{' '}
              <Link
                href={`${HUB_URL}/glossary`}
                target="_blank"
                rel="noopener"
                className="text-orange hover:underline"
              >
                full 200+ term glossary
              </Link>{' '}
              lives at dayonecitizen.com.
            </p>
          </div>
        </section>

        {/* Glossary */}
        <section className="container-narrow pb-20">
          {terms.length > 0 ? (
            <GlossaryClient terms={terms} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-blackMid/60 p-12 text-center">
              <p className="text-muted">
                Glossary data is loading.{' '}
                <Link
                  href={`${HUB_URL}/glossary`}
                  target="_blank"
                  rel="noopener"
                  className="text-orange hover:underline"
                >
                  Visit dayonecitizen.com for the full glossary →
                </Link>
              </p>
            </div>
          )}
        </section>

        {/* Referral nudge */}
        <section className="container-narrow pb-24">
          <div className="rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/10 via-blackMid to-spaceBlack p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">One more thing</span>
                <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
                  Use a referral code when you sign up.
                </h2>
                <p className="mt-3 text-muted">
                  Paste <span className="font-mono text-orange">STAR-GCQJ-N6NC</span> into
                  the Referral Code field when creating your RSI account. You get{' '}
                  <strong className="text-white">50,000 UEC</strong> — that&apos;s in-game
                  currency — instantly. It cannot be added after 24 hours.
                </p>
                <div className="mt-6">
                  <CTAButton trackingLabel="glossary-referral-nudge" />
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-spaceBlack/60 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                  Not sure if you should buy?
                </p>
                <p className="mt-2 text-white/80">
                  We wrote an honest breakdown — pros, cons, current state of the alpha,
                  and who it&apos;s actually for.
                </p>
                <Link href="/should-i-buy" className="btn-secondary mt-4 inline-block">
                  Should I Buy Star Citizen? →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageSources route="/glossary" />

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
              { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://freeflyevent.com/glossary' },
            ],
          }),
        }}
      />
    </>
  );
}
