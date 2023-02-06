<template>
  <r-input
    v-model="message"
    rows="2"
    autosize
    label="留言"
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
</script>
