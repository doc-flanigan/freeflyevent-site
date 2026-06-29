// Single referral code — rotation discontinued 2026-06-28.
// All CTAs use Doc's code STAR-GCQJ-N6NC. Function/export names retained for
// backward compatibility with existing consumers.
const REFERRAL_CODE = 'STAR-GCQJ-N6NC'
const REFERRAL_URL = `https://www.robertsspaceindustries.com/enlist?referral=${REFERRAL_CODE}`

export const FALLBACK_REFERRAL_URL = REFERRAL_URL

export function getRotatedReferralUrl(): string {
  return REFERRAL_URL
}
