<template>
  <r-grid clickable :column-num="2">
    <r-grid-item :icon="House" text="路由跳转" to="/" />
    <r-grid-item :icon="Connection" text="URL 跳转" url="https://github.com" />
  </r-grid>
</template>

<script setup lang="ts">
import { House, Connection } from '@ryxon/icons'
</script>
