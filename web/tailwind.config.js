module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      borderRadius: {
        md: '4px',
      },
      colors: {
        brand: {
          300: '#996dff',
          500: '#8257e6',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
