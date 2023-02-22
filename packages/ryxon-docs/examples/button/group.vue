<template>
  <r-button-group>
    <r-button type="primary" :icon="ArrowLeft">Previous Page</r-button>
    <r-button type="primary">
      Next Page<r-icon class="r-icon--right"><ArrowRight /></r-icon>
    </r-button>
  </r-button-group>

  <r-button-group class="ml-4">
    <r-button type="primary" :icon="Edit" />
    <r-button type="primary" :icon="Share" />
    <r-button type="primary" :icon="Delete" />
  </r-button-group>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, Delete, Edit, Share } from '@ryxon/icons'
</script>

<style>
.ml-4 {
  margin-left: 20px;
}
</style>
