<template>
  <r-upload multiple :max-size="500 * 1024" @oversize="onOversize" />
</template>

<script setup lang="ts">
import { showMessage } from '@ryxon/components'
import type { UploadFileListItem } from '@ryxon/components'

const onOversize = (file: UploadFileListItem | UploadFileListItem[]) => {
  console.log(file)
  showMessage('文件大小不能超过 500kb')
}
</script>
