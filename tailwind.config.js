/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-md': "url('/img/hero.jpg')",
        'hero-mobile': "url('/img/hero.jpg')",
      }
    },
  },
  plugins: [],
}
