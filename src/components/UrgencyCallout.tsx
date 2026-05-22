'use client'

// Remove from page.tsx after May 27, 2026
const EVENT_END = new Date('2026-05-28T00:00:00Z')

export function UrgencyCallout() {
  if (new Date() >= EVENT_END) return null
  return (
    <div className="mx-auto max-w-2xl px-4 py-3">
      <div
        className="rounded-lg border px-4 py-3 text-sm text-center"
        style={{ borderColor: '#ff5500', backgroundColor: '#1a0800', color: '#ffcca0' }}
      >
        <strong>Free Fly ends May 27.</strong>{' '}
        Buy a starter pack before it ends and you keep the ships you&apos;ve been flying — your progress carries over.
      </div>
    </div>
  )
}
