<template>
  <r-slide-bar :actions="list" :init-blocks="4" :wheel-blocks="2">
    <template #default="{ title }">
      {{ title }}
    </template>
  </r-slide-bar>
</template>

<script setup>
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
