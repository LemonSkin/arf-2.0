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
        airbus: {
          "primary": "#00205b",
          "secondary": "#005587",
          "accent": "#0085ad",
          "neutral": "#000000",
          "base-100": "#ffffff",
          "info": "#3ABFF8",
          "success": "#84bd00",
          "warning": "#e1e000",
          "error": "#e4002b",
        },
      },
    ],
  },
};