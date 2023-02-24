<template>
  <r-checkbox v-model="checked" shape="square">自定义形状</r-checkbox>
  <r-checkbox v-model="checked" checked-color="#ee0a24">自定义颜色</r-checkbox>
  <r-checkbox v-model="checked">
    自定义图标
    <template #icon="props">
      <span>{{ props.checked ? 'yes' : 'no' }}</span>
    </template>
  </r-checkbox>
  <r-checkbox v-model="checked" label-position="left">左侧文本</r-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
