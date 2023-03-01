<template>
  <r-menu
    :default-active="activeIndex"
    class="r-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <r-menu-item index="0">LOGO</r-menu-item>
    <div class="flex-grow" />
    <r-menu-item index="1">Processing Center</r-menu-item>
    <r-sub-menu index="2">
      <template #title>Workspace</template>
      <r-menu-item index="2-1">item one</r-menu-item>
      <r-menu-item index="2-2">item two</r-menu-item>
      <r-menu-item index="2-3">item three</r-menu-item>
      <r-sub-menu index="2-4">
        <template #title>item four</template>
        <r-menu-item index="2-4-1">item one</r-menu-item>
        <r-menu-item index="2-4-2">item two</r-menu-item>
        <r-menu-item index="2-4-3">item three</r-menu-item>
      </r-sub-menu>
    </r-sub-menu>
  </r-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
