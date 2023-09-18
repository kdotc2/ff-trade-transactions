import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      roman: 'lower-roman',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
