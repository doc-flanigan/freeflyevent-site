import Image from 'next/image';
import Link from 'next/link';
import { HUB_URL, REFERRAL_CODE } from '@/data/events';
import { CopyCodeButton } from './CopyCodeButton';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-spaceBlack pb-[72px] md:pb-0">
      <div className="container-wide grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <h4 className="font-display text-base font-bold text-white">
            freefly<span className="text-accent">event</span>
            <span className="ml-0.5 text-xs font-semibold text-muted">.com</span>
          </h4>
          <p className="mt-3 text-sm text-muted">
            Star Citizen Free Fly tracker. Built by{' '}
            <Link
              href={HUB_URL}
              target="_blank"
              rel="noopener"
              className="text-accent hover:underline"
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
              <Link href="/" className="text-white/80 hover:text-accent">
                Current Event
              </Link>
            </li>
            <li>
              <Link href="/event-guide" className="text-white/80 hover:text-accent">
                Event Guide
              </Link>
            </li>
            <li>
              <Link href="/event-history" className="text-white/80 hover:text-accent">
                Event History
              </Link>
            </li>
            <li>
              <Link href="/event-guide" className="text-white/80 hover:text-accent">
                How to claim your bonus
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
            Referral Code
          </h4>
          <div data-final-cta className="mt-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <code data-ref-code className="font-mono text-base text-gold">{REFERRAL_CODE}</code>
              <CopyCodeButton location="footer" size="sm" />
            </div>
            <div className="mt-1 text-xs text-muted">
              Use at signup for 50,000 UEC bonus.
            </div>
          </div>
          <Link
            href={HUB_URL}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm text-muted hover:text-accent"
          >
            Visit dayonecitizen.com ↗
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide grid gap-0 py-8 text-xs leading-relaxed text-muted md:grid-cols-3 md:gap-10">
          <section
            aria-labelledby="footer-fan-site"
            className="border-b border-border/60 pb-6 md:border-b-0 md:pb-0"
          >
            <h5
              id="footer-fan-site"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
            >
              Unofficial fan site
            </h5>
            <p className="mt-2">
              This is an unofficial Star Citizen fansite, not affiliated with the
              Cloud Imperium group of companies. All content not authored by
              Doc_Flanigan is property of its respective owners.
            </p>
          </section>

          <section
            aria-labelledby="footer-affiliate"
            className="border-b border-border/60 py-6 md:border-b-0 md:border-l md:py-0 md:pl-10"
          >
            <h5
              id="footer-affiliate"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
            >
              Affiliate disclosure
            </h5>
            <p className="mt-2">
              Affiliate disclosure: If you create a Star Citizen account using referral code STAR-GCQJ-N6NC, the site owner may receive an in-game bonus. Your 50,000 UEC new-player bonus is not affected.
            </p>
          </section>

          <section
            aria-labelledby="footer-fankit"
            className="pt-6 md:border-l md:border-border/60 md:pl-10 md:pt-0"
          >
            <h5
              id="footer-fankit"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
            >
              Fan Kit &amp; copyright
            </h5>
            <div className="mt-3 flex items-center gap-4">
              <Image
                src="/images/made-by-community.png"
                alt="Made by the Community — RSI Fankit"
                width={160}
                height={160}
                className="h-24 w-24 shrink-0 opacity-90"
              />
              <span>© {new Date().getUTCFullYear()} Doc_Flanigan</span>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
