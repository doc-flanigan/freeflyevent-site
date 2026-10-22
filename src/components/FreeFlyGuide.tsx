import { CTAButton } from './CTAButton';
import { CopyCodeButton } from './CopyCodeButton';
import { REFERRAL_CODE } from '@/data/events';
import { ctaLabel, type EventState } from '@/lib/cta-label';

type Step = {
  title: string;
  body: string;
  /** Optional trailing link rendered after the body text. */
  link?: { href: string; label: string };
};

/**
 * Account step, pulled out of the numbered list: the referral code only works
 * at signup, so it must happen before (not during) the Free Fly. Body text is
 * ledger-tracked wording; keep it verbatim.
 */
const PRE_STEP_BODY =
  'Use a referral code at signup so 50,000 UEC lands in your account when you log in. During some events CIG adds a limited extra signup bonus on top — the banner at the top of this site shows one when it is live. The code cannot be added after about 24 hours, so enter it at signup.';

function PreEventStep({ state }: { state: EventState }) {
  return (
    <aside
      aria-labelledby="pre-step-heading"
      className="mb-8 rounded-xl border border-l-4 border-gold/60 bg-gold/[0.06] p-5 sm:p-6"
    >
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Do this before the Free Fly
      </span>
      <h3 id="pre-step-heading" className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
        Lock in your 50,000 UEC bonus first
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-white/80">{PRE_STEP_BODY}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <code data-ref-code className="font-mono text-lg font-bold text-gold">{REFERRAL_CODE}</code>
        <CopyCodeButton location="guide-pre-step" size="sm" />
      </div>
      <div className="mt-4">
        <CTAButton trackingLabel="guide-pre-step" trackImpression className="w-full sm:w-auto">
          {ctaLabel('preStep', state)}
        </CTAButton>
      </div>
    </aside>
  );
}

const STEPS: Step[] = [
  {
    title: 'Download the launcher',
    body: 'Grab the RSI Launcher from your account page. The game client is about a 100 GB download; plan on 150 GB free on an SSD. Start this early — the launcher will keep running while you read on.',
  },
  {
    title: 'Pick a ship from the Free Fly list',
    body: 'During the event, several ships are unlocked for everyone. The featured ships rotate by event — check the current event card on the homepage.',
  },
  {
    title: 'Run the new-player tutorial',
    body: 'Spawn at your starting station, follow the contract markers, and learn flight, quantum travel, and ship combat basics. 30–45 minutes well spent.',
    link: {
      href: 'https://dayonecitizen.com/day-one-citizen/first-day',
      label: 'Full first-day walkthrough at dayonecitizen.com →',
    },
  },
  {
    title: 'Try a delivery mission',
    body: 'Easiest first earner. Press F1 for your mobiGlas, open the Contract Manager, and accept a delivery. Pick up boxes on one moon, drop them on another. Pays well, low risk, and you see a lot of the universe quickly.',
  },
  {
    title: 'Explore a major planet',
    body: 'Microtech (snow), ArcCorp (city), Crusader (gas giant), or Hurston (industrial). Each is enormous and worth a quantum jump.',
  },
  {
    title: 'Group up with friends',
    body: 'Star Citizen is unforgivingly fun in groups. Use in-game chat, or Spectrum (RSI’s forum and chat site) in your browser, to find a crew. Friend other players and queue into shared instances.',
  },
  {
    title: 'Decide before the event ends',
    body: "If you're enjoying it, pick up a Game Package while still inside the event window. Your referral bonus and any Free Fly progress carry over.",
  },
];

export function FreeFlyGuide({ state }: { state: EventState }) {
  return (
    <>
      <PreEventStep state={state} />
      <ol className="grid gap-4 sm:grid-cols-2">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="card flex gap-4"
          >
            <div className="flex-shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display font-bold text-accent">
                {i + 1}
              </span>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.body}</p>
              {step.link && (
                <a
                  href={step.link.href}
                  target="_blank"
                  rel="noopener"
                  className="mt-1.5 inline-block text-sm text-accent underline hover:text-accent-hover"
                >
                  {step.link.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
