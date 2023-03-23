<template>
  <r-upload
    ref="uploadRef"
    v-model="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
  >
  </r-upload>

  <r-button class="ml-3" type="success" @click="submitUpload">
    上传文件
  </r-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadInstance } from '@ryxon/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([])

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>
