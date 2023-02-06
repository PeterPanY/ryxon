<template>
  <r-input
    v-model="value"
    label="手机号"
    placeholder="请输入手机号"
    label-align="top"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
