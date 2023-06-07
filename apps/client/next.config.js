const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  reactStrictMode: true,
  transpilePackages: ["@siberiana/tailwind-config"],
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
