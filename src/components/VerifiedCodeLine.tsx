import { VERIFIED_DISPLAY } from '@/data/verification';

const LOG_URL =
  'https://dayonecitizen.com/referral-code?utm_source=freeflyevent&utm_medium=section&utm_campaign=verified-log';

/** Quiet trust line shown under the referral code + Copy chip. */
export function VerifiedCodeLine({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-white/60 ${className}`}>
      Code verified working {VERIFIED_DISPLAY} on the RSI signup page. Re-checked monthly; log on{' '}
      <a href={LOG_URL} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-white/80">
        dayonecitizen.com/referral-code
      </a>
      .
    </p>
  );
}
