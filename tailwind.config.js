/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#E89275',
        secondary: '#9CBCB7',
        accent: '#6B4945',
        light: '#DBCDA4',
        accentlight: '#D0C2B0',
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(20rem, 1fr))",
      },
      fontFamily: {
        lato: ['var(--font-lato)'],
        playfair: ['var(--font-playfair)']
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
}