<template>
  <r-rate
    v-model="value"
    :size="25"
    :colors="{ 5: 'green' }"
    void-color="red"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>
