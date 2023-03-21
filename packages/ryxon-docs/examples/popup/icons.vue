<template>
  <r-button @click="handleClick('close')">关闭图标</r-button>
  <r-button @click="handleClick('custom')">自定义关闭图标</r-button>
  <r-button @click="handleClick('position')">关闭图标位置</r-button>

  <r-popup
    v-model:show="showCloseIcon"
    closeable
    position="bottom"
    :style="{ height: '30%' }"
  />
  <!-- 自定义图标 -->
  <r-popup
    v-model:show="showCustomCloseIcon"
    closeable
    :close-icon="CircleClose"
    position="bottom"
    :style="{ height: '30%' }"
  />
  <!-- 图标位置 -->
  <r-popup
    v-model:show="showCustomIconPosition"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '30%' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CircleClose } from '@ryxon/icons'

const showCloseIcon = ref(false)
const showCustomCloseIcon = ref(false)
const showCustomIconPosition = ref(false)

const handleClick = (val: string) => {
  if (val === 'close') showCloseIcon.value = true
  if (val === 'custom') showCustomCloseIcon.value = true
  if (val === 'position') showCustomIconPosition.value = true
}
</script>
