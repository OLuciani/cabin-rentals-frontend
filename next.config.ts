
/* import type { NextConfig } from "next";

//const isDev = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

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
    const backendUrl = isProduction
      ? process.env.NEXT_PUBLIC_API_URL // Asume que tienes esta variable para producción
      : process.env.NEXT_PUBLIC_API_URL_LOCAL;
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

export default nextConfig;