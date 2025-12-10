/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/cake-shop-website" : undefined,
  assetPrefix: isProd ? "/cake-shop-website/" : undefined,
  images: {
    unoptimized: true,
    domains: [],
  },
}

module.exports = nextConfig
