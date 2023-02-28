<template>
  <r-checkbox v-model="checked1" disabled>复选框</r-checkbox>
  <r-checkbox v-model="checked2" disabled>复选框</r-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>
