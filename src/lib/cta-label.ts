import type { EventStatus } from '@/data/events';

/** Homepage action-button label. "Play Free" only while a Free Fly is actually live. */
export function primaryCtaLabel(status: EventStatus): string {
  return status.state === 'ACTIVE'
    ? 'Play Free — Claim 50,000 UEC'
    : 'Create Free Account — Lock In 50,000 UEC';
}
