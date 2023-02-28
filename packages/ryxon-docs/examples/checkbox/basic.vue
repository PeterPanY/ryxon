<template>
  <div>
    <r-checkbox v-model="checked1" name="Option 1" size="large" />
    <r-checkbox v-model="checked2" name="Option 2" size="large" />
  </div>
  <div>
    <r-checkbox v-model="checked3" name="Option 1" />
    <r-checkbox v-model="checked4" name="Option 2" />
  </div>
  <div>
    <r-checkbox v-model="checked5" name="Option 1" size="small" />
    <r-checkbox v-model="checked6" name="Option 2" size="small" />
  </div>
  <div>
    <r-checkbox v-model="checked5" name="Option 1" size="small" disabled />
    <r-checkbox v-model="checked6" name="Option 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>
