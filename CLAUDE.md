# CLAUDE.md — freeflyevent.com

## Project Overview
Event tracker site for Star Citizen Free Fly events — periods when anyone can
play Star Citizen for free without purchasing. Highest-traffic moments in the
SC calendar. New players who find this site during a Free Fly event are the
highest-intent audience in the entire portfolio: they're actively trying the
game RIGHT NOW. Convert them to referral signups before the event ends.

## Quick Reference
```
Referral code:  STAR-GCQJ-N6NC
Enlist URL:     https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub:            https://dayonecitizen.com
Conventions:    E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

## Agentic Build Instructions
Incremental agents. Confirm each before proceeding.

### Agent 1 — Scaffold
- Next.js 14, TypeScript, Tailwind CSS, framer-motion
- Color palette:
    spaceBlack: '#080c14'
    blackMid: '#0f1520'
    orange: '#ff5500'
    orangeDark: '#cc4400'
    white: '#f5f8ff'
    muted: '#6b7890'
- 12 hero image placeholders
- Confirm dev server

### Agent 2 — Components
- HeroCarousel.tsx (12 slides)
- EventStatusBanner.tsx: ACTIVE (orange pulse) / UPCOMING (countdown) /
  INACTIVE (next event TBD) states. This is the most important component.
- CountdownTimer.tsx: days/hours/minutes/seconds to event end or start
- CTAButton.tsx: "Play Free — Claim Your 50,000 UEC Bonus"
  → referral URL
- EventCard.tsx: event name, dates, what's included, referral bonus status
- EventHistoryTable.tsx: all past free fly events with dates
- FreeFlyGuide.tsx: "What to do during your Free Fly" checklist component
- Footer.tsx
- NavBar.tsx: links: Home, Current Event, Event Guide, Event History,
  Referral Bonus, dayonecitizen.com

### Agent 3 — Homepage (/)
URGENCY IS THE DESIGN PRINCIPLE. If an event is active, this should feel
like a landing page, not a content site.
  - SEO: title="Star Citizen Free Fly Events 2026 — Play Free, No Purchase"
    description="Star Citizen Free Fly events let anyone play the game for
    free. Find current event dates, what's included, and how to get your
    50,000 UEC referral bonus."
  - EventStatusBanner: FULL WIDTH, top of page, above nav
  - H1: "Star Citizen Free Fly Events"
  - HeroCarousel
  - Sections:
    * "Is There a Free Fly Event Right Now?" — EventStatusBanner large version
    * "What Is a Free Fly Event?" — plain English explainer
    * "What Can You Do During Free Fly?" — FreeFlyGuide checklist
    * "The Referral Bonus During Free Fly" — URGENT: use code before event ends
    * CTAButton: "Create Your Free Account Now"
    * "⚠️ Important: Use a Referral Code at Signup — You Cannot Add It Later"
      (the 24-hour grace period warning, prominent)
    * Upcoming / Current Event details
    * EventHistoryTable
  - Footer
  Confirm renders. EventStatusBanner must be visually dominant.

### Agent 4 — Event Guide Page (/event-guide)
  - "Your First Free Fly — A Complete Beginner's Guide"
  - Step-by-step: sign up → referral code → download → what to do first
  - Links to dayonecitizen.com glossary for terms
  - CTAButton

### Agent 5 — Event History Page (/event-history)
  - Full EventHistoryTable with sortable columns
  - "Subscribe for event alerts" → newsletter at dayonecitizen.com

### Agent 6 — SEO & Build
  - Sitemap, robots, OG meta
  - Event schema (Event type JSON-LD) for current/upcoming events
  - npm run build passes

## Color Palette
  --space-black: #080c14
  --black-mid: #0f1520
  --orange: #ff5500
  --orange-dark: #cc4400
  --white: #f5f8ff
  --muted: #6b7890

## Urgency Note
During active Free Fly events this site is the #1 conversion opportunity in
the portfolio. EventStatusBanner must be unmissable above the fold.

## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.

## Maintenance

### Adding a new Free Fly event
When the user mentions that a new Free Fly was announced, or asks how to add an
event, walk them through this. The full step-by-step (including API key setup
and troubleshooting) lives in `RUNBOOK.md` at the repo root.

1. Get the official RSI Comm-Link URL for the announcement.
2. From the `freeflyevent-site/` directory, run:
   `npm run propose-event -- <announcement-url>`
   This sends the page to Claude and prints a proposed `FreeFlyEvent` entry
   matching the existing schema. Requires `ANTHROPIC_API_KEY` set in the
   user's Windows environment — one-time setup, see RUNBOOK.md.
3. Verify the dates against the source page before trusting them. The script
   reports a `confidence` value (high / medium / low); always cross-check.
4. Paste the entry at the top of `FREE_FLY_HISTORY` in `src/data/events.ts`.
   Keep the array newest-first.
5. Commit with `feat: add <event-id>` (e.g. `feat: add invictus-2026`) and push.

The banner state, countdown, homepage hero card, and Event JSON-LD schema all
derive from `FREE_FLY_HISTORY` via `getEventStatus()` in `src/data/events.ts` —
no other files need editing when an event is added.

## Data Verification Rule (READ THIS BEFORE EDITING src/data/events.ts)

Every entry in `FREE_FLY_HISTORY` must be verifiable against an official RSI
Comm-Link. Do not use third-party event trackers as the source of truth.

Authoritative sources for event data:
1. **Star Citizen Wiki API** — `https://api.star-citizen.wiki/api/comm-links`
   Search by event name. The field `translations.en_EN` contains the full
   Comm-Link body. This is the easiest way in — RSI Comm-Link pages are
   JS-rendered and block most scrapers.
