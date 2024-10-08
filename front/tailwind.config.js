/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        profile: "#1d1f34",
        messagesender: "#4e527b",
        lightgrey: "#d3d3d3",
        lightwhite: "#000005",
      },
    },
  },
  plugins: [],
};
