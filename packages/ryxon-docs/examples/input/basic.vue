<template>
  <r-input v-model="value" label="文本" placeholder="请输入用户名" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
