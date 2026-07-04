/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Canonical host is the apex `freeflyevent.com`. The `www → apex` 308
    // is handled at the edge by Vercel's Domains config — do not add a
    // duplicate rule here (on 2026-05-19 a conflicting `apex → www` rule
    // in the dashboard produced a loop that took the site down for ~24h;
    // running both layers in the same direction is safe but leaves the
    // code rule as dead weight behind the edge redirect).
    //
    // The vercel.app production alias is NOT redirected by the dashboard,
    // so we still 301 it here. Match is intentionally exact to avoid
    // catching preview hostnames like
    // `freeflyevent-site-git-*-scottgayden.vercel.app`, which need to
    // keep working for PR review.
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freeflyevent-site.vercel.app' }],
        destination: 'https://freeflyevent.com/:path*',
        permanent: true,
      },
      {
        // DefenseCon 2956 giveaway ended 2026-05-28; page removed. Bing had
        // indexed it, so send the URL home instead of 404ing.
        source: '/giveaway.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
