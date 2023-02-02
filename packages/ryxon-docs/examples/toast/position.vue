<template>
  <r-button @click="open1">顶部展示</r-button>
  <r-button @click="open2">中间展示</r-button>
  <r-button @click="open3">底部展示</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
// import 'ryxon/es/toast/style'

const open1 = () => {
  showToast({
    message: '顶部展示',
    position: 'top'
  })
}

const open2 = () => {
  showToast({
    message: '中间展示',
    position: 'middle'
  })
}

const open3 = () => {
  showToast({
    message: '底部展示',
    position: 'bottom'
  })
}
</script>
