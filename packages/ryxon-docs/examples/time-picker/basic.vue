<template>
  <r-time-picker-pc v-model="currentTime" placeholder="Arbitrary time" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTime = ref()
</script>
