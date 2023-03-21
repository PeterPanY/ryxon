<template>
  <r-button @click="showPopup">展示弹出层</r-button>
  <r-popup v-model:show="show" :style="{ padding: '64px' }">内容</r-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const showPopup = () => {
  show.value = true
}
</script>
