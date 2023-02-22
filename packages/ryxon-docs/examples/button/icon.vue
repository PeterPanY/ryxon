<template>
  <div class="flex">
    <r-button type="primary" :icon="Edit" />
    <r-button type="primary" :icon="Share" />
    <r-button type="primary" :icon="Delete" />
    <r-button type="primary" :icon="Search">Search</r-button>
    <r-button type="primary">
      Upload<r-icon class="r-icon--right"><Upload /></r-icon>
    </r-button>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@ryxon/icons'
</script>
