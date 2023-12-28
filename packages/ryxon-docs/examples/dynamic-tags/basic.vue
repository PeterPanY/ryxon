<template>
  <r-dynamic-tags v-model="tags" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref(['动动', '态态'])
</script>
