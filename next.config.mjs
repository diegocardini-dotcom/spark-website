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
  async redirects() {
    return [
      { source: '/marita-cardini', destination: '/marita-cardini/index.html', permanent: false },
      { source: '/marita-cardini/', destination: '/marita-cardini/index.html', permanent: false },
      { source: '/jm-tax-solutions', destination: '/jm-tax-solutions/index.html', permanent: false },
      { source: '/jm-tax-solutions/', destination: '/jm-tax-solutions/index.html', permanent: false },
      { source: '/parmegiano', destination: '/parmegiano/index.html', permanent: false },
      { source: '/parmegiano/', destination: '/parmegiano/index.html', permanent: false },
    ];
  },
};

export default nextConfig;
