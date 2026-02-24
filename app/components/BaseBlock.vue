<script setup lang="ts">
import { BlockContent, BlockTwoColumn, BlockImage } from '#components'
import type { ArcContentBlock } from '#build/types/directus'

const props = defineProps<ArcContentBlock>()

const components: Record<string, unknown> = {
  arc_block_content: BlockContent,
  arc_block_two_columns: BlockTwoColumn,
  arc_block_image: BlockImage,
}
const Component = computed(() => components[props.collection] || null)
</script>

<template>
  <component :is="Component" v-if="Component" v-bind="item" />
</template>
