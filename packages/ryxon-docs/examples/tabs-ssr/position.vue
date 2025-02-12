<template>
  <r-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <r-radio type="button" name="top">top</r-radio>
    <r-radio type="button" name="right">right</r-radio>
    <r-radio type="button" name="bottom">bottom</r-radio>
    <r-radio type="button" name="left">left</r-radio>
  </r-radio-group>

  <r-tabs-ssr
    :tab-position="tabPosition"
    style="height: 200px"
    shrink
    :items="items"
  ></r-tabs-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { title: 'User', content: 'User' },
  { title: 'Config', content: 'Config' },
  { title: 'Role', content: 'Role' },
  { title: 'Task', content: 'Task' }
]

const tabPosition = ref('left')
</script>
