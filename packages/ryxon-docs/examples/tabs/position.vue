<template>
  <r-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <r-radio type="button" name="top">top</r-radio>
    <r-radio type="button" name="right">right</r-radio>
    <r-radio type="button" name="bottom">bottom</r-radio>
    <r-radio type="button" name="left">left</r-radio>
  </r-radio-group>

  <r-tabs :tab-position="tabPosition" style="height: 200px" shrink>
    <r-tab title="User">User</r-tab>
    <r-tab title="Config">Config</r-tab>
    <r-tab title="Role">Role</r-tab>
    <r-tab title="Task">Task</r-tab>
  </r-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tabPosition = ref('left')
</script>
