const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'lexend': ['Lexend Peta', 'sans-serif'],
      'mono': ['Space Mono', 'monospace'],
    },
    extend: {
      colors: {
        "gray": "#adb9c5",
        "blue": "#759ad0",
        "background": "#f89a56",
        "background-dark": "#db772e",
        "background-light": "#fcb783",
        "foreground": {
          "default": "#6ba743",
          100: "#157d4c",
          200: "#5b893f",
          300: "#6ba743",
          400: "#90b66b",
        },
      },
    },
  },
  plugins: [],
}