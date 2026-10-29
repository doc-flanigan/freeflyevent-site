'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator';
import { getActiveBonusOverride, getEventStatus } from '@/data/events';
import { logClick } from '@/lib/log-click';
import { ctaLabel } from '@/lib/cta-label';

// Server HTML (and crawlers) get the not-live label; the effect below switches
// to "Play Free" only while a Free Fly is actually ACTIVE.
const DEFAULT_LABEL = ctaLabel('button', 'INACTIVE');

const CTA_VARIANT_KEY = 'cta_variant';

/**
 * Sticky visitor-level A/B assignment. Reads localStorage; if unset, assigns
 * 'a' or 'b' at random and persists so the same visitor sees the same variant
 * on every button and every visit. Client-only — call from an effect.
 */
export function getCtaVariant(): 'a' | 'b' {
  if (typeof window === 'undefined') return 'a';
  try {
    const stored = window.localStorage.getItem(CTA_VARIANT_KEY);
    if (stored === 'a' || stored === 'b') return stored;
    const assigned = Math.random() < 0.5 ? 'a' : 'b';
    window.localStorage.setItem(CTA_VARIANT_KEY, assigned);
    return assigned;
  } catch {
    return 'a'; // localStorage unavailable (private mode etc.)
  }
}

type Props = {
  children?: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackingLabel?: string;
  /** A/B copy test: two button-text variants. Assignment is sticky per visitor. */
  variants?: { a: string; b: string };
  /** Log a viewport impression. Off for always-visible buttons (nav), where it would just mirror pageviews. */
  trackImpression?: boolean;
};

export function CTAButton({
  children,
  href: hrefProp,
  variant = 'primary',
  size = 'md',
  className = '',
  trackingLabel,
  variants,
  trackImpression = true,
}: Props) {
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL);
  const [defaultLabel, setDefaultLabel] = useState(DEFAULT_LABEL);
  const [abVariant, setAbVariant] = useState<'a' | 'b'>('a');
  useEffect(() => {
    setReferralUrl(getRotatedReferralUrl());
    const state = getEventStatus().state;
    setDefaultLabel(ctaLabel(getActiveBonusOverride() ? 'buttonBonus' : 'button', state));
    if (variants) setAbVariant(getCtaVariant());
  }, [variants]);

  const variantSuffix = variants ? `~${abVariant}` : '';

  const href = hrefProp ?? referralUrl;
  const sizeCls =
    size === 'lg' ? 'px-8 py-4 text-base' : size === 'sm' ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm';
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  const linkRef = useRef<HTMLAnchorElement>(null);
  const impressionFired = useRef(false);
  useEffect(() => {
    const el = linkRef.current;
    if (!el || !trackImpression) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionFired.current) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        impressionFired.current = true;
        observer.disconnect();
        logClick(`impression:${trackingLabel ?? 'unknown'}${variantSuffix}`, href);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [href, trackingLabel, variants, abVariant, variantSuffix, trackImpression]);

  const handleClick = () => {
    logClick(`${trackingLabel ?? 'unknown'}${variantSuffix}`, href);
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener' : undefined}
      className={`group ${base} ${sizeCls} ${className}`}
      onClick={handleClick}
    >
      <span>{variants ? variants[abVariant] : (children ?? defaultLabel)}</span>
      <ArrowIcon />
    </Link>
  );
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`${className} transition-transform duration-300 ease-spring group-hover:translate-x-1`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
