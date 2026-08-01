'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LightboxImage } from './LightboxImage';
import { getEventStatus, getActiveBonusOverride, type EventStatus, type BonusOverride } from '@/data/events';
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator';
import { CountdownTimer } from './CountdownTimer';
import { ArrowIcon } from './CTAButton';

type Props = {
  /** "bar" = compact horizontal strip for the very top of the page.
   *  "hero" = large card used in the homepage hero section. */
  variant?: 'bar' | 'hero';
};

type SlotProps = { status: EventStatus; referralUrl: string; onNavigate: () => void; bonusOverride: BonusOverride | null };

export function EventStatusBanner({ variant = 'bar' }: Props) {
  const [status, setStatus] = useState<EventStatus | null>(null);
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL);
  const [bonusOverride, setBonusOverride] = useState<BonusOverride | null>(null);

  useEffect(() => {
    setStatus(getEventStatus());
    setReferralUrl(getRotatedReferralUrl());
    setBonusOverride(getActiveBonusOverride());
    // refresh every minute so banner state flips automatically
    const id = setInterval(() => {
      setStatus(getEventStatus());
      setBonusOverride(getActiveBonusOverride());
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleNavigate = () => {
    const code = referralUrl.split('referral=')[1] ?? '';
    fetch('/api/log', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: 'EventStatusBanner',
        referralCode: code,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {});
  };

  if (!status) {
    // Render a stable, accessible placeholder that occupies the same space.
    return variant === 'bar' ? (
      <div className="h-10 w-full bg-blackMid" aria-hidden />
    ) : (
      <div className="h-48 w-full rounded-2xl border border-white/10 bg-blackMid" aria-hidden />
    );
  }

  const slotProps: SlotProps = { status, referralUrl, onNavigate: handleNavigate, bonusOverride };
  if (variant === 'bar') return <Bar {...slotProps} />;
  return <Hero {...slotProps} />;
}

function CancelledBar({ eventName, referralUrl, onNavigate }: { eventName: string; referralUrl: string; onNavigate: () => void }) {
  return (
    <div className="w-full border-b border-orange/30 bg-blackMid text-white">
      <div className="container-wide flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-sm">
        <span className="font-semibold text-orange">{eventName} Free Fly Cancelled</span>
        <span className="opacity-60 hidden sm:inline">·</span>
        <span className="text-muted">50,000 UEC referral bonus still available at signup.</span>
        <a
          href={referralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-2 inline-flex items-center gap-1.5 rounded-md border border-orange/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange transition-transform hover:-translate-y-0.5"
          onClick={onNavigate}
        >
          Claim Bonus
          <ArrowIcon className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function Bar({ status, referralUrl, onNavigate, bonusOverride }: SlotProps) {
  if (status.state === 'CANCELLED_FREE_FLY') {
    return <CancelledBar eventName={status.event.name} referralUrl={referralUrl} onNavigate={onNavigate} />;
  }

  if (status.state === 'ACTIVE') {
    return (
      <div className="relative w-full overflow-hidden border-b border-orange/40 bg-orange text-spaceBlack">
        <div className="absolute inset-0 animate-pulse-orange" aria-hidden />
        <div className="container-wide relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center text-sm font-semibold">
          <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-spaceBlack" aria-hidden />
          <span className="uppercase tracking-[0.2em]">Free Fly Active</span>
          <span className="hidden sm:inline opacity-60">·</span>
          <span className="font-normal opacity-90">Play free right now — no purchase needed</span>
          <a
            href={referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group ml-2 inline-flex items-center gap-1.5 rounded-md bg-spaceBlack px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange transition-transform hover:-translate-y-0.5"
          >
            Start Playing Free
            <ArrowIcon className="h-3 w-3" />
          </a>
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
        or{' '}
        <a
          href={referralUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="text-orange hover:underline"
        >
          sign up now and lock in your referral bonus
        </a>
        .
      </div>
    </div>
  );
}

function Hero({ status, referralUrl, onNavigate, bonusOverride }: SlotProps) {
  if (status.state === 'CANCELLED_FREE_FLY') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-blackMid p-8 sm:p-10">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-muted">
            Free Fly Cancelled — {status.event.name}
          </span>
          <h2 className="heading-display text-3xl sm:text-4xl">
            First ever Free Fly cancellation.<br />
            <span className="text-orange">The bonus still works.</span>
          </h2>
          <p className="max-w-xl text-white/80">
            CIG pulled the Free Fly portion of {status.event.name} due to server performance issues —
            the first time this has happened in Star Citizen history. The event and ship
            showcases continue, but free public access was removed.{' '}
            <a href="#cancellation" className="text-orange underline underline-offset-2 hover:text-orange/80">
              Watch CIG&apos;s official explanation ↓
            </a>
          </p>

          {/* Two-column value props */}
          <div className="grid gap-4 sm:grid-cols-2 w-full max-w-2xl">
            <div className="rounded-xl border border-orange/30 bg-orange/10 p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
                Still Available — Free Account
              </div>
              <p className="text-sm text-white/85">
                Create a free RSI account now and paste a referral code at signup.
                You receive <strong className="text-white">50,000 UEC</strong> the moment you log in — no purchase needed.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                If You Buy a Game Package
              </div>
              <p className="text-sm text-white/85">
                Purchasing a Game Package during {status.event.name} still qualifies
                for any active referral bonus.{' '}
                <strong className="text-white">The referral code must be applied at signup.</strong>
              </p>
            </div>
          </div>

          <a
            href={referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-primary px-8 py-4 text-base"
            onClick={onNavigate}
          >
            Create Free Account — Claim 50,000 UEC
            <ArrowIcon />
          </a>
        </div>
      </div>
    );
  }

  if (status.state === 'ACTIVE') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-orange/60 bg-gradient-to-br from-orange/20 via-spaceBlack to-spaceBlack p-8 sm:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange/30 blur-3xl" aria-hidden />
        <div className={`relative grid gap-8 lg:items-start ${bonusOverride ? 'lg:grid-cols-2' : ''}`}>

          {/* LEFT — identity + countdown + CTA */}
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange bg-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-spaceBlack">
              <span className="h-2 w-2 animate-ping rounded-full bg-spaceBlack" aria-hidden />
              Active Now — Play Free
            </span>
            <h2 className="heading-display text-3xl sm:text-4xl">{status.event.name}</h2>
            <p className="text-white/80">
              Star Citizen is free to play right now. No purchase required. Don&apos;t
              miss it — when the timer hits zero, the game returns to paid.
            </p>
            <CountdownTimer target={status.endsAt} label="Event ends in" />
            <a
              href={referralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-primary px-8 py-4 text-base"
              onClick={onNavigate}
            >
              {bonusOverride
                ? 'Claim 50,000 UEC + Event Bonus'
                : 'Create Free Account — Claim 50,000 UEC'}
              <ArrowIcon />
            </a>
          </div>

          {/* RIGHT — event bonus panel (only when a bonus override is active) */}
          {bonusOverride && (
            <div className="flex flex-col gap-3 rounded-xl border border-orange/50 bg-orange/10 p-4">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-orange-bright">
                Limited Signup Bonus — Through{' '}
                {new Date(bonusOverride.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </div>
              {bonusOverride.image && (
                <LightboxImage
                  src={bonusOverride.image.src}
                  alt={bonusOverride.image.alt}
                  width={600}
                  height={338}
                  containerClassName="rounded-lg border-2 border-orange/70 shadow-[0_0_20px_rgba(255,85,0,0.35)]"
                  className="w-full h-auto"
                />
              )}
              <p className="text-sm text-white/90">
                Sign up with a referral code and receive{' '}
                <strong className="text-white">{bonusOverride.text}</strong>. Bonus ends{' '}
                {new Date(bonusOverride.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
              </p>
            </div>
          )}

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
          <a
            href={referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-primary px-8 py-4 text-base"
            onClick={onNavigate}
          >
            Pre-Register — Lock In Your Bonus
            <ArrowIcon />
          </a>
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
        <a
          href={referralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group btn-secondary px-8 py-4 text-base"
          onClick={onNavigate}
        >
          Create Account — Reserve Your Bonus
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
