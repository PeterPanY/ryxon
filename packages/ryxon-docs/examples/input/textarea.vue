<template>
  <r-input
    v-model="message"
    rows="1"
    autosize
    label="留言"
    type="textarea"
    placeholder="请输入留言"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
</script>
