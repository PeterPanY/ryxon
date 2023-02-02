<template>
  <r-button @click="open1">自定义图标</r-button>
  <r-button @click="open2">自定义图片</r-button>
  <r-button @click="open3">自定义图标类型</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
// import 'ryxon/es/toast/style'
import { Edit } from '@ryxon/icons'

const open1 = () => {
  showToast({
    message: '自定义图标',
    icon: Edit
  })
}

const open2 = () => {
  showToast({
    message: '自定义图标',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  })
}

const open3 = () => {
  showToast({
    type: 'loading',
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner'
  })
}
</script>
