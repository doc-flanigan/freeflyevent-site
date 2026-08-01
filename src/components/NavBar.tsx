'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/is-star-citizen-free', label: 'Is It Free?' },
  { href: '/next-free-fly', label: 'Next Free Fly' },
  { href: '/event-guide', label: 'Guide' },
  { href: '/event-history', label: 'History' },
  { href: '/free-fly-schedule', label: 'Schedule' },
  { href: '/should-i-buy', label: 'Should I Buy?' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-orange/10 bg-spaceBlack/85 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl'
          : 'border-b border-white/5 bg-spaceBlack/60 backdrop-blur-md'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            freefly<span className="text-orange">event</span>
            <span className="ml-0.5 text-xs font-semibold text-muted">.com</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:bg-orange after:transition-transform after:duration-300 after:ease-spring ${
                  active
                    ? 'text-orange after:scale-x-100'
                    : 'text-white/80 after:scale-x-0 hover:bg-white/5 hover:text-orange hover:after:scale-x-100'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden rounded-md border border-white/10 p-2 text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-spaceBlack lg:hidden">
          <div className="container-wide flex flex-col py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm hover:bg-white/5 hover:text-orange ${
                  pathname === l.href ? 'text-orange' : 'text-white/80'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-b from-orange-bright via-orange to-orange-dark shadow-[0_4px_16px_-6px_rgba(255,85,0,0.7)] transition-transform duration-300 ease-spring group-hover:-translate-y-0.5"
    >
      <svg width="18" height="18" viewBox="0 0 512 512" fill="none">
        <path d="M416 96 L112 248 L246 284 Z" fill="#080c14" />
        <path d="M416 96 L246 284 L278 400 L330 302 Z" fill="#080c14" fillOpacity="0.75" />
      </svg>
    </span>
  );
}
