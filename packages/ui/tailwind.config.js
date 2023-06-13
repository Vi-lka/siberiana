/** @type {import('tailwindcss').Config} */

const sharedConfig = require("@siberiana/tailwind-config");

module.exports = {
  ...sharedConfig,
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
};
