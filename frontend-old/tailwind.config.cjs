/** @type {import('tailwindcss').Config}*/
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"]
  }
};

module.exports = config;
