<template>
  <r-button @click="handleClick('center')">居中</r-button>
  <r-button @click="handleClick('bottom')">底部</r-button>

  <!-- 圆角弹窗（居中） -->
  <r-popup
    v-model:show="showRoundCornerCenter"
    round
    :style="{ padding: '64px' }"
  />

  <!-- 圆角弹窗（底部） -->
  <r-popup
    v-model:show="showRoundCornerBottom"
    round
    position="bottom"
    :style="{ height: '30%' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showRoundCornerCenter = ref(false)
const showRoundCornerBottom = ref(false)

const handleClick = (val: string) => {
  if (val === 'center') showRoundCornerCenter.value = true
  if (val === 'bottom') showRoundCornerBottom.value = true
}
</script>
