import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#07090e',
        cardDark: 'rgba(15, 20, 30, 0.65)',
        // Photo-derived palette
        terracotta: '#e06b3a',   // UoM brick building facade
        ember: '#c45528',        // deeper brick
        amber: '#f59e0b',        // warm amber glow
        navyDeep: '#1a2a4a',     // dark navy suit
        forestSlate: '#253545',  // muted forest/building shadow
        stoneGray: '#8c9aad',    // stone steps
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'photo-gradient': 'linear-gradient(135deg, #e06b3a 0%, #f59e0b 50%, #c45528 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 60% 20%, rgba(224,107,58,0.15) 0%, rgba(26,42,74,0.1) 50%, transparent 80%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'tilt': 'tilt 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', filter: 'drop-shadow(0 0 15px rgba(224, 107, 58, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.7))' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        tilt: {
          '0%, 100%': { transform: 'perspective(800px) rotateY(-5deg) rotateX(2deg)' },
          '50%': { transform: 'perspective(800px) rotateY(5deg) rotateX(-2deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
