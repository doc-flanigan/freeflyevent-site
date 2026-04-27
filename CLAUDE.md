# CLAUDE.md — freeflyevent.com

## Project Overview
Event tracker site for Star Citizen Free Fly events — periods when anyone can
play Star Citizen for free without purchasing. Highest-traffic moments in the
SC calendar. New players who find this site during a Free Fly event are the
highest-intent audience in the entire portfolio: they're actively trying the
game RIGHT NOW. Convert them to referral signups before the event ends.

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
  Referral Bonus, o7citizen.com

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
  - Links to o7citizen.com glossary for terms
  - CTAButton

### Agent 5 — Event History Page (/event-history)
  - Full EventHistoryTable with sortable columns
  - "Subscribe for event alerts" → newsletter at o7citizen.com

### Agent 6 — SEO & Build
  - Sitemap, robots, OG meta
  - Event schema (Event type JSON-LD) for current/upcoming events
  - npm run build passes

## Referral URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
## Hub Link: https://o7citizen.com
## Color Palette: spaceBlack #080c14, orange #ff5500
## Footer: Standard three-section
## Urgency Note: During active Free Fly events this site is the #1 conversion
   opportunity. EventStatusBanner should be unmissable.
## Commit Convention: feat/fix/seo/docs: [description]

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
