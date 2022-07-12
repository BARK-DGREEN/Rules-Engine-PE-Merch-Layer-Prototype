/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CTP_AUTH_URL: process.env.CTP_AUTH_URL,
    CTP_API_URL: process.env.CTP_API_URL,
    CTP_CLIENT_ID: process.env.CTP_CLIENT_ID,
    CTP_CLIENT_SECRET: process.env.CTP_CLIENT_SECRET,
    CTP_PROJECT_KEY: process.env.CTP_PROJECT_KEY
  }
}

module.exports = removeImports(nextConfig)
