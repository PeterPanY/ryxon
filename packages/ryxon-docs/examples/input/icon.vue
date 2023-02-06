<template>
  <r-input
    v-model="value1"
    label="文本"
    :left-icon="Share"
    :right-icon="Edit"
    placeholder="显示图标"
  />
  <r-input
    v-model="value2"
    clearable
    label="文本"
    :left-icon="Loading"
    placeholder="显示清除图标"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Edit, Share, Loading } from '@ryxon/icons'

const value1 = ref('')
const value2 = ref('123')
</script>
