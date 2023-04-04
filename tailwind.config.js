/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(calc(250px))' },
          '100%': { transform: 'translateX(calc(-250px * 14))' },
        },
      },
    },
    backgroundImage: {
      'bgcategory': 'https://nurlightllc.com/image/product_image/8eae085c-68b0-4f34-a85b-234850fcf291.jpg_1180xaf%20(1).jpg'
    }
  },
  plugins: [],
}