import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { getEventStatus, getRecentlyEndedEvent, REFERRAL_CODE } from '@/data/events';
import { formatMonthDayUTC } from '@/lib/format';

// dayonecitizen.com owns "should I buy" (content-ownership rule), so the buy
// decision hands off there. The paint-gift details also live on dayone.
const BUY_GUIDE_URL =
  'https://dayonecitizen.com/day-one-citizen/starter-package?utm_source=freeflyevent&utm_medium=referral&utm_campaign=free-fly-ended';
const PAINT_URL =
  'https://dayonecitizen.com/referral-code?utm_source=freeflyevent&utm_medium=referral&utm_campaign=free-fly-ended#welcome-gift';
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? 'https://discord.gg/MpAUJs9xet';

/**
 * Shown for 30 days after a Free Fly ends (and only while no other Free Fly is
 * live). Free Fly players who signed up with the code are already permanent
 * referrals; this tells them the code needs no further action when they buy,
 * hands the buy decision to dayonecitizen.com, and offers a way to hear about
 * the next Free Fly.
 */
export function PostFreeFlyBlock({ placement }: { placement: 'home' | 'iae' }) {
  const status = getEventStatus();
  if (status.state === 'ACTIVE') return null;
  const ev = getRecentlyEndedEvent();
  if (!ev) return null;
  const endedOn = formatMonthDayUTC(new Date(ev.end));

  // On the homepage this is its own full-width section; on /iae-2956 it sits
  // inside the page's existing narrow column, so it skips the outer container.
  const outerCls = placement === 'home' ? 'container-narrow py-12 sm:py-16' : 'mt-10';

  return (
    <section className={outerCls} aria-labelledby={`post-free-fly-${placement}`}>
      <div className="card border-accent/30 sm:p-8">
        <span className="eyebrow">
          The {ev.name} Free Fly ended {endedOn}
        </span>
        <h2
          id={`post-free-fly-${placement}`}
          className="heading-display mt-4 text-2xl sm:text-3xl"
        >
          Played during the Free Fly? Your code is already locked in.
        </h2>
        <div className="mt-5 space-y-4 text-white/85">
          <p>
            If you created your RSI account with code{' '}
            <strong className="text-white">{REFERRAL_CODE}</strong>, the 50,000 UEC
            bonus is already on your account. The code stays tied to it for good.
            When you buy a game package, today or months from now, there is
            nothing else to enter.
          </p>
          <p>
            Not sure the game is for you yet? Day One Citizen explains what the
            starter package includes and who it suits.
          </p>
          <p>
            Bought the First Flight Pack with the code? I also send you a free
            paint for your Aurora Mk II.{' '}
            <Link
              href={PAINT_URL}
              className="text-accent underline-offset-4 hover:underline"
            >
              How the paint gift works
            </Link>
            .
          </p>
        </div>
        <div className="mt-6">
          <CTAButton href={BUY_GUIDE_URL} trackingLabel={`postff-buy-guide-${placement}`}>
            Is the starter package worth it?
          </CTAButton>
        </div>
        <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 text-sm text-white/80 sm:grid-cols-2">
          <p>
            <strong className="text-white">Missed the code?</strong> RSI lets you
            add a referral code within 24 hours of creating your account. After
            that it can&apos;t be added.
          </p>
          <p>
            <strong className="text-white">Want to know when the next Free Fly starts?</strong>{' '}
            <Link
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              Join our Discord
            </Link>{' '}
            and follow #announcements. The dates go up there as soon as RSI
            announces them.
          </p>
        </div>
      </div>
    </section>
  );
}
