<template>
  <r-carousel
    :space-between="30"
    :loop="false"
    slides-per-view="auto"
    centered-slides
    draggable
  >
    <r-carousel-item style="width: 30%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item style="width: 20%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item style="width: 30%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item style="width: 40%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      />
    </r-carousel-item>
  </r-carousel>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
