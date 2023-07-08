/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,tsx,jsx,ts}"],
  theme: {
    extend: {
      margin: {
        "marginInline": "auto"
      }
    },
    fontFamily: {
      "robo": ['Roboto', 'sans-serif'],
      "owal": ['Oswald', 'sans-serif']
    },

  },
  plugins: [],
}

