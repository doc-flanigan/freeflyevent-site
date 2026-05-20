/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.freeflyevent.com' }],
        destination: 'https://freeflyevent.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
