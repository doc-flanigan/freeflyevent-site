import { getEventStatus } from '@/data/events';
import { ctaLabel } from '@/lib/cta-label';
import { NavBarClient } from './NavBarClient';

/** Server wrapper: label is derived per render (pages revalidate hourly). */
export function NavBar() {
  return <NavBarClient ctaLabel={ctaLabel('nav', getEventStatus().state)} />;
}
