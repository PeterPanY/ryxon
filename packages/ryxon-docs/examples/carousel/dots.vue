<template>
  <r-space direction="vertical" style="width: 100%">
    <r-radio-group v-model="type">
      <r-radio v-for="_type in types" :key="_type" :name="_type" type="button">
        {{ _type }}
      </r-radio>
    </r-radio-group>
    <r-radio-group v-model="placement">
      <r-radio
        v-for="_placement in placements"
        :key="_placement"
        :name="_placement"
        type="button"
      >
        {{ _placement }}
      </r-radio>
    </r-radio-group>
    <r-radio-group v-model="direction">
      <r-radio
        v-for="_direction in directions"
        :key="_direction"
        :name="_direction"
        type="button"
      >
        {{ _direction }}
      </r-radio>
    </r-radio-group>
    <r-switch
      v-model="showArrow"
      active-text="Show arrow"
      inactive-text="No arrow"
    >
    </r-switch>
    <r-carousel
      :direction="direction"
      :show-arrow="showArrow"
      :dot-type="type"
      :dot-placement="placement"
      style="height: 240px"
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
  </r-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const typeRef = ref<'dot' | 'line'>('dot')
    const placementRef = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
    const directionRef = ref<'horizontal' | 'vertical'>('horizontal')
    return {
      showArrow: ref(false),
      type: typeRef,
      types: ['dot', 'line'],
      placement: placementRef,
      placements: ['top', 'bottom', 'left', 'right'],
      direction: directionRef,
      directions: ['horizontal', 'vertical']
    }
  }
})
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
