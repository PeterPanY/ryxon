<template>
  <r-upload v-model="fileList" :deletable="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'ryxon'

const fileList = ref([
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    deletable: true,
    beforeDelete: () => {
      showToast('删除前置处理')
    }
  },
  {
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    imageFit: 'contain'
  }
])
</script>
