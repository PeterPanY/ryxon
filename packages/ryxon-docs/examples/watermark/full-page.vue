<template>
  <div class="demo-watermark-wrapper">
    <r-button type="primary" @click="fullPage = !fullPage"> 切换 </r-button>
    <r-watermark :full-page="fullPage" opacity="0.2" :image="image">
    </r-watermark>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import image from './logo.png'

const fullPage = ref(false)
</script>

<style lang="scss" scoped>
.demo-watermark-wrapper {
  position: relative;
  height: 150px;
  background-color: var(--r-background-2);
  padding: var(--r-padding-md);
}
</style>
