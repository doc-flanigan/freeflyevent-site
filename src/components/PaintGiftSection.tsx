import Image from 'next/image';
import { CTAButton } from '@/components/CTAButton';

const CLAIM_URL =
  'https://dayonecitizen.com/referral-code?utm_source=freeflyevent&utm_medium=section&utm_campaign=welcome-gift#welcome-gift';

export function PaintGiftSection({ placement }: { placement: 'home' | 'iae' }) {
  return (
    <section id="welcome-gift" className="container-narrow py-12 sm:py-16">
      <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-blackMid md:flex md:min-h-[30rem] md:flex-col md:justify-end">
        <Image
          src="/images/aurora-mk2-cloudbuster.webp"
          alt="RSI Aurora Mk II starter ship in the Cloudbuster paint, parked in a hangar"
          width={1600}
          height={900}
          loading="lazy"
          sizes="(min-width: 1024px) 960px, 100vw"
          className="aspect-video h-auto w-full object-cover md:absolute md:inset-0 md:-z-10 md:h-full"
        />
        <div
          aria-hidden
          className="hidden md:absolute md:inset-y-0 md:left-0 md:-z-10 md:block md:w-[55%] md:bg-gradient-to-r md:from-spaceBlack md:via-spaceBlack/80 md:to-transparent"
        />
        <div className="bg-blackMid p-6 sm:p-8 md:relative md:bg-transparent md:p-10">
          <div className="md:max-w-[46%]">
            <span className="eyebrow">New recruit welcome gift</span>
            <h2 className="heading-display mt-3 text-2xl md:text-xl lg:text-2xl">
              This paint is yours if you join with our code
            </h2>
            <p className="mt-3 text-sm text-white/85 md:text-xs lg:text-sm">
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
