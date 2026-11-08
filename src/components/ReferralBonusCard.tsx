import { REFERRAL_BONUS, isReferralBonusActive } from '@/data/referral-bonus';

/**
 * Official CIG referral bonus for the current event window (e.g. a free ship
 * or gear pack for recruits who buy during the event). Renders nothing unless
 * src/data/referral-bonus.ts is flagged active AND today is inside its window.
 */
export function ReferralBonusCard({ className = '' }: { className?: string }) {
  if (!isReferralBonusActive()) return null;
  const b = REFERRAL_BONUS;
  return (
    <div className={`rounded-lg border border-gold/40 bg-gold/[0.06] p-4 text-sm text-white/85 ${className}`}>
      <strong className="font-semibold text-gold">Referral bonus: {b.itemName}</strong> — {b.itemDescription}{' '}
      ({b.startsAt}–{b.endsAt}).{' '}
      {b.sourceUrl && (
        <a href={b.sourceUrl} target="_blank" rel="noopener" className="text-accent underline underline-offset-2">
          {b.sourceLabel || 'Source'}
        </a>
      )}
    </div>
  );
}
