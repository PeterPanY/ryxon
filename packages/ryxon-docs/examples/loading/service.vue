<template>
  <r-button @click="handleClick">Fullscreen </r-button>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { serviceLoading } from '@ryxon/components'
import { Male } from '@ryxon/icons'

const handleClick = () => {
  const loadingInstance = serviceLoading({
    text: 'loading',
    spinner: markRaw(Male),
    lock: true
  })

  setTimeout(() => {
    loadingInstance.close()
  }, 3000)
}
</script>
