<script setup lang="ts">
import type { ArcBlockTestimonial } from '#build/types/directus'

defineProps<ArcBlockTestimonial>()
</script>

<template>
  <div class="flex block-testimonials py-6 odd:justify-start even:justify-end">
    <div
      class="relative testimonials w-2/3 bg-white text-gray-700 p-6 shadow-[3px_3px_1px_0_rgba(217,217,217,0.5)]"
    >
      <blockquote
        class="mx-10 my-3.5 before:content-['\201C'] after:content-['\201D'] before:text-[80px] after:text-[80px] before:font-serif after:font-serif after:absolute before:absolute before:top-0 before:left-6 after:bottom-0 after:right-5"
      >
        {{ body }}
      </blockquote>
      <cite class="citation mt-4 mx-10">
        {{ citation }}
        <span v-if="location"> - {{ location }}</span>
      </cite>
    </div>
  </div>
</template>
