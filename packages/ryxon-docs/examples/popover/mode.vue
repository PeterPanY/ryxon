<template>
  <r-popover :actions="actions" position="top-start">
    <template #reference>
      <r-button type="primary">非受控模式</r-button>
    </template>
  </r-popover>
</template>

<script setup lang="ts">
const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
</script>
