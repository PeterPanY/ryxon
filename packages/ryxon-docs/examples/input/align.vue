<template>
  <r-input
    v-model="value"
    label="文本"
    placeholder="输入框内容右对齐"
    input-align="right"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
