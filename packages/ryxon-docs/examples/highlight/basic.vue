<template>
  <r-highlight :keywords="keywords" :source-string="text" />
</template>

<script setup lang="ts">
const text = '高亮测试文本内容。'
const keywords = '测试'
</script>
