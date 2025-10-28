/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./react/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b3f8f',
        }
      }
    },
  },
  plugins: [],
}