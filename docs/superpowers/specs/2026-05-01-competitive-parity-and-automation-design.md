# freeflyevent.com — Competitive Parity + Automation Design

**Date:** 2026-05-01
**Status:** Approved

## Background

Competitor audit of citizenfreefly.com identified five content and feature gaps. A sixth item — fully automated event data maintenance — was added to eliminate manual upkeep entirely.

---

## Scope

Six changes in one implementation pass:

1. Fix Invictus 2026 event dates
2. Backfill missing Free Fly events in `events.ts`
3. Add "10× more" framing to referral copy
4. New `/tools` page — community tools directory
5. New `/star-citizen-events` page — annual in-universe event calendar
6. GitHub Actions automation — `free-fly-watch.yml` + Claude agent that auto-updates `events.ts`

---

## 1. Fix Invictus 2026 Dates

**File:** `src/data/events.ts`

Current entry has `start: '2026-05-22T17:00:00Z'`. Citizenfreefly.com shows the combined Drake DefenseCon / Invictus Launch Week event as May 14–27 2026. Verify against RSI Comm-Links API before writing; use the confirmed dates and update the `name` field to reflect DefenseCon branding if confirmed.

---

## 2. Backfill Missing Free Fly Events

**File:** `src/data/events.ts`

The site currently tracks 8 events (Invictus + IAE only, back to 2022). CIG runs ~5 Free Fly events per year including smaller themed events. Add confirmed events verified against RSI Comm-Links, including at minimum:

- Captains of Industry Free Fly (April 9–20, 2026)
- Coramor 2026 (February 12–23, 2026)
- Any other confirmed 2024–2026 events found in Comm-Links

Each new entry must include `source` field pointing to the official RSI Comm-Link URL. Keep array sorted newest-first.

---

## 3. Referral Copy — "10× More" Framing

**Files:** `src/app/page.tsx`, `src/app/event-guide/page.tsx`

Every instance of bare "50,000 UEC" in referral-focused copy should become "50,000 UEC — ten times more than the old reward" on first mention per page. Subsequent mentions keep the bare number. Do not change CTA button labels (those are under 25 chars by convention).

---

## 4. New `/tools` Page

### Route
`src/app/tools/page.tsx`

### Data file
`src/data/tools.ts`

```ts
export type CommunityTool = {
  id: string;
  name: string;
  description: string; // one sentence, plain English
  url: string;
  category: 'Trading' | 'Ships' | 'Navigation' | 'Community' | 'Loadouts';
};
```

### Initial tool list (10 tools)
Sourced from citizenfreefly.com/star-citizen-community-tools/ and verified as live:

| Name | Category | URL |
|---|---|---|
| CCU Game | Ships | ccugame.app |
| Fleetviewer | Ships | hangar.link/fleet/canvas |
| Universal Item Finder | Navigation | finder.cstone.space |
| Erkul DPS Calculator | Loadouts | erkul.games/live/calculator |
| SC Ships Performance Viewer | Ships | spviewer.eu |
| UEX Corp | Trading | uexcorp.space |
| SC Trade Tools | Trading | sc-trade.tools |
| ATLAS Ship Layout Tool | Navigation | maps.adi.sc |
| SC Mission Database | Community | scmdb.net |
| Star Citizen Characters | Community | star-citizen-characters.com |

### Page design
- SEO title: "Star Citizen Community Tools — Essential Player Resources | freeflyevent.com"
- Intro paragraph: plain-English explanation of what these tools are and why new players should bookmark them
- Card grid (2-col mobile, 3-col desktop): tool name, category badge, one-sentence description, "Open tool →" link
- No CTA button at bottom (tools page is utility, not conversion; referral is in footer/nav as always)
- Add "Tools" to NavBar `LINKS` array and Footer quick links

### Sitemap
Add `/tools` entry: priority 0.7, monthly change frequency

---

## 5. New `/star-citizen-events` Page

### Route
`src/app/star-citizen-events/page.tsx`

### Data file
`src/data/annual-events.ts`

```ts
export type AnnualEvent = {
  id: string;
  name: string;         // official CIG event name
  inLoreName?: string;  // in-universe name if different
  month: number;        // 1–12, typical occurrence month
  description: string;  // 2–3 sentences, plain English
  includesFreeFly: boolean;
  typicalDurationDays?: number;
};
```

### Initial event list (12 events)
All 12 in-universe annual holidays from CIG's calendar:

