module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 650px)' },
        xshort: { raw: '(max-height: 560px)' },
        xxshort: { raw: '(max-height: 490px)' },
      },
      colors: {
        'correct': '#99c23e',
        'present': '#6646cc',
        'absent': '#142336',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
