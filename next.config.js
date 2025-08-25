/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configure any external image domains if needed
    remotePatterns: [
      // { protocol: 'https', hostname: 'your-cdn.com' }
    ],
  },
};

module.exports = nextConfig; 