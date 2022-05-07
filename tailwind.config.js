module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rgba: 'rgba(78, 74, 76, 0.65)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
