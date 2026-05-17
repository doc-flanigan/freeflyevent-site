import { NextRequest, NextResponse } from 'next/server'

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

    const timestamp = new Date().toISOString()
    const sheetUrl = process.env.CLICK_TRACKER_SHEET_URL
    const discordUrl = process.env.DISCORD_CLICK_WEBHOOK_URL

    const calls: Promise<unknown>[] = []

    if (sheetUrl) {
      calls.push(
        fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timestamp, site, label, referralCode, page }),
        }).catch((err) => console.error('[track-click] Sheet error:', err))
      )
    }

    if (discordUrl) {
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
    }

    await Promise.all(calls)
  } catch (err) {
    console.error('[track-click] Unexpected error:', err)
  }

  return NextResponse.json({ ok: true })
}
