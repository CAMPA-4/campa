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
  plugins: [require('flowbite/plugin')],
};
