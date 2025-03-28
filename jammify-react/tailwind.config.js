/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jammify-blue': '#16253f',
        'jammify-dark-blue': '#0f172a',
        'jammify-teal': '#37E2D5',
        'jammify-light': '#f8fafc',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
        'display': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 