import os from "os";
import path from "path";
import type { NextConfig } from "next";

function getLocalNetworkIPs(): string[] {
  const ips = new Set<string>();
  for (const iface of Object.values(os.networkInterfaces())) {
    for (const net of iface ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        ips.add(net.address);
      }
    }
  }
  return [...ips];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalNetworkIPs(),
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      {
        protocol: "https",
        hostname: "oaidalleapithrottled.blob.core.windows.net",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
