<template>
  <r-radio-group
    v-model="align"
    direction="horizontal"
    style="margin-bottom: 16px"
  >
    <r-radio name="start">start</r-radio>
    <r-radio name="center">center</r-radio>
    <r-radio name="end">end</r-radio>
    <r-radio name="baseline">baseline</r-radio>
  </r-radio-group>

  <r-space :align="align" style="padding: 16px; background: #f3f2f5">
    <r-button type="primary">{{ align }}</r-button>
    <div style="padding: 40px 20px; background: #fff">Block</div>
  </r-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const align = ref('center')
</script>
