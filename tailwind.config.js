/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "header-light": "#C8FDD7", // Header background color for light theme C8FDD7
        "header-dark": "#788F80", // Header background color for dark theme
      },
      borderColor: {
        "header-light": "#000000", // Border color for header in light theme
        "header-dark": "#FFFFFF", // Border color for header in dark theme
      },
    },
  },
  plugins: [],
};
