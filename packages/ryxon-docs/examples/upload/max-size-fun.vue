<template>
  <r-upload multiple :max-size="isOverSize" @oversize="onOversize" />
</template>

<script setup lang="ts">
import { showToast } from '@ryxon/components'

const isOverSize = (file: File) => {
  const maxSize = file.type === 'image/jpeg' ? 500 * 1024 : 1024 * 1024
  return file.size > maxSize
}

const onOversize = (file: { file: { type: string } }) => {
  showToast(
    `${file.file.type}类型文件大小不能超过 ${
      file.file.type === 'image/jpeg' ? '500kb' : '1M'
    }`
  )
}
</script>
