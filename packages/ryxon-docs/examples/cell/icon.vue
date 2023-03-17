<template>
  <r-cell title="单元格" :icon="Setting" />
  <r-cell title="单元格" is-link />
  <r-cell title="单元格" is-link value="内容" />
  <r-cell title="单元格" is-link arrow-direction="down" value="内容" />
</template>

<script lang="ts" setup>
import { Setting } from '@ryxon/icons'
</script>
