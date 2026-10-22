import { getEventStatus } from '@/data/events';
import { ctaLabel } from '@/lib/cta-label';
import { StickyCTABarClient } from './StickyCTABarClient';

/** Server wrapper: label is derived per render (pages revalidate hourly). */
export function StickyCTABar() {
  return <StickyCTABarClient ctaLabel={ctaLabel('stickyBar', getEventStatus().state)} />;
}
