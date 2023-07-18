<template>
  <div class="demo-progress">
    <r-progress :percentage="50" />
    <r-progress :percentage="100" :format="format" />
    <r-progress :percentage="100" status="success" />
    <r-progress :percentage="100" status="warning" />
    <r-progress :percentage="50" status="danger" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage: number) =>
  percentage === 100 ? 'Full' : `${percentage}%`
</script>

<style scoped>
.demo-progress .r-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
