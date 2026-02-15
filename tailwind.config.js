// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Указываем, где искать классы Tailwind
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Здесь можно добавить кастомные стили
      screens: {
        'xs': '361px', // Добавляем брейкпоинт для очень маленьких экранов
      },
    },
  },
  plugins: [],
}