import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@rosterup/lib'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Skip static generation for all API routes during build
  experimental: {
    turbo: {
      root: '../../',
    },
    // This prevents Next.js from trying to evaluate API routes during build
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Generate static pages only, skip API routes during build
  output: 'standalone',
};

export default nextConfig;
