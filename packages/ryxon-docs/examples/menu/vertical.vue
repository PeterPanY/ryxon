<template>
  <r-row class="tac">
    <r-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <r-menu
        default-active="2"
        class="r-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <r-sub-menu index="1">
          <template #title>
            <r-icon><location /></r-icon>
            <span>Navigator One</span>
          </template>
          <r-menu-item-group title="Group One">
            <r-menu-item index="1-1">item one</r-menu-item>
            <r-menu-item index="1-2">item two</r-menu-item>
          </r-menu-item-group>
          <r-menu-item-group title="Group Two">
            <r-menu-item index="1-3">item three</r-menu-item>
          </r-menu-item-group>
          <r-sub-menu index="1-4">
            <template #title>item four</template>
            <r-menu-item index="1-4-1">item one</r-menu-item>
          </r-sub-menu>
        </r-sub-menu>
        <r-menu-item index="2">
          <r-icon><icon-menu /></r-icon>
          <span>Navigator Two</span>
        </r-menu-item>
        <r-menu-item index="3" disabled>
          <r-icon><document /></r-icon>
          <span>Navigator Three</span>
        </r-menu-item>
        <r-menu-item index="4">
          <r-icon><setting /></r-icon>
          <span>Navigator Four</span>
        </r-menu-item>
      </r-menu>
    </r-col>
    <r-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <r-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="r-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <r-sub-menu index="1">
          <template #title>
            <r-icon><location /></r-icon>
            <span>Navigator One</span>
          </template>
          <r-menu-item-group title="Group One">
            <r-menu-item index="1-1">item one</r-menu-item>
            <r-menu-item index="1-2">item two</r-menu-item>
          </r-menu-item-group>
          <r-menu-item-group title="Group Two">
            <r-menu-item index="1-3">item three</r-menu-item>
          </r-menu-item-group>
          <r-sub-menu index="1-4">
            <template #title>item four</template>
            <r-menu-item index="1-4-1">item one</r-menu-item>
          </r-sub-menu>
        </r-sub-menu>
        <r-menu-item index="2">
          <r-icon><icon-menu /></r-icon>
          <span>Navigator Two</span>
        </r-menu-item>
        <r-menu-item index="3" disabled>
          <r-icon><document /></r-icon>
          <span>Navigator Three</span>
        </r-menu-item>
        <r-menu-item index="4">
          <r-icon><setting /></r-icon>
          <span>Navigator Four</span>
        </r-menu-item>
      </r-menu>
    </r-col>
  </r-row>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@ryxon/icons'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
