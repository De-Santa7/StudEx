import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Ignore ESLint build errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (Optional) You can add other config options here later
};

export default nextConfig;
