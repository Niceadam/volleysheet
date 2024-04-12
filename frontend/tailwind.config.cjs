const daisyui = require("daisyui");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  safelist: [
    { pattern: /bg-(primary|secondary)/, },
    { pattern: /border-(primary|secondary)/, },
    { pattern: /text-(primary|secondary)/, },
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          hover: 'var(--secondary-hover)',
        },
        captain: '#480ca8',
        libero: '#7b2cbf',
        sub: '#7b2cbf',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    }
  },

  plugins: [daisyui],
  daisyui: {
    themes: ['emerald'],
    logs: false
  }
};

module.exports = config;
