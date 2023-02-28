<template>
  <div>
    <r-radio-group v-model="radio1">
      <r-radio name="1" size="large">Option 1</r-radio>
      <r-radio name="2" size="large">Option 2</r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio2">
      <r-radio name="1">Option 1</r-radio>
      <r-radio name="2">Option 2</r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio3">
      <r-radio name="1" size="small">Option 1</r-radio>
      <r-radio name="2" size="small">Option 2</r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio3" disabled>
      <r-radio name="1" size="small">Option 1</r-radio>
      <r-radio name="2" size="small">Option 2</r-radio>
    </r-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
</script>
