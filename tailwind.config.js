/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'node-color': 'rgba(255, 255, 255, 0.3)'
      }
    },
  },
  plugins: [],
}
