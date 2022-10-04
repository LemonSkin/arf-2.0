/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {    
      colors: {
        'airbus-blue': '#00205b',
        'airbus-blue-light1': '#005587',
        'airbus-blue-light2': '#0085ad'
      }
    },
  },
  plugins: []
};