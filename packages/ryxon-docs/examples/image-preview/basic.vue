<template>
  <div @click.stop="handleClick">图片预览</div>
</template>

<script setup lang="ts">
import { showImagePreview } from '@ryxon/components'

const handleClick = () => {
  showImagePreview({
    images: [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
    ],
    closeable: true
  })
}
</script>

<style scoped></style>
