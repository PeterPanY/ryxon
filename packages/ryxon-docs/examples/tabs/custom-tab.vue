<template>
  <r-tabs shrink>
    <r-tab>
      <template #title>
        <r-icon><calendar /></r-icon>
        <span>Route</span>
      </template>
      Route
    </r-tab>
    <r-tab title="Config">Config</r-tab>
    <r-tab title="Role">Role</r-tab>
    <r-tab title="Task">Task</r-tab>
  </r-tabs>
</template>

<script lang="ts" setup>
import { Calendar } from '@ryxon/icons'
</script>
