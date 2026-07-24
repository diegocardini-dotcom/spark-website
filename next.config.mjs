/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'sparkdigital.agency' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      // Serve the Marita Cardini static site at /marita-cardini
      { source: '/marita-cardini', destination: '/marita-cardini/index.html' },
      { source: '/marita-cardini/', destination: '/marita-cardini/index.html' },
    ];
  },
};

export default nextConfig;
