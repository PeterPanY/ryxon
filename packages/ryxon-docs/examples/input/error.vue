<template>
  <r-input
    v-model="username"
    error
    required
    label="用户名"
    placeholder="请输入用户名"
  />
  <r-input
    v-model="phone"
    required
    label="手机号"
    placeholder="请输入手机号"
    error-message="手机号格式错误"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const phone = ref('')
</script>
