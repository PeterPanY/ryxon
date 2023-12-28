<template>
  <r-dynamic-tags v-model="tags" :max="3" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref(['动动', '态态'])
</script>
