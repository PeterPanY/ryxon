<template>
  <div class="demo-progress">
    <r-progress :percentage="50">
      <r-button text>Content</r-button>
    </r-progress>
    <r-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="danger"
    >
      <span>Content</span>
    </r-progress>
    <r-progress type="circle" :percentage="100" status="success">
      <r-button type="success" :icon="Check" circle />
    </r-progress>
    <r-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </r-progress>
  </div>
</template>

<script lang="ts" setup>
import { Check } from '@ryxon/icons'
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .r-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .r-progress--circle {
  margin-right: 15px;
}
</style>
