'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator';
import { getActiveBonusOverride } from '@/data/events';

const DEFAULT_LABEL = 'Play Free — Claim 50,000 UEC';
const BONUS_LABEL = 'Play Free — 50,000 UEC + Event Bonus';

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
  size?: 'md' | 'lg';
  className?: string;
  trackingLabel?: string;
  /** A/B copy test: two button-text variants. Assignment is sticky per visitor. */
  variants?: { a: string; b: string };
};

export function CTAButton({
  children,
  href: hrefProp,
  variant = 'primary',
  size = 'md',
  className = '',
  trackingLabel,
  variants,
}: Props) {
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL);
  const [defaultLabel, setDefaultLabel] = useState(DEFAULT_LABEL);
  const [abVariant, setAbVariant] = useState<'a' | 'b'>('a');
  useEffect(() => {
    setReferralUrl(getRotatedReferralUrl());
    setDefaultLabel(getActiveBonusOverride() ? BONUS_LABEL : DEFAULT_LABEL);
    if (variants) setAbVariant(getCtaVariant());
  }, [variants]);

  const variantSuffix = variants ? `~${abVariant}` : '';

  const href = hrefProp ?? referralUrl;
  const sizeCls = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  const linkRef = useRef<HTMLAnchorElement>(null);
  const impressionFired = useRef(false);
  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionFired.current) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        impressionFired.current = true;
        observer.disconnect();
        const code = href.split('referral=')[1] ?? ''
        fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            label: `impression:${trackingLabel ?? 'unknown'}${variantSuffix}`,
            referralCode: code,
            page: window.location.pathname,
            site: window.location.hostname,
          }),
        }).catch(() => {})
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [href, trackingLabel, variants, abVariant, variantSuffix]);

  const handleClick = () => {
    const code = href.split('referral=')[1] ?? ''
    fetch('/api/log', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: `${trackingLabel ?? 'unknown'}${variantSuffix}`,
        referralCode: code,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {})
  }

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
