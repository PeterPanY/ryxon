<template>
  <div>限制输入范围</div>
  <r-input-number v-model="value1" min="5" max="8" />
  <div>限制输入整数</div>
  <r-input-number v-model="value2" integer />
  <div>固定小数位数</div>
  <r-input-number v-model="value3" step="0.2" :decimal-length="1" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
const value2 = ref(1)
const value3 = ref(1)
</script>
