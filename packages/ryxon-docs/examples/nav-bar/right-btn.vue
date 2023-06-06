<template>
  <r-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script setup lang="ts">
import { showMessage } from '@ryxon/components'

const onClickLeft = () => history.back()
const onClickRight = () => showMessage('按钮')
</script>
