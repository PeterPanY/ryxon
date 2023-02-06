<script setup lang="ts">
import RArea from '../../area'
import RInput from '../../input'
import RPopup from '../../popup'
import { ref } from 'vue'
import { areaList } from '@ryxon/area-data'
import { useTranslate } from '../../../docs/site'
import { areaListEn } from '../../area/demo/area-en'
import type { PickerConfirmEventParams } from '../../picker'

const t = useTranslate({
  'zh-CN': {
    picker: '地区选择',
    areaList,
    placeholder: '点击选择省市区'
  },
  'en-US': {
    picker: 'Area Picker',
    areaList: areaListEn,
    placeholder: 'Select area'
  }
})

const areaCode = ref('')
const showArea = ref(false)

const onConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  areaCode.value = selectedOptions.map((item) => item.text).join('/')
  showArea.value = false
}

const onCancel = () => {
  showArea.value = false
}
</script>

<template>
  <r-input
    v-model="areaCode"
    is-link
    readonly
    name="area"
    :label="t('picker')"
    :placeholder="t('placeholder')"
    @click="showArea = true"
  />
  <r-popup v-model:show="showArea" round position="bottom" teleport="body">
    <r-area
      :area-list="t('areaList')"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </r-popup>
</template>
