import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/assessment/role",
        destination: "/assessment",
        permanent: false,
      },
      {
        source: "/assessment/results",
        destination: "/assessment",
        permanent: false,
      },
      {
        source: "/assessment/results/:path*",
        destination: "/assessment",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
