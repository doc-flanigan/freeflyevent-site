'use client';

import { useEffect, useRef, useState } from 'react';
import { REFERRAL_CODE, REFERRAL_URL } from '@/data/events';
import { logClick } from '@/lib/log-click';

type Props = {
  /** Where the button sits — logged as `copy-code:<location>`. */
  location: string;
  size?: 'sm' | 'md';
  className?: string;
  /**
   * Element holding the visible code text. If the Clipboard API is unavailable
   * or throws, its text is selected so the visitor can copy it by hand.
   * Defaults to the nearest `[data-ref-code]` element in the parent.
   */
  codeRef?: React.RefObject<HTMLElement>;
};

export function CopyCodeButton({ location, size = 'md', className = '', codeRef }: Props) {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const selectFallback = () => {
    const el = codeRef?.current ?? btnRef.current?.parentElement?.querySelector<HTMLElement>('[data-ref-code]');
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
    } catch {
      selectFallback();
      return;
    }
    logClick(`copy-code:${location}`, REFERRAL_URL);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const sizeCls = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={`inline-flex min-w-[5.5rem] items-center justify-center rounded-md border border-accent/50 font-semibold uppercase tracking-wide text-accent transition-colors hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${sizeCls} ${className}`}
    >
      {copied ? 'Copied!' : 'Copy code'}
    </button>
  );
}
