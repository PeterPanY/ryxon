<template>
  <r-slide-bar v-model="active" :actions="list" :init-blocks="4">
    <template #default="{ title }">
      {{ title }}
    </template>
  </r-slide-bar>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

const list = [
  { title: 'a' },
  { title: 'b' },
  { title: 'c' },
  { title: 'd' },
  { title: 'e' },
  { title: 'f' },
  { title: 'g' },
  { title: 'h' },
  { title: 'i' }
]
</script>

<style lang="scss" scoped></style>
