/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {    
      colors: {
        'airbus-blue': '#00205b',
        'airbus-blue-light1': '#005587',
        'airbus-blue-light2': '#0085ad'
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#005587",
          secondary: "#00205b",
          // accent: "#00205b",
          "base-100": "#ffffff"
          // neutral: "#00205b",
          // "error": "#0085ad"
        },
      },
    ],
  },
};