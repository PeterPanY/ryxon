<template>
  <r-count-down millisecond :time="time" format="HH:mm:ss:SS" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(30 * 60 * 60 * 1000)
</script>
