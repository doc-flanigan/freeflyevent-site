'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator';
import { getActiveBonusOverride } from '@/data/events';

const DEFAULT_LABEL = 'Play Free — Claim Your 50,000 UEC Bonus';
const BONUS_LABEL = 'Play Free — 50,000 UEC + Drake Gear Pack';

type Props = {
  children?: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
  trackingLabel?: string;
};

export function CTAButton({
  children,
  href: hrefProp,
  variant = 'primary',
  size = 'md',
  className = '',
  trackingLabel,
}: Props) {
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL);
  const [defaultLabel, setDefaultLabel] = useState(DEFAULT_LABEL);
  useEffect(() => {
    setReferralUrl(getRotatedReferralUrl());
    setDefaultLabel(getActiveBonusOverride() ? BONUS_LABEL : DEFAULT_LABEL);
  }, []);

  const href = hrefProp ?? referralUrl;
  const sizeCls = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  const handleClick = () => {
    const code = href.split('referral=')[1] ?? ''
    fetch('/api/log', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: trackingLabel ?? 'unknown',
        referralCode: code,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {})
  }

  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener' : undefined}
      className={`${base} ${sizeCls} ${className}`}
      onClick={handleClick}
    >
      <span>{children ?? defaultLabel}</span>
      <ArrowIcon />
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
