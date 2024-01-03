<template>
  <r-nav-bar title="标题" left-text="返回" left-arrow>
    <template #right>
      <r-icon size="18">
        <Search></Search>
      </r-icon>
    </template>
  </r-nav-bar>
</template>

<script setup lang="ts">
import { Search } from '@ryxon/icons'
</script>
