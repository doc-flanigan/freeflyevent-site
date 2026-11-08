// Single source of truth for the /referral-code "Verified working" stamp
// and the dated verification log. Updated by scripts/verify-referral.mjs in
// the portfolio root (monthly ritual), or by scripts/record-referral-check.mjs
// via the "referral check" GitHub workflow — avoid hand-editing dates. That
// workflow also opens a reminder issue when VERIFIED_ON is over 30 days old.

export const VERIFIED_ON = '2026-10-28'
export const VERIFIED_DISPLAY = 'October 28, 2026'
export const VERIFIED_MONTH = 'October 2026'

export type VerificationEntry = {
  display: string
  text: string
  source?: { href: string; label: string }
}

export const VERIFICATION_LOG: VerificationEntry[] = [
  // __VERIFY_LOG_INSERT__ (newest first — the verify script prepends here)
  {
    display: 'October 28, 2026',
    text: 'STAR-GCQJ-N6NC entered on the live RSI enlist page. RSI accepted it and showed the code as applied. (manual check in a real browser)',
  },
]
