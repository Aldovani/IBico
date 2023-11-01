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
        'people-01': "url('/img/people-01.png')",
        'people-02': "url('/img/people-02.png')",
        'people-03': "url('/img/people-03.png')",
        hero: 'linear-gradient(0deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.25) 100%), url("/img/bg-hero.jpg") ',
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
        lato: ['var(--font-lato)', ...fontFamily.sans],
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
      boxShadow: {
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
          '0%': { transform: 'translateX(100%) scale(.5)', opacity: '0' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        leaveRight: {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(100%) scale(.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn .3s cubic-bezier(0.65,0.05,0.36,1) forwards',
        'fade-out': 'fadeOut .3s cubic-bezier(0.65,0.05,0.36,1) forwards',
        'from-right': 'fromRight .3s ease forwards',
        'leave-right': 'leaveRight .3s ease forwards',
      },
    },
    plugins: [],
  },
}
export default config
