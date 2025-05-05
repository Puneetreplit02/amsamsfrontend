/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#dce4fd',
          300: '#c2cffc',
          400: '#9fb1f9',
          500: '#7a8df7',
          600: '#5c6af3',
          700: '#4a59e5',
          800: '#3a42c7',
          900: '#363fa0',
        },
        meat: {
          50: '#fef2f2',
          100: '#fde6e6',
          200: '#fbd0d0',
          300: '#f8acad',
          400: '#f27c7d',
          500: '#e94c4f',
          600: '#d32e32',
          700: '#b02125',
          800: '#921e22',
          900: '#7a1f21',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
