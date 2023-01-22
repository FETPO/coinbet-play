/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
    POLYGONSCAN_API_STATS: process.env.POLYGONSCAN_API_STATS,
    POLYGONSCAN_API_GASTRACKER: process.env.POLYGONSCAN_API_GASTRACKER,
    COINBET_SLOT_GAME_CONTRACT: process.env.COINBET_SLOT_GAME_CONTRACT,
    COINBET_HOUSE_POOL_CONTRACT: process.env.COINBET_HOUSE_POOL_CONTRACT,
    COINBET_TOKEN_CONTRACT: process.env.COINBET_TOKEN_CONTRACT,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    COINBET_SUBGRAPH: process.env.COINBET_SUBGRAPH,
    ALCHEMY_NETWORK: process.env.ALCHEMY_NETWORK,
    CHAIN_ID: process.env.CHAIN_ID,
  },
}

module.exports = nextConfig
