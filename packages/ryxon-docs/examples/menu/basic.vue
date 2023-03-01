<template>
  <r-menu
    :default-active="activeIndex"
    class="r-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
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
    <r-menu-item index="3" disabled>Info</r-menu-item>
    <r-menu-item index="4">Orders</r-menu-item>
  </r-menu>
  <div class="h-6" />
  <r-menu
    :default-active="activeIndex2"
    class="r-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
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
    <r-menu-item index="3" disabled>Info</r-menu-item>
    <r-menu-item index="4">Orders</r-menu-item>
  </r-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
