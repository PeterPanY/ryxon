<template>
  <r-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <r-radio :name="false" type="button">expand</r-radio>
    <r-radio :name="true" type="button">collapse</r-radio>
  </r-radio-group>
  <r-menu
    default-active="2"
    class="r-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <r-sub-menu index="1">
      <template #title>
        <r-icon :size="24"><location /></r-icon>
        <span>Navigator One</span>
      </template>
      <r-menu-item-group>
        <template #title><span>Group One</span></template>
        <r-menu-item index="1-1">item one</r-menu-item>
        <r-menu-item index="1-2">item two</r-menu-item>
      </r-menu-item-group>
      <r-menu-item-group title="Group Two">
        <r-menu-item index="1-3">item three</r-menu-item>
      </r-menu-item-group>
      <r-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <r-menu-item index="1-4-1">item one</r-menu-item>
      </r-sub-menu>
    </r-sub-menu>
    <r-menu-item index="2">
      <r-icon :size="24"><icon-menu /></r-icon>
      <template #title>Navigator Two</template>
    </r-menu-item>
    <r-menu-item index="3" disabled>
      <r-icon :size="24"><document /></r-icon>
      <template #title>Navigator Three</template>
    </r-menu-item>
    <r-menu-item index="4">
      <r-icon :size="24"><setting /></r-icon>
      <template #title>Navigator Four</template>
    </r-menu-item>
  </r-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@ryxon/icons'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.r-menu-vertical-demo:not(.r-menu__collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
