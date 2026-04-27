'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEventStatus, REFERRAL_URL, type EventStatus } from '@/data/events';
import { CountdownTimer } from './CountdownTimer';

type Props = {
  /** "bar" = compact horizontal strip for the very top of the page.
   *  "hero" = large card used in the homepage hero section. */
  variant?: 'bar' | 'hero';
};

export function EventStatusBanner({ variant = 'bar' }: Props) {
  const [status, setStatus] = useState<EventStatus | null>(null);

  useEffect(() => {
    setStatus(getEventStatus());
    // refresh every minute so banner state flips automatically
    const id = setInterval(() => setStatus(getEventStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    // Render a stable, accessible placeholder that occupies the same space.
    return variant === 'bar' ? (
      <div className="h-10 w-full bg-blackMid" aria-hidden />
    ) : (
      <div className="h-48 w-full rounded-2xl border border-white/10 bg-blackMid" aria-hidden />
    );
  }

  if (variant === 'bar') return <Bar status={status} />;
  return <Hero status={status} />;
}

function Bar({ status }: { status: EventStatus }) {
  if (status.state === 'ACTIVE') {
    return (
      <div className="relative w-full overflow-hidden border-b border-orange/40 bg-orange text-spaceBlack">
        <div className="absolute inset-0 animate-pulse-orange" aria-hidden />
        <div className="container-wide relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center text-sm font-semibold">
          <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-spaceBlack" aria-hidden />
          <span className="uppercase tracking-[0.2em]">Free Fly Active Now</span>
          <span className="font-normal opacity-80">{status.event.name}</span>
          <span className="hidden sm:inline opacity-60">·</span>
          <CountdownTimer target={status.endsAt} variant="compact" />
          <Link
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener"
            className="ml-2 rounded-md bg-spaceBlack px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange transition-transform hover:-translate-y-0.5"
          >
            Play Free →
          </Link>
        </div>
      </div>
    );
  }

  if (status.state === 'UPCOMING') {
    return (
      <div className="w-full border-b border-orange/30 bg-blackMid text-white">
        <div className="container-wide flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-sm">
          <span className="text-orange">●</span>
          <span className="font-semibold uppercase tracking-[0.2em] text-orange">
            Upcoming
          </span>
          <span>{status.event.name} starts in</span>
          <CountdownTimer target={status.startsAt} variant="compact" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-white/10 bg-blackMid text-muted">
      <div className="container-wide px-4 py-2 text-center text-sm">
        No Free Fly currently active —{' '}
        <Link href="/event-history" className="text-orange hover:underline">
          see past events
        </Link>{' '}
        or sign up now and lock in your referral bonus.
      </div>
    </div>
  );
}

function Hero({ status }: { status: EventStatus }) {
  if (status.state === 'ACTIVE') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-orange/60 bg-gradient-to-br from-orange/20 via-spaceBlack to-spaceBlack p-8 sm:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange/30 blur-3xl" aria-hidden />
        <div className="relative flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange bg-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-spaceBlack">
            <span className="h-2 w-2 animate-ping rounded-full bg-spaceBlack" aria-hidden />
            Active Now — Play Free
          </span>
          <h2 className="heading-display text-3xl sm:text-4xl">{status.event.name}</h2>
          <p className="max-w-xl text-white/80">
            Star Citizen is free to play right now. No purchase required. Don&apos;t
            miss it — when the timer hits zero, the game returns to paid.
          </p>
          <CountdownTimer target={status.endsAt} label="Event ends in" />
          <Link
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener"
            className="btn-primary px-8 py-4 text-base"
          >
            Create Your Free Account & Claim 50,000 UEC →
          </Link>
        </div>
      </div>
    );
  }

  if (status.state === 'UPCOMING') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-orange/30 bg-blackMid p-8 sm:p-10">
        <div className="flex flex-col items-start gap-5">
          <span className="eyebrow">Next Free Fly</span>
          <h2 className="heading-display text-3xl sm:text-4xl">{status.event.name}</h2>
          <p className="max-w-xl text-muted">
            Mark your calendar. When the event opens, anyone can play Star Citizen
            for free. Sign up now with a referral code so your 50,000 UEC bonus is
            ready when you launch the game.
          </p>
          <CountdownTimer target={status.startsAt} label="Begins in" />
          <Link
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener"
            className="btn-primary px-8 py-4 text-base"
          >
            Pre-Register & Lock In Bonus →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-blackMid p-8 sm:p-10">
      <div className="flex flex-col items-start gap-5">
        <span className="eyebrow text-muted/80">Currently No Active Event</span>
        <h2 className="heading-display text-3xl sm:text-4xl">
          The next Free Fly is on the horizon.
        </h2>
        <p className="max-w-xl text-muted">
          {status.nextLikely}{' '}
          You can still create a Star Citizen account today and lock in the
          50,000 UEC bonus — your account will be ready the moment the event opens.
        </p>
        <Link
          href={REFERRAL_URL}
          target="_blank"
          rel="noopener"
          className="btn-secondary px-8 py-4 text-base"
        >
          Create Account & Reserve Bonus →
        </Link>
      </div>
    </div>
  );
}
