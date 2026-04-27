import Link from 'next/link';
import { REFERRAL_URL } from '@/data/events';

type Props = {
  children?: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
};

export function CTAButton({
  children = 'Play Free — Claim Your 50,000 UEC Bonus',
  href = REFERRAL_URL,
  variant = 'primary',
  size = 'md',
  className = '',
}: Props) {
  const sizeCls = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener' : undefined}
      className={`${base} ${sizeCls} ${className}`}
    >
      <span>{children}</span>
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
