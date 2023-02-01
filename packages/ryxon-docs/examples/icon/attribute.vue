<template>
  <div>
    <r-icon size="20px" style="margin-right: 8px">
      <Edit />
    </r-icon>
    <r-icon
      size="20px"
      color="#409EFC"
      class="no-inherit"
      style="margin-right: 8px"
    >
      <Share />
    </r-icon>
    <r-icon size="20px" class="is-loading" style="margin-right: 8px">
      <Loading />
    </r-icon>
  </div>
</template>

<script setup lang="ts">
import { Edit, Share, Loading } from '@ryxon/icons'
</script>
