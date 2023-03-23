<template>
  <r-input-number v-model="value" :before-change="beforeChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@ryxon/components'

const value = ref(1)

const beforeChange = () => {
  const toast = showToast({
    type: 'loading',
    overlay: true,
    position: 'middle',
    forbidClick: true
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      toast.close()
      // 在 resolve 函数中返回 true 或 false
      resolve(true)
    }, 500)
  })
}
</script>
