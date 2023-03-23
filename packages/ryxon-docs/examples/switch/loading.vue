<template>
  <r-switch v-model="checked" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
