/* import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
},
async rewrites() {
    const backendUrl =  process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: '/api-proxy/:path*', // Cualquier ruta que comience con /api-proxy/
        destination: `${backendUrl}/:path*`,
      },
    ];
  },


};

export default nextConfig; */



import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // solo lo activa si seteás esa variable
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: ['via.placeholder.com'],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default withAnalyzer(nextConfig);
