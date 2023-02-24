<template>
  <div>
    <r-radio-group v-model="radioGroup1" size="large">
      <r-radio name="Option1" border />
      <r-radio name="Option2" border />
    </r-radio-group>
  </div>
  <div class="demo-button-style">
    <r-radio-group v-model="radioGroup1">
      <r-radio name="Option1" border />
      <r-radio name="Option2" border />
    </r-radio-group>
  </div>
  <div class="demo-button-style">
    <r-radio-group v-model="radioGroup1" size="small">
      <r-radio name="Option1" border />
      <r-radio name="Option2" border />
    </r-radio-group>
  </div>
  <div class="demo-button-style">
    <r-radio-group v-model="radioGroup1" size="small">
      <r-radio name="Option1" border disabled />
      <r-radio name="Option2" border disabled />
    </r-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radioGroup1 = ref('Option1')
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
