<template>
  <r-popover :visible="visible" :actions="actions" position="top-start">
    <template #reference>
      <r-button
        type="primary"
        @mouseenter="visible = true"
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
</script>
