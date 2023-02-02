<template>
  <r-button @click="open1">Toast 组件</r-button>

  <r-toast v-model:show="show">
    <template #message> Toast 组件使用 </template>
  </r-toast>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const open1 = () => {
  show.value = true
}
</script>

<style scoped></style>
