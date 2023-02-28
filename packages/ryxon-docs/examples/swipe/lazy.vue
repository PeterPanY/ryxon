<template>
  <r-swipe :autoplay="3000" lazy-render style="height: 200px">
    <r-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </r-swipe-item>
  </r-swipe>
</template>

<script setup lang="ts">
const images = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
]
</script>

<style scoped></style>
