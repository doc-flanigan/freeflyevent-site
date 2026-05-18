'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { HUB_URL } from '@/data/events';

export type GlossaryTerm = {
  term: string;
  definition: string;
  category: string;
  also?: string;
};

type Props = {
  terms: GlossaryTerm[];
};

const CATEGORY_ORDER = ['Currency', 'Gameplay', 'Community', 'Technical', 'Locations', 'Ships'];

export function GlossaryClient({ terms }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const present = new Set(terms.map((t) => t.category));
    return ['All', ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [terms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...terms]
      .sort((a, b) => a.term.localeCompare(b.term))
      .filter((t) => {
        if (activeCategory !== 'All' && t.category !== activeCategory) return false;
        if (!q) return true;
        return (
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          (t.also?.toLowerCase().includes(q) ?? false)
        );
      });
  }, [terms, query, activeCategory]);

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search terms…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-blackMid py-2.5 pl-9 pr-4 text-sm text-white placeholder-muted outline-none focus:border-orange/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                activeCategory === cat
                  ? 'bg-orange text-spaceBlack'
                  : 'border border-white/10 text-muted hover:border-orange/40 hover:text-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count + full-glossary link */}
      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <span>{filtered.length} term{filtered.length !== 1 ? 's' : ''}</span>
        <Link
          href={`${HUB_URL}/glossary`}
          target="_blank"
          rel="noopener"
          className="text-orange hover:underline"
        >
          Full glossary (200+ terms) at dayonecitizen.com →
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-blackMid/60 p-10 text-center text-muted">
          No terms match &ldquo;{query}&rdquo;.{' '}
          <Link href={`${HUB_URL}/glossary`} target="_blank" rel="noopener" className="text-orange hover:underline">
            Try the full glossary →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={t.term}
              className="rounded-xl border border-white/10 bg-blackMid/60 p-5"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="font-display text-base font-bold text-orange leading-tight">
                  {t.term}
                </span>
                <span className="mt-0.5 flex-shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  {t.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">{t.definition}</p>
              {t.also && (
                <p className="mt-2 text-xs text-muted">
                  Also: <span className="font-mono text-white/60">{t.also}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
