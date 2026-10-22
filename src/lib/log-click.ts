/**
 * Shared /api/log POST used by every tracked CTA (CTAButton, EventStatusBanner,
 * CopyCodeButton). Client-only. Body fields are what the Sheet/Discord handler
 * in src/app/api/log/route.ts expects — don't rename them.
 */
export function logClick(label: string, referralUrl: string): void {
  const code = referralUrl.split('referral=')[1] ?? '';
  fetch('/api/log', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label,
      referralCode: code,
      page: window.location.pathname,
      site: window.location.hostname,
      referrer: (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lref')) || '',
    }),
  }).catch(() => {});
}
