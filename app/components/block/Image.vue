<script setup lang="ts">
import type { ArcBlockImage } from '#build/types/directus'

defineProps<ArcBlockImage>()
</script>

<template>
  <NuxtImg
    :src="image?._id"
    provider="directus"
    :alt="image?.title || 'Image'"
    class="rounded-lg"
    :width="image?.width"
    :height="image?.height"
    @error="(e) => console.error('Error loading image:', e)"
  />
</template>
