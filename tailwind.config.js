/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- YOUR NEW PALETTE ---
        "posa-blue": "#add3fa", // Main Blue (Buttons, Headings)
        "posa-blue-light": "#b9ebfa", // Lighter Blue (Background blobs?)

        "posa-peach": "#fadfaa", // Orange/Peach (Highlights)

        "posa-yellow": "#faefc3", // Yellow (Accents)
        "posa-yellow-light": "#fafad5", // Lighter Yellow

        "posa-cream": "#fffff6", // Main Background (Off-white)
        "posa-gray": "#464646", // Main Text (Dark Gray)
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
