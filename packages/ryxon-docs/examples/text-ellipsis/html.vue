<template>
  <r-text-ellipsis
    :content="text"
    is-html
    expand-text="展开"
    collapse-text="收起"
  />
</template>

<script setup lang="ts">
const text =
  '<div>这是文本。文本。文本。文本。文本。文本。文本。文本。<div>我是html文本</div文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。文本。</div>'
</script>
