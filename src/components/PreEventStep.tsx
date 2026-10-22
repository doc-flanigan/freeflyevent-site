import { CTAButton } from './CTAButton';
import { CopyCodeButton } from './CopyCodeButton';
import { REFERRAL_CODE } from '@/data/events';
import { ctaLabel, type EventState } from '@/lib/cta-label';

/**
 * Account step, pulled out of the numbered list: the referral code only works
 * at signup, so it must happen before (not during) the Free Fly. Body text is
 * ledger-tracked wording; keep it verbatim.
 */
const PRE_STEP_BODY =
  'Use a referral code at signup so 50,000 UEC lands in your account when you log in. During some events CIG adds a limited extra signup bonus on top — the banner at the top of this site shows one when it is live. The code cannot be added after about 24 hours, so enter it at signup.';

export function PreEventStep({
  state,
  copyLocation = 'guide-pre-step',
  trackingLabel = 'guide-pre-step',
}: {
  state: EventState;
  copyLocation?: string;
  trackingLabel?: string;
}) {
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
        <CopyCodeButton location={copyLocation} size="sm" />
      </div>
      <div className="mt-4">
        <CTAButton trackingLabel={trackingLabel} trackImpression className="w-full sm:w-auto">
          {ctaLabel('preStep', state)}
        </CTAButton>
      </div>
    </aside>
  );
}
