<script setup lang="ts">
import BaseBlock from '~/components/BaseBlock.vue'

const route = useRoute()
const permalink = route.params.permalink as string

const { data: page, error } = await useFetch('/api/pages/arc', {
  key: `page-${permalink}`,
  query: { permalink },
  default: () => null,
})

if (error.value) {
  console.error('Error fetching page:', error.value)
}

const pageBlocks = computed(
  () => (page.value?.blocks as ArcContentBlock[]) || [],
)
</script>

<template>
  <div>
    <BaseBlock v-for="block in pageBlocks" :key="block.id" v-bind="block" />
  </div>
</template>
