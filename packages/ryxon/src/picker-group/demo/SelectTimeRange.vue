<script setup lang="ts">
import { ref } from 'vue'
import { useTranslate } from '../../../docs/site'
import RPickerGroup from '..'
import RTimePicker from '../../time-picker'
import { showMessage } from '../../message'

const t = useTranslate({
  'zh-CN': {
    startTime: '开始时间',
    endTime: '结束时间',
    title: '预约时间'
  },
  'en-US': {
    startTime: 'Start Time',
    endTime: 'End Time',
    title: 'Title'
  }
})

const startTime = ref(['12', '00'])
const endTime = ref(['13', '00'])

const onConfirm = () => {
  showMessage(`${startTime.value.join(':')} - ${endTime.value.join(':')}`)
}
const onCancel = () => {
  showMessage('cancel')
}
</script>

<template>
  <r-picker-group
    :title="t('title')"
    :tabs="[t('startTime'), t('endTime')]"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <r-time-picker v-model="startTime" />
    <r-time-picker v-model="endTime" />
  </r-picker-group>
</template>
