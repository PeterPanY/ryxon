<template>
  <r-popover :actions="actions" trigger="hover">
    <template #reference>
      <r-button type="primary">浅色风格hover</r-button>
    </template>
  </r-popover>

  <r-popover theme="dark" :actions="actions">
    <template #reference>
      <r-button type="primary">深色风格Click</r-button>
    </template>
  </r-popover>
</template>

<script setup lang="ts">
// 通过 actions 属性来定义菜单选项
const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
</script>
