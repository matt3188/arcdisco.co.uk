<script setup lang="ts">
import type { ArcBlockTwoColumn } from '#build/types/directus'

defineProps<ArcBlockTwoColumn>()
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 items-center py-4">
    <div class="prose dark:prose-invert">
      <BaseBlock v-bind="left_col[0]" />
    </div>
    <div class="prose dark:prose-invert">
      <BaseBlock v-bind="right_col[0]" />
    </div>
  </div>
</template>
