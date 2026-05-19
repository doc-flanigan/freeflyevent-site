import { NextRequest, NextResponse } from 'next/server'
import { getGiveawayLimiter, getClientIp } from '@/lib/ratelimit'

const MAX = 200
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const limiter = getGiveawayLimiter()
  if (limiter) {
    const ip = getClientIp(req)
    const { success, reset } = await limiter.limit(ip)
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  const { handle, email, discord, confirmed } = body as Record<string, unknown>

  if (
    typeof handle !== 'string' ||
    typeof email !== 'string' ||
    (discord !== undefined && typeof discord !== 'string') ||
    typeof confirmed !== 'boolean'
  ) {
    return NextResponse.json({ ok: false, error: 'bad_shape' }, { status: 400 })
  }

  const h = handle.trim()
  const e = email.trim()
  const d = (discord as string | undefined)?.trim() ?? ''

  if (!h || !e || !confirmed) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }
  if (h.length > MAX || e.length > MAX || d.length > MAX) {
    return NextResponse.json({ ok: false, error: 'too_long' }, { status: 400 })
  }
  if (!EMAIL_RE.test(e)) {
    return NextResponse.json({ ok: false, error: 'bad_email' }, { status: 400 })
  }

  const timestamp =
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'short',
      timeStyle: 'medium',
    }) + ' CST'

  const discordUrl = process.env.DISCORD_GIVEAWAY_WEBHOOK_URL
  if (!discordUrl) {
    console.error('[giveaway-entry] DISCORD_GIVEAWAY_WEBHOOK_URL not configured')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 })
  }

  try {
    const res = await fetch(discordUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: 'Ship Giveaway Entry',
            color: 0x3d9be9,
            fields: [
              { name: 'RSI Handle', value: h, inline: true },
              { name: 'Email', value: e, inline: true },
              { name: 'Discord', value: d || '(not provided)', inline: true },
              { name: 'Confirmed referral usage', value: 'Yes', inline: false },
            ],
            footer: { text: timestamp },
          },
        ],
      }),
    })

    if (!res.ok) {
      console.error('[giveaway-entry] Discord webhook failed:', res.status)
      return NextResponse.json({ ok: false, error: 'webhook_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('[giveaway-entry] Discord error:', err)
    return NextResponse.json({ ok: false, error: 'webhook_error' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
