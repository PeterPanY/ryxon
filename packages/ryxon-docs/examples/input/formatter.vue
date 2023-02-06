<template>
  <r-input
    v-model="value1"
    label="文本"
    :formatter="formatter"
    placeholder="在输入时执行格式化"
  />
  <r-input
    v-model="value2"
    label="文本"
    :formatter="formatter"
    format-trigger="onBlur"
    placeholder="在失焦时执行格式化"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
// 过滤输入的数字
const formatter = (value) => value.replace(/\d/g, '')
</script>
