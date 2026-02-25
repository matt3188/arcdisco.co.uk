<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

import { computed } from 'vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'A.R.C Disco'
const description =
  'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image',
})

const { data: site, error } = await useFetch('/api/site', {
  key: 'site',
  default: () => null,
})

function toMenuItem(block: any) {
  const { item } = block
  const href =
    item.link_type === 'internal' ? item.content?.permalink : item.url
  return { label: item.name, to: href }
}

const menuItems = computed(() => {
  const s = site.value as any
  return s?.arc_block_navigations?.[0]?.blocks?.map(toMenuItem) ?? []
})
const items = ref<NavigationMenuItem[]>(menuItems.value)
</script>

<template>
  <!-- will now log the array -->
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <UNavigationMenu
        orientation="horizontal"
        :items="items"
        class="data-[orientation=vertical]:w-48"
      />

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          A.R.C Disco • © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
