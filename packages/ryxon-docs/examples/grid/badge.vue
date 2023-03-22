<template>
  <r-grid clickable :column-num="2">
    <r-grid-item :icon="House" text="文字" dot />
    <r-grid-item :icon="Connection" text="文字" badge="99+" />
  </r-grid>
</template>

<script setup lang="ts">
import { House, Connection } from '@ryxon/icons'
</script>