2. **Official RSI** — `robertsspaceindustries.com` Free Fly event pages directly.

When adding a new event entry:
- Set the `source` field to the Comm-Link URL you verified against.
- Verify both the event dates AND the included ships before saving.
- If a Comm-Link describes only one side of the referral reward, look for the
  event-overview Comm-Link — it usually documents both sides. Use that one.

The banner state, countdown, homepage hero card, and Event JSON-LD schema all
derive from `FREE_FLY_HISTORY` via `getEventStatus()` — no other files need
editing when an event is added.

## Click Tracking

Added 2026-05-17. Every referral CTA click fires a background POST to `/api/log` which writes a row to the shared Google Sheet and posts an embed to the #referral-clicks Discord channel.

**Env vars required** (Vercel project settings + `.env.local`):
- `CLICK_TRACKER_SHEET_URL` — Google Apps Script web app deploy URL
- `DISCORD_CLICK_WEBHOOK_URL` — Discord channel webhook URL

**Key files:**
- `src/app/api/log/route.ts` — server-side handler (parallel Sheet + Discord calls)
- `src/components/CTAButton.tsx` — `handleClick` fires the fetch on CTA click

> **Note:** Endpoint was renamed from `/api/track-click` → `/api/log` because adblocker filter lists (EasyPrivacy, uBlock Origin) blocked the original URL pattern client-side.

### TODO: Verify end-to-end on this site
- [ ] Click CTA **with** adblocker enabled → Sheet row appears within 5s
- [ ] Click CTA **with** adblocker enabled → Discord embed appears in #referral-clicks
- [ ] Click CTA **without** adblocker → same as above

## Ship Giveaway Entries (RETIRED 2026-07-03)

The DefenseCon 2956 giveaway ended 2026-05-28. The form
(`public/giveaway.html`), the `/api/giveaway-entry` route, and
`src/lib/ratelimit.ts` were removed on 2026-07-03; `/giveaway.html` now
301s to `/` (Bing had indexed it). The giveaway env vars
(`DISCORD_GIVEAWAY_WEBHOOK_URL`, `GIVEAWAY_SHEET_URL`, Upstash pair) are
unused and can be deleted from Vercel. The setup notes below are kept for
the next giveaway.

Historical design: static form at `/giveaway.html` POSTed to
`/api/giveaway-entry`, which fanned the entry out **in parallel** to a
Discord channel (live notifications) and a Google Sheet (durable record /
CSV export for Random.org). The entry was accepted if **at least one**
sink succeeded; if both failed the route returned 502 and the form showed
the retry message.

**Env vars required** (Vercel project settings + `.env.local`):
- `DISCORD_GIVEAWAY_WEBHOOK_URL` — Discord channel webhook (e.g. `#giveaway-entries`)
- `GIVEAWAY_SHEET_URL` — Google Apps Script web app deploy URL (giveaway-specific Sheet)
- `UPSTASH_REDIS_REST_URL` — Upstash Redis REST URL (rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis REST token (rate limiting)

Rate limit: 3 entries per IP per hour (sliding window). If the Upstash
env vars are unset the route falls through to the handler — useful for
local dev, but **set both in production** so the limiter is active.

The Sheet receives JSON: `{ timestamp, handle, email, discord, confirmed }`.
Reuses the same Apps Script pattern as `CLICK_TRACKER_SHEET_URL` but is a
**separate Sheet + script** because the column schema differs.

**Key files:**
- `src/app/api/giveaway-entry/route.ts` — server handler (validates + fans out)
- `src/lib/ratelimit.ts` — Upstash limiter singleton + client IP helper
- `public/giveaway.html` — standalone form

### TODO: Upstash setup
- [x] Create a free Redis database at [console.upstash.com](https://console.upstash.com) (pick a region close to the Vercel deployment region)
- [x] Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the database page
- [x] Add both env vars to Vercel (Production + Preview + Development) and to local `.env.local`
- [x] Add `DISCORD_GIVEAWAY_WEBHOOK_URL` to the same env scopes (webhook from `#giveaway-entries` Discord channel)
- [x] Redeploy
- [x] Verify: submit a valid entry → embed appears in `#giveaway-entries` within ~2s
- [x] Verify: submit 4× from the same IP → 4th submission shows the rate-limit message

### TODO: Google Sheet setup
- [x] Create a new Google Sheet titled "freeflyevent giveaway entries"
- [x] Add header row: `Timestamp | RSI Handle | Email | Discord | Confirmed`
- [x] Extensions → Apps Script → paste the code below, deploy as a web app (execute as: me, access: anyone), copy the deploy URL
- [x] Add `GIVEAWAY_SHEET_URL` to Vercel (Production + Preview + Development) and `.env.local`
- [x] Redeploy
- [x] Verify: submit a valid entry → new row appears in the Sheet within ~5s

Apps Script body (paste into the new script's `Code.gs`):

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.handle,
    data.email,
    data.discord || '',
    data.confirmed ? 'Yes' : 'No',
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## SEO

**Network role:** Bing authority hub — permanent
**Search engine:** Bing (primary), Google

**Primary keywords:**
- "star citizen free fly event"
- "star citizen free fly 2026"
- "is star citizen free to play"
- "when is the next star citizen free fly"
- "star citizen free fly dates"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: Prominent "New to Star Citizen? Start here" callout — highest-priority link on this site
- → screferralreward.com: "Claim your 50,000 UEC referral bonus when you enlist"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only
- Target new keywords without updating `E:\Claude Code\sc-portfolio\docs\seo\keyword-research.md`

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
