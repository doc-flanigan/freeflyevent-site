const REFERRAL_CODES = ['STAR-GCQJ-N6NC', 'STAR-RXW4-JPN3', 'STAR-C2GJ-XSSS'] as const
const BASE_URL = 'https://www.robertsspaceindustries.com/enlist?referral='
export const FALLBACK_REFERRAL_URL = BASE_URL + REFERRAL_CODES[0]

export function getRotatedReferralUrl(): string {
  const code = REFERRAL_CODES[Math.floor(Math.random() * REFERRAL_CODES.length)]
  return BASE_URL + code
}
