<script setup lang="ts">
import RAddressEdit from '..'
import { ref } from 'vue'
import { areaList } from '@ryxon/area-data'
import { useTranslate } from '../../../docs/site'
import { showMessage } from '../../message'

const t = useTranslate({
  'zh-CN': {
    areaColumnsPlaceholder: ['请选择', '请选择', '请选择'],
    searchResult: [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区'
      },
      {
        name: '黄龙万科中心G座'
      },
      {
        name: '黄龙万科中心H座',
        address: '杭州市西湖区'
      }
    ]
  },
  'en-US': {
    areaColumnsPlaceholder: ['Choose', 'Choose', 'Choose'],
    searchResult: [
      {
        name: 'Name1',
        address: 'Address'
      },
      {
        name: 'Name2'
      },
      {
        name: 'Name3',
        address: 'Address'
      }
    ]
  }
})
const searchResult = ref([])

const onSave = () => showMessage(t('save'))
const onDelete = () => showMessage(t('delete'))
const onChangeDetail = (val: string) => {
  searchResult.value = val ? t('searchResult') : []
}
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="t('areaColumnsPlaceholder')"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </demo-block>
</template>

<style lang="less">
.demo-address-edit {
  .r-doc-demo-block__title {
    padding-bottom: 0;
  }
}
</style>
