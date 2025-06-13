import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '400px',
        xxs: '480px',
        xxxl: '1920px',
      },
      colors: {
        primary: '#8C6A5D',
        secondary: '#B8A394',
        accent: '#5A7D5A',
        background: '#F5F5F5',
        textPrimary: '#333333',

        darkPrimary: '#C05621',
        darkSecondary: '#A0AEC0',
        darkAccent: '#38B2AC',
        darkBackground: '#2D3748',
        darkText: '#E2E8F0',
      },
    },
  },
  plugins: [],
};

export default config;

