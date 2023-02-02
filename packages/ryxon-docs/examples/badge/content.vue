<template>
  <r-badge class="item">
    <div class="child" />
    <template #content>
      <r-icon> <Edit /> </r-icon>
    </template>
  </r-badge>
  <r-badge class="item">
    <div class="child" />
    <template #content>
      <r-icon> <Share /> </r-icon>
    </template>
  </r-badge>
  <r-badge class="item">
    <div class="child" />
    <template #content>
      <r-icon> <Loading /> </r-icon>
    </template>
  </r-badge>
</template>

<script setup lang="ts">
import { Edit, Share, Loading } from '@ryxon/icons'
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>
