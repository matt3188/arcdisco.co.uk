<script setup lang="ts">
import type { ArcBlockTestimonial } from '#build/types/directus'

const { data: testimonials } = useFetch<ArcBlockTestimonial[]>(
  '/api/testimonials',
  {
    key: 'testimonials',
    default: () => [],
  },
)
</script>

<template>
  <BlockTestimonials
    v-for="testimonial in testimonials"
    :key="testimonial._id"
    v-bind="testimonial"
  />
</template>
