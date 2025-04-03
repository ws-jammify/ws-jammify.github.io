/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jammify-blue': '#1A2C51',
        'jammify-dark-blue': '#152238',
        'jammify-teal': '#37E2D5',
        'jammify-light': '#f8fafc',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 