<template>
  <r-count-down :time="time" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(30 * 60 * 60 * 1000)
</script>
