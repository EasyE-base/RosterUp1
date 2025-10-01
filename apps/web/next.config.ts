import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@rosterup/lib'],
  experimental: {
    turbo: {
      root: '../../',
    },
  },
};

export default nextConfig;
