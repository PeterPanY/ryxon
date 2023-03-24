<template>
  <r-action-bar class="demo">
    <r-action-bar-icon :icon="ChatDotRound" text="客服" dot />
    <r-action-bar-icon :icon="ShoppingCart" text="购物车" badge="5" />
    <r-action-bar-icon :icon="Shop" text="店铺" badge="12" />
    <r-action-bar-button type="warning" text="加入购物车" />
    <r-action-bar-button type="danger" text="立即购买" />
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
