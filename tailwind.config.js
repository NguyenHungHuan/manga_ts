/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    container: false
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fd113a',
        'primary-2': '#3c6ecd',
        secondary: '#ff4b2b'
      },
      backgroundImage: {
        gradient: 'linear-gradient(133deg, #ff4b2b 0%, #FF416B 100%)'
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }
      })
    }
  ]
}
