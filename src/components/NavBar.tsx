'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HUB_URL } from '@/data/events';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#current-event', label: 'Current Event' },
  { href: '/event-guide', label: 'Event Guide' },
  { href: '/event-history', label: 'Event History' },
  { href: '/#referral-bonus', label: 'Referral Bonus' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 bg-spaceBlack/80 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            freeflyevent<span className="text-orange">.com</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-orange"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={HUB_URL}
            target="_blank"
            rel="noopener"
            className="ml-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted transition-colors hover:border-orange/40 hover:text-orange"
          >
            o7citizen.com ↗
          </Link>
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
                className="rounded-md px-3 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-orange"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={HUB_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm text-muted hover:bg-white/5 hover:text-orange"
            >
              o7citizen.com ↗
            </Link>
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
      className="flex h-8 w-8 items-center justify-center rounded-md border border-orange/40 bg-orange/10 text-orange"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" />
      </svg>
    </span>
  );
}
