import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/n8n/:path*",
        destination: "http://192.168.0.104:5678/:path*",
      },
    ];
  },
};

export default nextConfig;
