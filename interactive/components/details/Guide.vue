<script setup lang="ts">
import type { GuideItem } from '~/types'
import { isDark } from '#imports'

const { item } = defineProps<{
  item: GuideItem
}>()

const component = shallowRef<any>()
watch(
  () => item,
  async () => {
    component.value = undefined
    component.value = await item.component().then(i => i.default)
  },
  { immediate: true },
)
</script>

<template>
  <DetailsBase v-if="component" :title="item.title">
    <div class="markdown-body max-w-full mt4 text-left" :class="isDark ? 'dark' : 'light'">
      <Component :is="component" />
    </div>
  </DetailsBase>
  <div v-else ma animate-pulse animate-duration-600>
    <div i-carbon-circle-dash w-6 h-6 animate-spin ma />
    loading...
  </div>
</template>
