<template>
  <div class="demo-watermark-wrapper">
    <r-watermark :image="image" opacity="0.2" :full-page="false" />
  </div>
</template>

<script setup lang="ts">
import image from './logo.png'
</script>

<style lang="scss" scoped>
.demo-watermark-wrapper {
  position: relative;
  height: 150px;
  background-color: var(--r-background-2);
  padding: var(--r-padding-md);
}
</style>
