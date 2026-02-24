<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id" class="prose dark:prose-invert">
    <slot />
  </h1>
</template>
