<template>
  <r-count-down
    ref="countDown"
    millisecond
    :time="3000"
    :auto-start="false"
    format="ss:SSS"
    @finish="onFinish"
  />
  <r-grid clickable>
    <r-grid-item text="开始" :icon="VideoPlay" @click="start" />
    <r-grid-item text="暂停" :icon="VideoPause" @click="pause" />
    <r-grid-item text="重置" :icon="Refresh" @click="reset" />
  </r-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showMessage } from '@ryxon/components'
import { VideoPlay, VideoPause, Refresh } from '@ryxon/icons'

const countDown = ref(null)

const start = () => {
  countDown.value.start()
}
const pause = () => {
  countDown.value.pause()
}
const reset = () => {
  countDown.value.reset()
}
const onFinish = () => showMessage('倒计时结束')
</script>
