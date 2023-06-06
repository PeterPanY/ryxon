<template>
  <r-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script setup lang="ts">
const onClickLeft = () => history.back()
</script>
