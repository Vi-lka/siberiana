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
    // Define ADMIN for redirect from authorization
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL_ADMIN,
    NEXT_PUBLIC_S3_DOMAIN: process.env.NEXT_PUBLIC_S3_DOMAIN,
    NEXT_PUBLIC_SIBERIANA_API_URL: process.env.NEXT_PUBLIC_SIBERIANA_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL_ADMIN,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_DOMAIN],
  },
};

module.exports = nextConfig;
