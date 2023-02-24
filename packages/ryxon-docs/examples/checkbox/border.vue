<template>
  <div>
    <r-checkbox v-model="checked1" name="Option1" size="large" border />
    <r-checkbox v-model="checked2" name="Option2" size="large" border />
  </div>
  <div class="mt-4">
    <r-checkbox v-model="checked3" name="Option1" border />
    <r-checkbox v-model="checked4" name="Option2" border />
  </div>
  <div class="mt-4">
    <r-checkbox-group v-model="checkboxGroup1" size="small">
      <r-checkbox name="Option1" border />
      <r-checkbox name="Option2" border />
    </r-checkbox-group>
  </div>
  <div class="mt-4">
    <r-checkbox-group v-model="checkboxGroup1" size="small">
      <r-checkbox name="Option1" border disabled />
      <r-checkbox name="Option2" border disabled />
    </r-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(true)
const checkboxGroup1 = ref(['Option1'])
</script>
