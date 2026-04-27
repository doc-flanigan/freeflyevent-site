# RUNBOOK — freeflyevent.com

Quick reference for the maintainer. For architecture and component design, read `CLAUDE.md`.

## Prerequisites (one time, ever)

Set your Anthropic API key in your Windows user environment so every shell and editor on this machine can find it. From PowerShell:

```
[Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-...', 'User')
```

Close every terminal, editor, and Claude Code window afterwards — they only pick up the new variable when launched fresh. Verify in a new PowerShell with `echo $env:ANTHROPIC_API_KEY` (should print your key) and in Git Bash with `echo $ANTHROPIC_API_KEY` (same).

## When CIG announces a new Free Fly

1. Grab the official RSI Comm-Link URL for the announcement.
2. From the `freeflyevent-site/` directory:
   ```
   npm run propose-event -- <url>
   ```
3. Read the proposal. Confidence `high` is usually safe; `medium` means double-check dates against the source; `low` means verify everything.
4. Paste the entry at the top of `FREE_FLY_HISTORY` in `src/data/events.ts`. Keep the array newest-first.
5. Commit and push:
   ```
   git add src/data/events.ts
   git commit -m "feat: add <event-id>"
   git push
   ```
6. Vercel auto-deploys from `main`. The banner flips to UPCOMING (or ACTIVE if the start date has already passed) on the next page load.

## Day-to-day commands

| Want to... | Run |
|---|---|
| Start the dev server | `npm run dev` |
| Run a production build to check for errors | `npm run build` |
| Add a new event from a Comm-Link URL | `npm run propose-event -- <url>` |

## Troubleshooting

- **`ANTHROPIC_API_KEY is not set`** — your terminal was open before the key was set. Close it, open a fresh one.
- **`401 authentication_error`** — the key is wrong, was deleted in the Anthropic console, or your Anthropic account has no billing.
- **Script reports `found: false`** — the page isn't a Free Fly announcement (it's a patch note, ship sale, etc.). Try a different URL.
- **Banner shows the wrong state** — check `src/data/events.ts`. State derives from current time vs event `start`/`end` — if dates look right, the banner is correct.
