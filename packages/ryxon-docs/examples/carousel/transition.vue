<template>
  <r-radio-group v-model="myEffect" style="margin-bottom: 10px">
    <r-radio
      v-for="effect in effects"
      :key="effect"
      :name="effect"
      type="button"
    >
      {{ effect }}
    </r-radio>
  </r-radio-group>
  <r-carousel
    :key="myEffect"
    :effect="myEffect"
    :centered-slides="isCard"
    :slides-per-view="isCard ? 'auto' : 1"
    draggable
    show-arrow
    style="height: 240px"
    @item-click="handleItemClick"
  >
    <r-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      />
    </r-carousel-item>
    <r-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      />
    </r-carousel-item>
  </r-carousel>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CarouselEffect } from '@ryxon/components'

export default defineComponent({
  setup() {
    const effectRef = ref<CarouselEffect>('slide-alone')
    const isCardRef = computed(() => effectRef.value === 'card')

    const handleItemClick = (index: number) => {
      console.log(index)
    }

    return {
      isCard: isCardRef,
      myEffect: effectRef,
      effects: ['slide-alone', 'slide', 'fade', 'card'],
      handleItemClick
    }
  }
})
</script>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
