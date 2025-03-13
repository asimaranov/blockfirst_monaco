import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        roboto: ['var(--roboto)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#01050d',
        foreground: '#f2f2f2',
        primary: '#195af4',
        secondary: '#9aa6b5',
        accent: '#282d33',
        success: '#48cc9e',
        error: '#CF3336',
      },
      fontSize: {
      },
    },
  },
  plugins: [],
} satisfies Config;
