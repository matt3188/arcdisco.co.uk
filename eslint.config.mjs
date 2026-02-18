// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(prettier, {
  rules: {
    quotes: ['error', 'single'],
    /*
     * General
     */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    /*
     * TypeScript
     */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    /*
     * Vue
     */
    'vue/no-unused-vars': 'warn',
    'vue/require-default-prop': 'off',

    /*
     * Nuxt specific
     */
    'vue/no-v-html': 'off', // often needed with CMS content

    /*
     * Code quality
     */
    'prefer-const': 'warn',
    'no-var': 'error',
  },
})
