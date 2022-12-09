const { truncate } = require("fs/promises");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  },
};

module.exports = nextConfig;
