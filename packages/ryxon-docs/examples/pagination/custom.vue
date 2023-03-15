<template>
  <r-pagination v-model="currentPage" :next-icon="ArrowRight" :total-items="90">
    <template #prev-text>
      <r-icon><ArrowLeft></ArrowLeft></r-icon>
    </template>
    <template #page="{ text }">{{ text }}</template>
  </r-pagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, ArrowRight } from '@ryxon/icons'

const currentPage = ref(1)
</script>
