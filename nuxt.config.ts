import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import graphqlLoader from 'vite-plugin-graphql-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@nuxtjs/google-fonts',
    './modules/directus',
  ],

  components: [
    { path: '~/components/' },
    {
      path: '~/components/prose',
      global: true,
      prefixPath: false,
      prefix: 'Prose',
    },
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    components: { prose: true },
  },

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
  alias: {
    '~graphql': resolve(process.cwd(), 'graphql'),
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    alias: {
      '~graphql': resolve(process.cwd(), 'graphql'),
    },

    rollupConfig: {
      plugins: [graphqlLoader()],
    },
  },

  vite: {
    plugins: [graphqlLoader(), tailwindcss()],
  },

  directus: {
    directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  image: {
    directus: {
      baseURL: `${process.env.NUXT_PUBLIC_DIRECTUS_URL}/assets`,
    },
  },
})
