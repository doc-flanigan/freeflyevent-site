const REFERRAL_CODES = ['STAR-GCQJ-N6NC', 'STAR-CLXM-7VNH', 'STAR-RXW4-JPN3'] as const
const BASE_URL = 'https://www.robertsspaceindustries.com/enlist?referral='
const STORAGE_KEY = 'sc_referral_index'

export const FALLBACK_REFERRAL_URL = BASE_URL + REFERRAL_CODES[0]

export function getRotatedReferralUrl(): string {
  const total = REFERRAL_CODES.length
  const raw = localStorage.getItem(STORAGE_KEY)
  const index = raw !== null ? parseInt(raw, 10) : 0
  const code = REFERRAL_CODES[index % total]
  localStorage.setItem(STORAGE_KEY, String((index + 1) % total))
  return BASE_URL + code
}
