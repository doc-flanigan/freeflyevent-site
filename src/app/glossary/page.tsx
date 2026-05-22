import type { Metadata } from 'next';
import Link from 'next/link';
import { EventStatusBanner } from '@/components/EventStatusBanner';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
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
                  <CTAButton />
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
      {/* FAQPage schema — AI cites terminology questions from this page */}
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
                name: 'What does UEC mean in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'UEC stands for United Earth Credits — the permanent in-game currency in Star Citizen. It is tied to your RSI account and never wipes between patches. UEC can be received via referral bonuses (50,000 UEC when you use code STAR-GCQJ-N6NC at signup), purchased directly, or earned through in-game activities post-launch. UEC is used to buy ships, components, weapons, and equipment in-game.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between UEC and aUEC in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'UEC (United Earth Credits) is permanent currency — it stays on your account forever and survives all patches. aUEC (alpha UEC) is the temporary test currency used during Star Citizen\'s ongoing alpha phase; it is wiped to zero when major patches deploy to prevent economic imbalances from accumulating. Referral bonuses credit UEC. Mission rewards during the current alpha are paid in aUEC.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a Game Package in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Game Package is the minimum purchase required for permanent access to Star Citizen. It includes a starter ship, 1,000 aUEC, a ship hangar, and access to all current and future live game content. Starter packages begin at approximately $45 USD. Using referral code STAR-GCQJ-N6NC when creating your RSI account adds 50,000 UEC at no additional cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does 30k mean in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A "30k" is a server-side error that disconnects all players from a game server simultaneously. The name comes from the error code displayed. 30k errors are a known part of Star Citizen\'s alpha and typically resolve within a few minutes — your character respawns and progress from your last server-side save is restored. They occur less frequently as CIG improves server stability.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does RSI stand for in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RSI stands for Roberts Space Industries — a fictional in-universe spaceship manufacturer in Star Citizen\'s lore, known for ships like the Aurora and Constellation. In everyday use, RSI also refers to the game\'s official website and account platform at robertsspaceindustries.com. The real-world company that makes Star Citizen is Cloud Imperium Games (CIG).',
                },
              },
              {
                '@type': 'Question',
                name: 'What is LTI in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'LTI stands for Lifetime Insurance — a premium ship insurance type that permanently covers your ship against destruction with no renewal required. Standard ship insurance is time-limited and must be renewed in-game with aUEC, which is inexpensive. For new players LTI is not a priority; standard insurance covers your ships adequately during the alpha phase.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is quantum travel in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Quantum travel is Star Citizen\'s faster-than-light system for traveling between planets, moons, jump points, and stations within a star system. To use it: press F2 to open your star map, select a destination, hold B to spool your quantum drive, then hold B again to jump. Travel times range from seconds to several minutes depending on the distance. Quantum travel requires quantum fuel, which is refillable at stations.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is an ASOP terminal in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An ASOP (Automated Ship Ordering and Processing) terminal is a kiosk found at hangars in stations and landing zones that lets you retrieve, store, and manage your ships. To spawn a ship during Free Fly, find an ASOP terminal in your starting station hangar, select a ship from your inventory, and request it. It will appear in an assigned landing pad.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does CIG stand for in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CIG stands for Cloud Imperium Games — the studio founded by Chris Roberts that develops Star Citizen and Squadron 42. CIG has offices in Los Angeles, Manchester (Foundry 42), Frankfurt, and other locations. RSI (Roberts Space Industries) is the fictional in-universe brand; CIG is the real-world development company.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is bedlogging in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bedlogging is the act of logging out of Star Citizen while your character is inside a ship\'s bed or sleeping area. Bedlogging saves your character\'s exact position in space rather than sending you back to a station spawn point. It is used by players who want to resume in the same location — particularly useful on long multi-day expeditions or when parked in deep space.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a referral code in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Star Citizen referral code is a code entered during account creation that credits the new account with 50,000 UEC — the game\'s permanent in-game currency. The code must be entered in the Referral Code field on the RSI signup form or within 24 hours of account creation. After that window it cannot be applied. Referral code STAR-GCQJ-N6NC is available for any new player signing up during or outside of a Free Fly event.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a PTU in Star Citizen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'PTU stands for Public Test Universe — a separate server environment where CIG deploys upcoming patches for community testing before they go live on the main servers. PTU characters and progress are separate from the live game. Participating in PTU testing is optional and open to backers. The live game servers are referred to as the PU (Persistent Universe).',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
