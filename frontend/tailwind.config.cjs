const daisyui = require("daisyui");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        main: {
          ...require("daisyui/src/theming/themes")["emerald"],
        }
      },
    ]
  }
};

module.exports = config;
