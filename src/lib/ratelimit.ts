import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let _limiter: Ratelimit | null = null

/**
 * Lazy singleton. Returns null if UPSTASH_REDIS_REST_URL /
 * UPSTASH_REDIS_REST_TOKEN aren't set — callers should treat that as
 * "rate limiting disabled" (useful for local dev without Upstash creds).
 */
export function getGiveawayLimiter(): Ratelimit | null {
  if (_limiter) return _limiter
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  _limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: 'rl:giveaway',
  })
  return _limiter
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]!.trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return '0.0.0.0'
}
