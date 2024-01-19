import type { Config } from 'tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-image': "url('/img/auth-image.jpg')",
        'hero-square': `
        linear-gradient(#e2e8f0 1px, transparent 1px),
        linear-gradient(to right, #e2e8f0 1px, transparent 1px)
          `,
        'hero-square-opacity':
          'radial-gradient(circle, rgba(248,250,252,0) 10%, rgba(248,250,252,1) 64%)',
        'hero-square-linear':
          'linear-gradient(180deg, rgba(248, 250, 252, 0.00) 0%, rgba(248,250,252,1) 100%)',
        'hero-person-01': "url('/img/bg-hero-person-01.png')",
        'hero-person-02': "url('/img/bg-hero-person-02.png')",
        'hero-person-03': "url('/img/bg-hero-person-03.png')",
        'hero-person-04': "url('/img/bg-hero-person-04.png')",
        'about-section': "url('/img/bg-about-section.png')",
        shimmer:
          'linear-gradient(90deg,#ffffff00,#ffffff20 20%,#ffffff50 60%,#ffffff00)',
      },
      gridTemplateColumns: {
        'opportunity-details': '864px 304px',
      },
      minWidth: {
        '80': '320px',
      },
      maxWidth: {
        '304': '304px',
        '100': '100px',
        '448': '448px',
      },
      height: {},
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(30, 58, 138, 0.05), 0px 4px 4px 0px rgba(30, 58, 138, 0.04), 0px 9px 6px 0px rgba(30, 58, 138, 0.03), 0px 17px 7px 0px rgba(30, 58, 138, 0.01), 0px 26px 7px 0px rgba(30, 58, 138, 0.00);',
        modal:
          '0px 1px 2px 0px rgba(15, 23, 42, 0.05), 0px 4px 4px 0px rgba(15, 23, 42, 0.04), 0px 8px 5px 0px rgba(15, 23, 42, 0.03), 0px 15px 6px 0px rgba(15, 23, 42, 0.01), 0px 23px 7px 0px rgba(15, 23, 42, 0.00);',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            transform: 'scale(1) ',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0.5)',
            opacity: '0',
          },
        },
        fromRight: {
          '0%': { transform: 'translateX(100%) ', opacity: '0' },
          '100%': { transform: 'translateX(0) ', opacity: '1' },
        },
        leaveRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },

        'skeleton-loading': {
          '0%': {
            'background-color': 'hsl(214.29999999999995, 31.8%, 91.4%);',
          },
          '100%': {
            'background-color': 'hsl(210, 40%, 98%)',
          },
        },
        shimmer: {
          '100% ': {
            transform: ' translateX(100%)',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn .3s cubic-bezier(0.65,0.05,0.36,1)  forwards',
        'fade-out': 'fadeOut .3s cubic-bezier(0.65,0.05,0.36,1) forwards',
        'from-right': 'fromRight .3s ease forwards',
        'leave-right': 'leaveRight .3s ease forwards',
        skeleton: 'skeleton-loading 1s linear infinite alternate;',
        shimmer: 'shimmer 2s infinite',
      },
    },
    plugins: [],
  },
}
export default config
