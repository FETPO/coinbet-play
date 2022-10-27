/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
    POLYGONSCAN_API_STATS: process.env.POLYGONSCAN_API_STATS,
    POLYGONSCAN_API_GASTRACKER: process.env.POLYGONSCAN_API_GASTRACKER
  },
}

module.exports = nextConfig
