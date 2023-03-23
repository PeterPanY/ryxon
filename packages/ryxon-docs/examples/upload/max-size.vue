<template>
  <r-upload multiple :max-size="500 * 1024" @oversize="onOversize" />
</template>

<script setup lang="ts">
import { showToast } from 'ryxon'
import type { UploadFileListItem } from '@ryxon/components'

const onOversize = (file: UploadFileListItem | UploadFileListItem[]) => {
  console.log(file)
  showToast('文件大小不能超过 500kb')
}
</script>
