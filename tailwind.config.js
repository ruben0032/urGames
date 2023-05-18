/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-md': "url('/img/hero.png')",
        'hero-mobile': "url('/img/hero.png')",
      },
      colors: {
        primary: {
          100: '#FF7D7D',
          200: '#FF7D7D',
          300: '#FF6464',
        },
        secondary: {
          100: '#F8FFDB',
          200: '#B3FFAE',
          300: '#B3FFAE',
        },
      }
    },
  },
  plugins: [],
}
