/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'custom-red': '#ED4C5C',
        'custom-yellow': '#FFCE31',
        'custom-green': '#00A790',
        'custom-purple': '#B01AFF',
        'custom-blue': '#16ABF8',
        'custom-bg-gray': '#E5E5E5',
        'custom-icon-gray': '#A4A4A4',
        'custom-button-gray': '#F4F4F4',
        'custom-checkbox-gray': '#C7C7C7',
        'custom-black': '#111111',
      }
    },
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
