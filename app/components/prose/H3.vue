<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h3 :id="id" class="prose dark:prose-invert text-3xl">
    <slot />
  </h3>
</template>
