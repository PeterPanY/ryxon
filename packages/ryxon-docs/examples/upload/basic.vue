<template>
  <r-upload
    v-model="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    upload-text="选择图片"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
</script>
