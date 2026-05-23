import Image from 'next/image';
import Link from 'next/link';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-spaceBlack">
      <div className="container-wide grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <h4 className="font-display text-base font-bold text-white">freeflyevent.com</h4>
          <p className="mt-3 text-sm text-muted">
            Star Citizen Free Fly tracker. Built by{' '}
            <Link
              href={HUB_URL}
              target="_blank"
              rel="noopener"
              className="text-orange hover:underline"
            >
              Doc_Flanigan
            </Link>{' '}
            for new players. Part of the dayonecitizen.com fan-site network.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
            Site
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-white/80 hover:text-orange">
                Current Event
              </Link>
            </li>
            <li>
              <Link href="/event-guide" className="text-white/80 hover:text-orange">
                Event Guide
              </Link>
            </li>
            <li>
              <Link href="/event-history" className="text-white/80 hover:text-orange">
                Event History
              </Link>
            </li>
            <li>
              <Link href="/event-guide" className="text-white/80 hover:text-orange">
                How to claim your bonus
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
            Referral Code
          </h4>
          <div className="mt-3 rounded-lg border border-orange/30 bg-orange/5 p-3">
            <div className="font-mono text-base text-orange">{REFERRAL_CODE}</div>
            <div className="mt-1 text-xs text-muted">
              Use at signup for 50,000 UEC bonus.
            </div>
          </div>
          <Link
            href={HUB_URL}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm text-muted hover:text-orange"
          >
            Visit dayonecitizen.com ↗
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/made-by-community.png"
              alt="Made by the Community — RSI Fankit"
              width={120}
              height={40}
              className="h-10 w-auto opacity-80"
            />
            <span>
              This is an unofficial Star Citizen fansite, not affiliated with the
              Cloud Imperium group of companies. All content not authored by
              Doc_Flanigan is property of its respective owners.{' '}
              Affiliate disclosure: If you create a Star Citizen account using referral code STAR-GCQJ-N6NC, the site owner may receive an in-game bonus. Your 50,000 UEC new-player bonus is not affected.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getUTCFullYear()} Doc_Flanigan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
