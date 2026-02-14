import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://placehold.co/1000x1000.png'),
    ],
  },
};

export default nextConfig;
