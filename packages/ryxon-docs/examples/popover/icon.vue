<template>
  <r-popover v-model:show="showPopover" :actions="actions">
    <template #reference>
      <r-button type="primary">展示图标</r-button>
    </template>
  </r-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Share, Loading } from '@ryxon/icons'

const showPopover = ref(false)
const actions = [
  { text: '选项一', icon: Edit },
  { text: '选项二', icon: Share },
  { text: '选项三', icon: Loading }
]
</script>
