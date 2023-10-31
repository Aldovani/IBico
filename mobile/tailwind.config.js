/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("./assets/home.png")',
      },
      maxWidth: {
        75: "300px",
      },
    },
  },
  plugins: [],
};
