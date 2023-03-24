<template>
  <r-action-bar class="demo">
    <r-action-bar-icon :icon="ChatDotRound" text="客服" @click="onClickIcon" />
    <r-action-bar-icon
      :icon="ShoppingCart"
      text="购物车"
      @click="onClickIcon"
    />
    <r-action-bar-icon :icon="Shop" text="店铺" @click="onClickIcon" />
    <r-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
  </r-action-bar>
</template>

<script setup lang="ts">
import { ChatDotRound, ShoppingCart, Shop } from '@ryxon/icons'
import { showToast } from '@ryxon/components'

const onClickIcon = () => showToast('点击图标')
const onClickButton = () => showToast('点击按钮')
</script>

<style lang="scss" scoped>
.demo {
  position: relative;
}
</style>
