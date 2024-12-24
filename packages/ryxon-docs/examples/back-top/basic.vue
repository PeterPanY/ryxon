<template>
  <div>滚动吧，少年</div>
  <r-back-top v-model:active="show" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
