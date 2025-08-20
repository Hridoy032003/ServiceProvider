/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Your existing pattern for Google
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
      // The new pattern for Pexels
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**', // Use /** to allow any image path from this host
      },
    ],
  },
};

module.exports = nextConfig;