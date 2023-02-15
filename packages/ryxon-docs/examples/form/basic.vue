<template>
  <r-form @submit="onSubmit">
    <r-input
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <r-input
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />

    <div style="margin: 16px">
      <r-button round block type="primary" native-type="submit">
        提交
      </r-button>
    </div>
  </r-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const onSubmit = (values) => {
  console.log('submit', values)
}
</script>
