/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ye bohot zaroori tha, jo aapne sahi rakha hai
  theme: {
    extend: {
      fontFamily: {
        // Agar aap Google Fonts se Bricolage Grotesque use kar rahe ho
        'bricolage': ['"Bricolage Grotesque"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}