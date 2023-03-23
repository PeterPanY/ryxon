<template>
  <r-upload v-model="fileList" multiple :after-read="afterRead" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileListItem } from '@ryxon/components'

const fileList = ref([
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  // Upload 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  { url: 'https://cloud-image', isImage: true }
])

const afterRead = (file: UploadFileListItem) => {
  console.log(file)
}
</script>
