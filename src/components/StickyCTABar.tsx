'use client';

import { useEffect, useState } from 'react';
import { CTAButton } from './CTAButton';
import { REFERRAL_CODE } from '@/data/events';

/**
 * Mobile-only bottom bar. Hidden until the hero CTA (`[data-hero-cta]`) has
 * scrolled out of view — or, on pages without one, after 300px of scroll — and
 * hidden again while the final CTA (`[data-final-cta]`) is on screen.
 * IntersectionObserver only; no scroll listeners.
 */
export function StickyCTABar() {
  const [pastHero, setPastHero] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const observers: IntersectionObserver[] = [];
    let cleanupSentinel: (() => void) | undefined;
    const hero = document.querySelector('[data-hero-cta]');
    if (hero) {
      const o = new IntersectionObserver(([e]) => {
        // Only "scrolled past" counts (hero above the viewport), not "not yet reached".
        setPastHero(!e.isIntersecting && e.boundingClientRect.bottom < 0);
      });
      o.observe(hero);
      observers.push(o);
    } else {
      // Sentinel 300px down the page; once it has scrolled above the viewport, show.
      const sentinel = document.createElement('div');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'position:absolute;top:300px;left:0;width:1px;height:1px;pointer-events:none';
      document.body.appendChild(sentinel);
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.bottom < 0));
      o.observe(sentinel);
      observers.push(o);
      cleanupSentinel = () => sentinel.remove();
    }

    const final = document.querySelector('[data-final-cta]');
    if (final) {
      const o = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting));
      o.observe(final);
      observers.push(o);
    }
    return () => {
      observers.forEach((o) => o.disconnect());
      cleanupSentinel?.();
    };
  }, []);

  const show = pastHero && !finalVisible;

  return (
    // Fixed slot with reserved height: the bar itself only slides/fades inside it, so nothing reflows.
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[64px] md:hidden"
      aria-hidden={!show}
    >
      <div
        className={`pointer-events-auto flex h-full items-center gap-3 border-t border-accent/40 bg-blackMid px-4 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.8)] ${
          animate ? 'transition-[transform,visibility] duration-300 ease-out' : ''
        } ${show ? 'translate-y-0' : 'invisible translate-y-full'}`}
      >
        <code className="min-w-0 flex-1 truncate font-mono text-sm font-bold text-gold">{REFERRAL_CODE}</code>
        <CTAButton size="sm" trackingLabel="sticky-bar" trackImpression={false} className="shrink-0">
          Create Free Account
        </CTAButton>
      </div>
    </div>
  );
}
