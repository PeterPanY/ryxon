<template>
  <r-highlight
    :keywords="keywords"
    :source-string="text"
    highlight-class="custom-class"
  />
</template>

<script setup lang="ts">
const text = '高亮测试文本内容。'
const keywords = '测试'
</script>

<style lang="less" scoped>
:deep(.custom-class) {
  color: red;
}
</style>
