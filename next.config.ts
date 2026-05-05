import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/n8n/:path*",
        destination: `${process.env.N8N_BACKEND_URL || "http://localhost:5678"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
