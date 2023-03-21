<template>
  <r-button @click="handleClick('top')">顶部弹出</r-button>
  <r-button @click="handleClick('bottom')">底部弹出</r-button>
  <r-button @click="handleClick('left')">左侧弹出</r-button>
  <r-button @click="handleClick('right')">右侧弹出</r-button>

  <!-- 顶部弹出 -->
  <r-popup v-model:show="showTop" position="top" :style="{ height: '30%' }" />

  <!-- 底部弹出 -->
  <r-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '30%' }"
  />

  <!-- 左侧弹出 -->
  <r-popup
    v-model:show="showLeft"
    position="left"
    :style="{ width: '30%', height: '100%' }"
  />

  <!-- 右侧弹出 -->
  <r-popup
    v-model:show="showRight"
    position="right"
    :style="{ width: '30%', height: '100%' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)

const handleClick = (val: string) => {
  if (val === 'top') showTop.value = true
  if (val === 'bottom') showBottom.value = true
  if (val === 'left') showLeft.value = true
  if (val === 'right') showRight.value = true
}
</script>
