<template>
  <r-button type="primary" @click="show = true">显示遮罩层</r-button>
  <r-overlay :show="show" z-index="2000" @click="show = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
