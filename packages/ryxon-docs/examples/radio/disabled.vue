<template>
  <r-radio v-model="radio" disabled name="disabled">Option A</r-radio>
  <r-radio v-model="radio" disabled name="selected and disabled"
    >Option B</r-radio
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('selected and disabled')
</script>
