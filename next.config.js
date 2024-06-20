/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPEN_AI_API: process.env.OPEN_AI_API,
  },
};

module.exports = nextConfig;
