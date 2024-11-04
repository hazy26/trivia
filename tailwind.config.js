/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      }
    },
    colors: {
      'triviaYellow': "#FEB836",
      'triviaBlue': "#514EDD",
      'triviaPaleBlue': "#D0D1FF",
      'triviaRed': '#F02A52',
      'triviaOrange': '#FE8C00',
      'triviaPaleOrange': '#FF9911',
      'white': '#fff',
      'black': '#000'
    },
    letterSpacing: {
      normal: '.05em',
      wide: '.10em',
      wider: '.3em',
      widest: '.4em',
    }
  },
  plugins: [],
}