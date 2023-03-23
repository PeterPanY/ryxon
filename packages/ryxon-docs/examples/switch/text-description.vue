<template>
  <r-switch
    v-model="value1"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <r-switch
    v-model="value2"
    style="--r-switch-on-background: #13ce66; --r-switch-background: #ff4949"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <r-switch
    v-model="value3"
    inline-prompt
    active-text="是"
    inactive-text="否"
  />
  <r-switch
    v-model="value4"
    inline-prompt
    style="--r-switch-on-background: #13ce66; --r-switch-background: #ff4949"
    active-text="Y"
    inactive-text="N"
  />
  <r-switch
    v-model="value5"
    inline-prompt
    style="--r-switch-width: 70px"
    active-text="超出省略"
    inactive-text="超出省略"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
</script>
