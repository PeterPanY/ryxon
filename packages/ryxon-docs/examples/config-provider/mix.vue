<template>
  <r-config-provider
    :theme-vars="themeVars"
    :theme-vars-dark="themeVarsDark"
    :theme-vars-light="themeVarsLight"
  >
    <r-button type="primary">背景</r-button>
  </r-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const themeVars = reactive({ buttonPrimaryBackground: 'red' })
const themeVarsDark = reactive({ buttonPrimaryBackground: 'blue' })
const themeVarsLight = reactive({ buttonPrimaryBackground: 'green' })
</script>
