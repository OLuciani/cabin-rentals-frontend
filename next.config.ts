/* import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //config options here 
};

export default nextConfig; */


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //domains: ["misimagenes.com"],
    domains: ['res.cloudinary.com'],
  },
  // Configuración del proxy para redirigir las peticiones
  /* async rewrites() {
    return [
      {
        source: '/:path*', // Ruta interna en el frontend
        //destination: '', // Url del backend (deploy);
        destination: 'http://localhost:5000/:path*',
      },
    ];
  }, */
};

export default nextConfig;

