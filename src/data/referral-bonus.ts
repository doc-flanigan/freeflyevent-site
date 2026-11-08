/**
 * Tracks any referral bonus promotion CIG has announced beyond the
 * standard 50,000 UEC new-player reward.
 *
 * Maintained by the sc-news agent on every weekly digest run — see
 * `.claude/agents/sc-news.md` -> "Referral bonus detection" for the
 * detection signals and update rules.
 *
 * The site shows the bonus as ACTIVE only when:
 *   1. `active === true`, AND
 *   2. today's date is within [startsAt, endsAt] inclusive.
 *
 * The date check means expired promos shut themselves off automatically
 * once the page revalidates (every 24h via Next.js ISR), even if the
 * agent never gets back around to flipping `active` to false.
 */

export type ReferralBonus = {
  active: boolean
  /** Plain-English item name, e.g. "Aurora MR", "Cyclone-AA". Empty string when no bonus. */
  itemName: string
  /** One-line description for tooltip/card, e.g. "small starter ship". */
  itemDescription: string
  /** ISO YYYY-MM-DD. Empty string when no bonus. */
  startsAt: string
  /** ISO YYYY-MM-DD. Empty string when no bonus. */
  endsAt: string
  /** Comm-Link or Spectrum thread URL announcing the bonus. */
  sourceUrl: string
  /** Plain-English source label, e.g. "Official RSI blog post". */
  sourceLabel: string
}

export const REFERRAL_BONUS: ReferralBonus = {
  active: false,
  itemName: '',
  itemDescription: '',
  startsAt: '',
  endsAt: '',
  sourceUrl: '',
  sourceLabel: '',
}

/**
 * True only when the configured promo is flagged active AND the current
 * date is within its window. Used by the homepage IAE block and /iae-2956 to decide
 * whether to render the green "Bonus active" chip and the expanded
 * card body.
 */
export function isReferralBonusActive(now: Date = new Date()): boolean {
  if (!REFERRAL_BONUS.active) return false
  if (!REFERRAL_BONUS.startsAt || !REFERRAL_BONUS.endsAt) return false
  const start = new Date(REFERRAL_BONUS.startsAt + 'T00:00:00Z')
  const end = new Date(REFERRAL_BONUS.endsAt + 'T23:59:59Z')
  return now >= start && now <= end
}
