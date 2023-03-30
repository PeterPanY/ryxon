<template>
  <r-input
    v-model="value"
    label="文本"
    placeholder="顶部对齐"
    label-align="top"
  />
  <r-input
    v-model="value2"
    label="文本"
    placeholder="左对齐"
    label-align="left"
  />
  <r-input
    v-model="value3"
    label="文本"
    placeholder="居中对齐"
    label-align="center"
  />
  <r-input
    v-model="value4"
    label="文本"
    placeholder="右对齐"
    label-align="right"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
