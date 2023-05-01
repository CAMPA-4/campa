/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/**/*.{html,js,jsx}',
    './node_modules/flowbite/**/*.js,jsx',
    './node_modules/flowbite-react/**/*.js,jsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['pastel'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    // darkTheme: 'dark',
  },
};
