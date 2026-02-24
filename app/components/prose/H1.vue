<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id" class="prose dark:prose-invert text-3xl font-bold">
    <slot />
  </h1>
</template>
