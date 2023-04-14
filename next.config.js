const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'media-1.api-sports.io',
      'media-2.api-sports.io',
      'media-3.api-sports.io',
      'www.countryflags.io',
    ],
  },
  // Use the prefix for assets and page routes
  basePath: process.env.NODE_ENV === 'production' ? '/projectFootball' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/projectFootball/' : '',
  // Enable static HTML export
  target: "serverless",

  // Add the experimental options here
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;