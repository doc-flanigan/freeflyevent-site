import Link from 'next/link'

const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? 'https://discord.gg/vHjvDxHQP2'

export function DiscordCTA() {
  return (
    <div className="mt-3 text-center">
      <p className="text-sm" style={{ color: '#6b7890' }}>
        Already signed up?{' '}
        <Link
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ff7733' }}
          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Join the DayOneCitizen Discord
        </Link>{' '}
        for starter help and ship advice.
      </p>
    </div>
  )
}
