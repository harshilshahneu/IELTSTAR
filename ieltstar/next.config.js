/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
  }  
}

module.exports = nextConfig
