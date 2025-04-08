/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Habilita el modo oscuro con la clase 'dark'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '400px',
        xxxl: '1920px',
      },
      colors: {
        primary: '#8C6A5D', // Color primario
        secondary: '#B8A394', // Color secundario
        accent: '#5A7D5A', // Color de acento
        background: '#F5F5F5', // Fondo claro para modo claro
        textPrimary: '#333333', // Color de texto oscuro para modo claro

        // Colores para el modo oscuro
        darkPrimary: '#C05621', // Color primario oscuro
        darkSecondary: '#A0AEC0', // Color secundario oscuro
        darkAccent: '#38B2AC', // Acento oscuro
        darkBackground: '#2D3748', // Fondo oscuro para modo oscuro
        darkText: '#E2E8F0', // Texto claro en el modo oscuro
      },
    },
  },
  plugins: [],
}

