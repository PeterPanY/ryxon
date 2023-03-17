<template>
  <r-cell value="内容" is-link>
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
      <span class="custom-title">单元格</span>
      <r-tag type="primary">标签</r-tag>
    </template>
  </r-cell>

  <r-cell title="单元格" :icon="Menu">
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template #right-icon>
      <r-icon class="search-icon">
        <Search></Search>
      </r-icon>
    </template>
  </r-cell>
</template>

<script setup lang="ts">
import { Menu, Search } from '@ryxon/icons'
</script>

<style scoped>
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>
