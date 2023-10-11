<template>
  <r-popover
    ref="popoverRef"
    :visible="visible"
    :actions="actions"
    position="top-start"
  >
    <template #reference>
      <r-button
        type="primary"
        @click="handleClick"
        @mouseleave="visible = false"
        >非受控模式</r-button
      >
    </template>
  </r-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]

const popoverRef = ref(null)
const handleClick = () => {
  // popover内容的实例
  console.log(popoverRef.value.contentRef.value.contentRef.value.popupRef)
  visible.value = true
}
</script>
