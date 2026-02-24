<script setup lang="ts">
import type { ArcBlockContent } from '#build/types/directus'

defineProps<ArcBlockContent>()
</script>

<template>
  <div class="prose dark:prose-invert">
    <MDC :value="body" tag="article" />
  </div>
</template>
