<template>
  <r-action-bar class="demo">
    <r-action-bar-icon :icon="ChatDotRound" text="客服" color="#ee0a24" />
    <r-action-bar-icon :icon="ShoppingCart" text="购物车" />
    <r-action-bar-icon :icon="Shop" text="店铺" color="#ff5000" />
    <r-action-bar-button type="warning" text="加入购物车" color="#be99ff" />
    <r-action-bar-button type="danger" text="立即购买" color="#7232dd" />
  </r-action-bar>
</template>

<script setup lang="ts">
import { ChatDotRound, ShoppingCart, Shop } from '@ryxon/icons'
</script>

<style lang="scss" scoped>
.demo {
  position: relative;
}
</style>
