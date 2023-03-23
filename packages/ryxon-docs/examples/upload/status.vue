<template>
  <r-upload v-model="fileList" :after-read="afterRead" :auto-upload="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileListItem } from '@ryxon/components'

const fileList = ref([
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'uploading'
  },
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'failed'
  },
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'done'
  }
])

const afterRead = (file: UploadFileListItem) => {
  file.status = 'uploading'

  setTimeout(() => {
    file.status = 'failed'
  }, 1000)
}
</script>
