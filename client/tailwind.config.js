/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
        'custom-radial': 'radial-gradient(96% 96% at 50% 7.5%, #121426 0%, rgb(0, 0, 0) 100%)',
      },
    },
  },
  plugins: [],
}