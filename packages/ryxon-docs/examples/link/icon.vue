<template>
  <r-space>
    <r-link>
      Check<r-icon class="r-icon--right"><icon-view /></r-icon>
    </r-link>

    <r-link only-default underline="always">
      Check
      <template #suffix>
        <r-icon class="r-icon--right" size="30"><icon-view /></r-icon>
      </template>
    </r-link>
  </r-space>
</template>

<script setup lang="ts">
import { View as iconView } from '@ryxon/icons'
</script>
