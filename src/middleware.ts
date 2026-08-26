import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'

// AI-bot fetch logger — permanent, queryable record of which AI engines read
// which pages. Rows land in the shared click-tracking Sheet with an `ai-bot:`
// label prefix (Sheet only, no Discord — volume would drown the channel).
// Classic search crawlers (bingbot, googlebot, …) are deliberately NOT logged;
// BWT/GSC already cover them. Response is never blocked: logging rides
// event.waitUntil after NextResponse.next().

const AI_BOTS: Array<[RegExp, string]> = [
  [/ChatGPT-User/i, 'chatgpt-user'],
  [/OAI-SearchBot/i, 'oai-searchbot'],
  [/GPTBot/i, 'gptbot'],
  [/ChatGPT/i, 'chatgpt-other'],
  [/Claude-User/i, 'claude-user'],
  [/Claude-SearchBot/i, 'claude-searchbot'],
  [/ClaudeBot|anthropic-ai/i, 'claudebot'],
  [/Perplexity-User/i, 'perplexity-user'],
  [/PerplexityBot/i, 'perplexitybot'],
  [/DuckAssistBot/i, 'duckassistbot'],
  [/Amazonbot/i, 'amazonbot'],
  [/meta-externalagent|meta-webindexer/i, 'meta-ai'],
  [/Bytespider/i, 'bytespider'],
  [/Google-Extended/i, 'google-extended'],
  [/cohere-ai/i, 'cohere'],
  [/MistralAI/i, 'mistral'],
  [/YouBot/i, 'youbot'],
  [/Applebot-Extended/i, 'applebot-extended'],
]

// Canonical-hijack hardening (2026-08): a page that fails to hydrate can
// still serve a 200 with Next's generic error shell, which Google has been
// clustering with a spam mirror (747live.bet) and hijacking the canonical
// from. Stamping every real HTML page with an authoritative `Link: rel=
// canonical` header gives Google a signal that survives even a broken
// client-side render. Convention matches the `<link rel="canonical">` tag
// every page already emits via `alternates.canonical` in its metadata: apex
// host, no trailing slash (root canonicalizes to the bare origin — see
// src/app/layout.tsx SITE_URL / src/app/page.tsx alternates). Only applied
// to actual page routes — API routes, _next assets, and anything with a
// file extension (robots.txt, sitemap.xml, llms.txt, icons) are skipped so
// the header never contradicts a resource that isn't an HTML page.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeflyevent.com'
const HAS_FILE_EXTENSION = /\.[a-zA-Z0-9]+$/

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const ua = req.headers.get('user-agent') ?? ''
  const hit = AI_BOTS.find(([re]) => re.test(ua))
  const sheetUrl = process.env.CLICK_TRACKER_SHEET_URL

  if (hit && sheetUrl) {
    const timestamp =
      new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        dateStyle: 'short',
        timeStyle: 'medium',
      }) + ' CST'
    event.waitUntil(
      fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp,
          site: (req.headers.get('host') ?? 'unknown').replace(/^www\./, ''),
          label: `ai-bot:${hit[1]}`,
          referralCode: '-',
          page: req.nextUrl.pathname,
          ipHash: '-',
          userAgent: ua.slice(0, 200),
        }),
      }).catch(() => {})
    )
  }

  const res = NextResponse.next()

  const { pathname } = req.nextUrl
  if (
    req.method === 'GET' &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_next/') &&
    !HAS_FILE_EXTENSION.test(pathname)
  ) {
    const canonicalPath = pathname.replace(/\/$/, '')
    res.headers.set('Link', `<${SITE_URL}${canonicalPath}>; rel="canonical"`)
  }

  return res
}

// Pages, llms.txt, robots.txt, and sitemaps — the fetches that mean an AI is
// reading content. Static assets and API routes are excluded to keep
// middleware invocations (billed) near zero for human traffic. (The
// canonical-header logic above further narrows itself to real page routes
// within this same matcher scope — see HAS_FILE_EXTENSION check.)
export const config = {
  matcher: [
    '/((?!_next/|api/|.*\\.(?:jpg|jpeg|png|gif|svg|ico|webp|avif|css|js|map|woff2?)$).*)',
  ],
}
