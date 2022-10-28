/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
    POLYGONSCAN_API_STATS: process.env.POLYGONSCAN_API_STATS,
    POLYGONSCAN_API_GASTRACKER: process.env.POLYGONSCAN_API_GASTRACKER,
    COINBET_SLOT_GAME_CONTRACT: process.env.COINBET_SLOT_GAME_CONTRACT,
    COINBET_HOUSE_POOL_CONTRACT: process.env.COINBET_HOUSE_POOL_CONTRACT,
  },
}

module.exports = nextConfig
