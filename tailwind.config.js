/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        magenta: {
          500: '#FF00FF',
          600: '#CC00CC',
          700: '#990099',
        },
      },
    },
  },
  plugins: [],
};
