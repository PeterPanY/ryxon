<template>
  <r-grid :column-num="3">
    <r-grid-item v-for="value in 6" :key="value" :icon="Picture" text="文字" />
  </r-grid>
</template>

<script setup lang="ts">
import { Picture } from '@ryxon/icons'
</script>
