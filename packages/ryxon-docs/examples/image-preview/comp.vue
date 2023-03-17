<template>
  <r-button @click="showComponentCall">组件使用</r-button>
  <r-image-preview v-model:show="show" :images="images" @change="onChange">
    <template #index>第{{ index + 1 }}页</template>
  </r-image-preview>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const index = ref(0)
const images = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
]

const showComponentCall = () => {
  show.value = true
}

const onChange = (newIndex: number) => {
  index.value = newIndex
}
</script>
