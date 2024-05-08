<template>
  <div ref="target">
    <r-rolling-text
      ref="rollingTextRef"
      :text-list="textList"
      :duration="1"
      :auto-start="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RollingTextExpose } from '@ryxon/components'

const textList = ref([
  'aaaaa',
  'bbbbb',
  'ccccc',
  'ddddd',
  'eeeee',
  'fffff',
  'ggggg'
])

const target = ref(null)
const rollingTextRef = ref<RollingTextExpose>()

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    rollingTextRef.value?.start()
  } else {
    rollingTextRef.value?.reset()
  }
})
</script>
