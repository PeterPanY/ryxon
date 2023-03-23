<template>
  <r-upload :after-read="afterRead" drag>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
  </r-upload>
</template>

<script setup lang="ts">
import type { UploadFileListItem } from '@ryxon/components'

const afterRead = (file: UploadFileListItem | UploadFileListItem[]) => {
  // 此时可以自行将文件上传至服务器
  console.log(file)
}
</script>
