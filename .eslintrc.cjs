module.exports = {
  extends: ['next', 'eslint:recommended', 'plugin:jsx-a11y/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'react/display-name': ['warn'],
    'jsx-a11y/interactive-supports-focus': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': ['warn'],
    "no-unused-expressions": ["warn"],
    "no-irregular-whitespace": ["warn"],

    'jsx-a11y/media-has-caption': ['warn'],
    'jsx-a11y/no-autofocus': ['warn'],
  },
  "ignorePatterns": ["**/generated/*"],
  globals: {
    NodeJS: 'readonly',
    React: 'readonly',
    JSX: 'readonly',
  },
  "env": {
        "es2020": true
    }
};
