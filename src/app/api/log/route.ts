import { NextRequest, NextResponse } from 'next/server'

// Abuse guards, held in module scope. Vercel's Fluid Compute reuses warm
// instances across requests, so these maps persist long enough to throttle
// a burst even without external storage. A determined attacker rotating IPs
// still needs the WAF/BotID layer — this stops replay loops and crawlers.
const WINDOW_MS = 60_000
const MAX_EVENTS_PER_IP = 10
const DUP_COOLDOWN_MS = 30_000
const MAX_DISCORD_PER_WINDOW = 5

const ipHits = new Map<string, number[]>()
const recentEvents = new Map<string, number>()
let discordWindowStart = 0
let discordSent = 0

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

// The site's own pages are the only legitimate caller. Same-origin fetch
// always carries an Origin header on POST; curl/replay scripts carry neither.
function sameOrigin(req: NextRequest): boolean {
  const host = req.headers.get('host')
  const source = req.headers.get('origin') ?? req.headers.get('referer')
  if (!host || !source) return false
  try {
    const strip = (h: string) => h.replace(/^www\./, '')
    return strip(new URL(source).host) === strip(host)
  } catch {
    return false
  }
}

function overIpLimit(ip: string, now: number): boolean {
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > now - WINDOW_MS)
  hits.push(now)
  ipHits.set(ip, hits)
  if (ipHits.size > 1000) {
    ipHits.forEach((v, k) => {
      if (v[v.length - 1] < now - WINDOW_MS) ipHits.delete(k)
    })
  }
  return hits.length > MAX_EVENTS_PER_IP
}

function isDuplicate(key: string, now: number): boolean {
  const last = recentEvents.get(key)
  recentEvents.set(key, now)
  if (recentEvents.size > 2000) {
    recentEvents.forEach((t, k) => {
      if (t < now - DUP_COOLDOWN_MS) recentEvents.delete(k)
    })
  }
  return last !== undefined && now - last < DUP_COOLDOWN_MS
}

// 'send' for the first 5 clicks per minute, one 'summary' warning embed
// when the cap trips, then 'drop' until the window resets. Sheet logging
// is unaffected — only Discord notifications are muted.
function discordMode(now: number): 'send' | 'summary' | 'drop' {
  if (now - discordWindowStart > WINDOW_MS) {
    discordWindowStart = now
    discordSent = 0
  }
  discordSent++
  if (discordSent <= MAX_DISCORD_PER_WINDOW) return 'send'
  return discordSent === MAX_DISCORD_PER_WINDOW + 1 ? 'summary' : 'drop'
}

// Non-reversible short hash so the Sheet can correlate a burst to one client
// without storing raw IPs.
function ipHash(ip: string): string {
  let h = 5381
  for (let i = 0; i < ip.length; i++) h = ((h << 5) + h + ip.charCodeAt(i)) | 0
  return (h >>> 0).toString(16)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    const { label, referralCode, page, site } = body as Record<string, unknown>

    if (
      typeof label !== 'string' ||
      typeof referralCode !== 'string' ||
      typeof page !== 'string' ||
      typeof site !== 'string'
    ) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const MAX = 200
    if ([label, referralCode, page, site].some((v) => (v as string).length > MAX)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    if (!sameOrigin(req)) {
      return NextResponse.json({ ok: false }, { status: 403 })
    }

    const now = Date.now()
    const ip = clientIp(req)

    if (overIpLimit(ip, now)) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    if (isDuplicate(`${ip}|${site}|${label}|${page}`, now)) {
      return NextResponse.json({ ok: true, deduped: true })
    }

    const sheetLabel = label.startsWith('impression:') ? label : `click:${label}`

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'short', timeStyle: 'medium' }) + ' CST'
    const sheetUrl = process.env.CLICK_TRACKER_SHEET_URL
    const discordUrl = process.env.DISCORD_CLICK_WEBHOOK_URL

    const calls: Promise<unknown>[] = []

    if (sheetUrl) {
      calls.push(
        fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp,
            site,
            label: sheetLabel,
            referralCode,
            page,
            ipHash: ipHash(ip),
            userAgent: (req.headers.get('user-agent') ?? '').slice(0, 200),
          }),
        }).catch((err) => console.error('[track-click] Sheet error:', err))
      )
    }

    if (discordUrl && !label.startsWith('impression:')) {
      const mode = discordMode(now)
      if (mode === 'send') {
        calls.push(
          fetch(discordUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              embeds: [
                {
                  title: 'Referral Click',
                  color: 0xf0c040,
                  fields: [
                    { name: 'Site', value: site, inline: true },
                    { name: 'CTA Label', value: label, inline: true },
                    { name: 'Referral Code', value: referralCode, inline: true },
                    { name: 'Page', value: page, inline: true },
                  ],
                  footer: { text: timestamp },
                },
              ],
            }),
          }).catch((err) => console.error('[track-click] Discord error:', err))
        )
      } else if (mode === 'summary') {
        calls.push(
          fetch(discordUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              embeds: [
                {
                  title: '⚠️ Click flood — alerts muted',
                  color: 0xff4040,
                  description: `More than ${MAX_DISCORD_PER_WINDOW} clicks on ${site} within a minute. Further Discord alerts are muted for this window; Sheet logging continues.`,
                  footer: { text: timestamp },
                },
              ],
            }),
          }).catch((err) => console.error('[track-click] Discord error:', err))
        )
      }
    }

    await Promise.all(calls)
  } catch (err) {
    console.error('[track-click] Unexpected error:', err)
  }

  return NextResponse.json({ ok: true })
}
