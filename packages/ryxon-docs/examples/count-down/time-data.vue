<template>
  <r-count-down :time="time">
    <template #default="timeData">
      <span class="block">{{ timeData.hours }}</span>
      <span class="colon">:</span>
      <span class="block">{{ timeData.minutes }}</span>
      <span class="colon">:</span>
      <span class="block">{{ timeData.seconds }}</span>
    </template>
  </r-count-down>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(30 * 60 * 60 * 1000)
</script>

<style scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #1989fa;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
</style>
