<template>
  <r-button type="primary" @click="show = true">显示遮罩层</r-button>
  <r-overlay :show="show" z-index="2000" @click="show = false">
    <div class="wrapper">
      <div class="block" />
    </div>
  </r-overlay>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
