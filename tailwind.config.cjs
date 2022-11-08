/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        secondaryLight: '#28344783',
        accent: '#38bdf8',
      },
      screens: {
        // 'hero-break-1': '750px',
      },
      fontFamily: {
        sans: ['Raleway', 'sansserif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