| Event | Month | Free Fly? |
|---|---|---|
| Red Festival (Lunar New Year) | 1–2 | No |
| Coramor (Valentine's Day) | 2 | Yes (some years) |
| Stella Fortuna (St. Patrick's Day) | 3 | No |
| Triggerfish (April Fools) | 4 | No |
| Invictus Launch Week / DefenseCon | 5 | Yes |
| First Contact / Alien Week | 6 | Occasionally |
| Foundation Festival | 7 | No |
| Ship Showdown | 8 | Yes (test flights) |
| Pirate Week | 9 | No |
| Day of the Vara (Halloween) | 10 | No |
| CitizenCon | 10 | No |
| Intergalactic Aerospace Expo (IAE) | 11–12 | Yes |
| Luminalia (Christmas) | 12 | No |

### Page design
- SEO title: "Star Citizen Annual Events Calendar — Every In-Game Holiday | freeflyevent.com"
- Intro: explain these are CIG's recurring yearly events, some include Free Fly access
- Card grid sorted by month: event name, typical month, "Includes Free Fly" badge if true, 2-sentence description
- "Free Fly events" callout section at top linking to `/event-history` for historical dates
- Add "All Events" to NavBar `LINKS` array and Footer quick links, pointing to `/star-citizen-events`

### Sitemap
Add `/star-citizen-events` entry: priority 0.7, yearly change frequency

---

## 6. Automation — Free Fly Watch Pipeline

This is the same architectural pattern as dayonecitizen's `sc-news-watch.yml`, adapted for Free Fly event detection and data-file updates instead of content generation.

### Components

#### `.github/workflows/free-fly-watch.yml`

**Trigger:** Daily cron at `23:30 UTC`. Also `workflow_dispatch` with optional `force` boolean input.

**Permissions:** `contents: write`, `pull-requests: write`

**Concurrency:** group `free-fly-watch`, cancel-in-progress false

**Steps:**
1. Checkout repo
2. Read `.github/free-fly-state.json` — extract `latest_comm_link_iso` (last seen Comm-Link timestamp)
3. Poll `https://api.star-citizen.wiki/api/comm-links?limit=5` — get latest timestamp
4. Skip if no new Comm-Links since last run AND `force != true`
5. Skip if any `free-fly/auto-*` PR is already open (pile-up guard)
6. Update state file with new timestamp
7. Setup Node 20, install `@anthropic-ai/claude-code`
8. Run agent (see below) with `ANTHROPIC_API_KEY`
9. Create branch `free-fly/auto-YYYYMMDD-HHMM`
10. `git add src/data/events.ts .github/free-fly-state.json`
11. If no staged diff → exit 0 (no changes, skip PR)
12. Commit + push branch
13. Open PR with `gh pr create`
14. Enable auto-merge on the PR: `gh pr merge --auto --squash`

**Auto-merge behaviour:** When the `build` status check passes, GitHub auto-squash-merges the PR. Vercel deploys automatically on merge to main. User never touches the PR.

#### `.claude/agents/free-fly-updater.md`

Agent model: `claude-sonnet-4-6` (needs reasoning, not just speed)

Agent instructions:
- Fetch the 10 most recent RSI Comm-Links via `curl https://api.star-citizen.wiki/api/comm-links?limit=10`
- Scan each for Free Fly keywords: "free fly", "free-fly", "fleet week", "invictus", "IAE", "intergalactic aerospace", "defensecon", "ship showdown", "alien week"
- For any matching Comm-Link, extract: event name, start date, end date (UTC), ships/content available, source URL
- Read current `src/data/events.ts`
- Add any events not already present (check by `id` derived from event name + year)
- Do NOT touch `src/data/annual-events.ts` — that file is evergreen static content managed manually
- Do NOT modify `getEventStatus()`, `REFERRAL_URL`, `REFERRAL_CODE`, or `HUB_URL`
- Do NOT run git commands (workflow handles that)

#### `.github/free-fly-state.json`

Initial content:
```json
{
  "latest_comm_link_iso": "",
  "last_checked_utc": ""
}
```

#### `ci.yml` (existing, no change needed)

The existing `ci.yml` build check is what auto-merge waits on. No modifications required.

### Prerequisites (repo settings, one-time)
- GitHub Secrets: `ANTHROPIC_API_KEY` must be set
- Settings → Actions → General → Workflow permissions: "Allow GitHub Actions to create and approve pull requests" must be enabled

These are documented in the RUNBOOK — add a section there.

---

## NavBar & Footer Changes Summary

| Item | Change |
|---|---|
| NavBar `LINKS` | Add `{ href: '/tools', label: 'Tools' }` and `{ href: '/star-citizen-events', label: 'All Events' }` |
| Footer quick links | Add Tools and All Events links |
| Sitemap | Add `/tools` and `/star-citizen-events` entries |

---

## File Changelist

| File | Action |
|---|---|
| `src/data/events.ts` | Update Invictus 2026 dates; add missing events |
| `src/data/tools.ts` | Create |
| `src/data/annual-events.ts` | Create |
| `src/app/page.tsx` | Add "10×" framing to referral sections |
| `src/app/event-guide/page.tsx` | Add "10×" framing to referral sections |
| `src/app/tools/page.tsx` | Create |
| `src/app/star-citizen-events/page.tsx` | Create |
| `src/app/sitemap.ts` | Add two new routes |
| `src/components/NavBar.tsx` | Add two nav links |
| `src/components/Footer.tsx` | Add two footer links |
| `.claude/agents/free-fly-updater.md` | Create |
| `.github/workflows/free-fly-watch.yml` | Create |
| `.github/free-fly-state.json` | Create |
| `RUNBOOK.md` | Add automation prerequisites section |

---

## Out of Scope

- Video embeds (deferred — specific video TBD)
- Squadron 42 coverage (different audience focus)
- Email broadcast (no newsletter on this site)
