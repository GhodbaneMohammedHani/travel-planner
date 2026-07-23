import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "o23muegrbc.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
