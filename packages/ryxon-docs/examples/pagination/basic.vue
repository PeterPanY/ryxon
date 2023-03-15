<template>
  <r-pagination
    v-model="currentPage"
    v-model:items-per-page="itemsPerPage"
    :total-items="24"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
const itemsPerPage = ref(10)
</script>
