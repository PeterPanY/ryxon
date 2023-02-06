<template>
  <r-input
    v-model="text"
    label="文本"
    placeholder="请输入文本"
    autocomplete="off"
  />
  <r-input
    v-model="tel"
    type="tel"
    label="手机号"
    placeholder="请输入手机号"
    autocomplete="off"
  />
  <r-input
    v-model="digit"
    type="digit"
    label="整数"
    placeholder="请输入整数"
    autocomplete="off"
  />
  <r-input
    v-model="number"
    type="number"
    label="数字"
    placeholder="请输入数字（支持小数）"
    autocomplete="off"
  />
  <r-input
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    autocomplete="off"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tel = ref('')
const text = ref('')
const digit = ref('')
const number = ref('')
const password = ref('')
</script>
