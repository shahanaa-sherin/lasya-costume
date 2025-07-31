/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // Adjust this path based on your project
  // tailwind.config.js
theme: {
  extend: {
    animation: {
      fadeIn: "fadeIn 1s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "translateY(10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
  },
},

  plugins: [
    
  ],
}
