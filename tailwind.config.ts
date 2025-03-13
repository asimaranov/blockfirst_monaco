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
        xxs: ['0.58vw', { lineHeight: '0.81vw' }],
        xs: ['0.69vw', { lineHeight: '0.81vw' }],
        sm: ['0.81vw', { lineHeight: '0.81vw' }],
        base: ['0.93vw', { lineHeight: '0.93vw' }],
        lg: ['1.04vw', { lineHeight: '1.04vw' }],
        xl: ['1.16vw', { lineHeight: '1.16vw' }],
        '2xl': ['1.39vw', { lineHeight: '1.39vw' }],
        '3xl': ['1.62vw', { lineHeight: '1.85vw' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
