import tailwindcss from '@tailwindcss/vite'
import graphql from '@rollup/plugin-graphql'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    './modules/directus',
  ],

  devtools: {
    enabled: true,
  },

  directus: {
    directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    directus: {
      url: process.env.NUXT_PUBLIC_DIRECTUS_URL,
      token: process.env.DIRECTUS_TOKEN,
      logLevel: process.env.DIRECTUS_LOG_LEVEL || 'info',
    },
    public: {
      directus: {
        url: process.env.NUXT_PUBLIC_DIRECTUS_URL,
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  nitro: {
    rollupConfig: {
      plugins: [graphql()],
    },
  },
})
