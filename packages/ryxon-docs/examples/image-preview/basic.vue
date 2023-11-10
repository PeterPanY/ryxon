<template>
  <r-button @click.stop="handleClick">图片预览</r-button>
</template>

<script setup lang="ts">
import { showImagePreview } from '@ryxon/components'

const handleClick = () => {
  showImagePreview({
    images: [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
    ]
  })
}
</script>
