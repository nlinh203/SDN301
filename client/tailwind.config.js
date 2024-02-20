/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements-react/dist/js/**/*.js'],
  theme: {
    extend: {
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        progress: 'progress 0.6s ease-in-out forwards'
      }
    },
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      'x-25': '25% 0',
      'y-50': '0 50%',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    }
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')]
};
