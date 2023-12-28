<template>
  <r-dynamic-tags v-model="tags" :render-tag="renderTag" />
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { Tag as RTag } from '@ryxon/components'

const tags = ref(['动动', '态态'])

const renderTag = (tag: string, index: number) => {
  return h(
    RTag,
    {
      type: index < 3 ? 'success' : 'danger',
      closeable: true,
      onClose: () => {
        tags.value.splice(index, 1)
      }
    },
    { default: () => tag }
  )
}
</script>
