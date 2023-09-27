import type { Config } from 'tailwindcss'

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
        "auth-image": "url('/img/auth-image.jpg')"
      },
      fontFamily: {
        lato: ['var(--font-lato)', ...fontFamily.sans],
        poppins: ['var(--font-poppins)', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
}
export default config
