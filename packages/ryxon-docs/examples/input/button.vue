<template>
  <r-input
    v-model="sms"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
  >
    <template #button>
      <r-button size="small" type="primary">发送验证码</r-button>
    </template>
  </r-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sms = ref('')
</script>
