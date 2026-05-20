/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Canonical host is the apex `freeflyevent.com`. Everything else
    // funnels here.
    //
    // IMPORTANT: Do NOT configure a conflicting redirect in the Vercel
    // dashboard (Project → Settings → Domains). On 2026-05-19 the
    // dashboard was set to redirect apex → www while this file sent
    // www → apex, producing a redirect loop that took the entire site
    // down for ~24h. Pick one layer (this file) and keep the dashboard
    // configured with `freeflyevent.com` as primary with no redirect.
    return [
      // www → apex
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.freeflyevent.com' }],
        destination: 'https://freeflyevent.com/:path*',
        permanent: true,
      },
      // Production vercel.app alias → apex. Narrow match: only the bare
      // project alias, NOT preview deployments (which match longer
      // hostnames like `freeflyevent-site-git-*-scottgayden.vercel.app`
      // and need to keep working for PR previews).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freeflyevent-site.vercel.app' }],
        destination: 'https://freeflyevent.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
