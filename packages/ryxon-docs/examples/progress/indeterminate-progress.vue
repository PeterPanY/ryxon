<template>
  <div class="demo-progress">
    <r-progress :percentage="50" :indeterminate="true" />
    <r-progress :percentage="100" :format="format" :indeterminate="true" />
    <r-progress
      :percentage="100"
      status="success"
      :indeterminate="true"
      :duration="5"
    />
    <r-progress
      :percentage="100"
      status="warning"
      :indeterminate="true"
      :duration="1"
    />
    <r-progress :percentage="50" status="danger" :indeterminate="true" />
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
