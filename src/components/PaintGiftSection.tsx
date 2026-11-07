import Image from 'next/image';
import { CTAButton } from '@/components/CTAButton';

const CLAIM_URL =
  'https://dayonecitizen.com/referral-code?utm_source=freeflyevent&utm_medium=section&utm_campaign=welcome-gift#welcome-gift';

export function PaintGiftSection({ placement }: { placement: 'home' | 'iae' }) {
  return (
    <section id="welcome-gift" className="container-narrow py-12 sm:py-16">
      <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-spaceBlack">
        <Image
          src="/images/aurora-mk2-cloudbuster.webp"
          alt="RSI Aurora Mk II starter ship in the Cloudbuster paint, parked in a hangar"
          width={1600}
          height={900}
          loading="lazy"
          sizes="(min-width: 1024px) 960px, 100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-tr from-spaceBlack via-spaceBlack/80 to-transparent"
        />
        <div className="flex min-h-[26rem] flex-col justify-end p-6 sm:min-h-[24rem] sm:aspect-video sm:p-10">
          <div className="max-w-xl">
            <span className="eyebrow">New recruit welcome gift</span>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              This paint is yours if you join with our code
            </h2>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              This is the Aurora Mk II, the ship in the First Flight Pack, wearing the Cloudbuster
              paint. RSI sells that paint only to its Concierge backers, so a new account cannot
              buy it. Create your account with code STAR-GCQJ-N6NC, buy the First Flight Pack, and
              the site owner sends you the paint within a day of claiming. It is a personal gift
              from him, not an RSI reward, and your 50,000 UEC bonus is unchanged.
            </p>
            <div className="mt-5">
              <CTAButton href={CLAIM_URL} trackingLabel={`PaintGift-${placement}`}>
                How to claim it
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">Image: Cloud Imperium Games</p>
    </section>
  );
}
