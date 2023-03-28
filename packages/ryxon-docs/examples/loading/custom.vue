<template>
  <r-loading vertical>
    <template #icon>
      <r-icon size="30">
        <Star></Star>
      </r-icon>
    </template>
    加载中...
  </r-loading>
</template>

<script setup lang="ts">
import { Star } from '@ryxon/icons'
</script>
