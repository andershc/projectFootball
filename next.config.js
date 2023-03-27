/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: { 
    domains: [
      'lh3.googleusercontent.com', 
      'media-1.api-sports.io',
      'media-2.api-sports.io',
      'media-3.api-sports.io',
    ],
  },
}

module.exports = nextConfig
