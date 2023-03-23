<template>
  <r-input-number v-model="num" step="2" />
  <r-input-number v-model="num2" step="0.2" :decimal-length="1" step-strictly />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const num2 = ref(1)
</script>
