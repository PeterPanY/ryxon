<template>
  <r-carousel
    ref="carouselRef"
    v-model:current-index="active"
    @change="handleChange"
  >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    />
  </r-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const carouselRef = ref(null)

const active = ref(0)
const handleChange = (currentIndex: number, lastIndex: number) => {
  console.log(currentIndex, lastIndex)
  console.log(carouselRef.value)
}
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
