<template>
  <r-button @click="showComponentCall">插槽使用</r-button>
  <r-image-preview v-model:show="show" :images="images">
    <template #image="{ src }">
      <video style="width: 100%" controls>
        <source :src="src" />
      </video>
    </template>
  </r-image-preview>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const images = [
  'https://www.w3school.com.cn/i/movie.ogg',
  'https://www.w3school.com.cn/i/movie.ogg',
  'https://www.w3school.com.cn/i/movie.ogg'
]

const showComponentCall = () => {
  show.value = true
}
</script>
