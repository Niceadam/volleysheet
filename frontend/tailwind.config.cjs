const daisyui = require("daisyui");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: '#A40000',
          hover: '#B51111',
          light: '#F9F1F3',
        },
        "secondary": {
          DEFAULT: '#003A6D',
          hover: '#114B7E',
          light: '#F1F6F8',
        },
        "captain": "#480ca8",
        "libero": "#7b2cbf",
        "sub": "#7b2cbf",
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: ['emerald']
  }
};

module.exports = config;
