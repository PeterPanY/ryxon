<template>
  <r-switch v-model="checked" size="22px" style="--r-switch-width: 50px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
