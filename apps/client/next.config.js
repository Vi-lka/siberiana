const path = require("path");
require("dotenv").config({ path: "../../.env" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  reactStrictMode: true,
  transpilePackages: ["@siberiana/tailwind-config", "@siberiana/ui"],
  eslint: { ignoreDuringBuilds: true },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time (ONLY PUBLIC)
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    NEXT_PUBLIC_STRAPI_DOMAIN: process.env.NEXT_PUBLIC_STRAPI_DOMAIN,
    NEXT_PUBLIC_S3_DOMAIN: process.env.NEXT_PUBLIC_S3_DOMAIN,
    NEXT_PUBLIC_SIBERIANA_API_URL: process.env.NEXT_PUBLIC_SIBERIANA_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_DOMAIN,
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_DOMAIN,
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
