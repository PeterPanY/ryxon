<script setup lang="ts">
import RInput from '../../input'
import RPopup from '../../popup'
import RCascader, { CascaderOption } from '..'
import { computed, reactive } from 'vue'
import { useTranslate } from '../../../docs/site'
import { deepClone } from '../../utils/deep-clone'
import zhCNOptions from './area-zh-CN'
import enUSOptions from './area-en-US'
import type { Numeric } from '../../utils'

const t = useTranslate({
  'zh-CN': {
    area: '地区',
    options: zhCNOptions,
    selectArea: '请选择地区',
    customColor: '自定义颜色',
    asyncOptions: '异步加载选项',
    asyncOptions1: [
      {
        text: '浙江省',
        value: '330000',
        children: []
      }
    ],
    asyncOptions2: [
      { text: '杭州市', value: '330100' },
      { text: '宁波市', value: '330200' }
    ],
    currentLevel: (level: number) => `当前为第 ${level} 级`,
    customContent: '自定义选项上方内容',
    customInputNames: '自定义字段名'
  },
  'en-US': {
    area: 'Area',
    options: enUSOptions,
    selectArea: 'Select Area',
    customColor: 'Custom Color',
    asyncOptions: 'Async Options',
    asyncOptions1: [
      {
        text: 'Zhejiang',
        value: '330000',
        children: []
      }
    ],
    asyncOptions2: [
      { text: 'Hangzhou', value: '330100' },
      { text: 'Ningbo', value: '330200' }
    ],
    currentLevel: (level: number) => `Current level is ${level}`,
    customContent: 'Custom Content',
    customInputNames: 'Custom Input Names'
  }
})

type StateItem = {
  show: boolean
  value: Numeric | undefined
  result: string
  options?: CascaderOption[]
  tabIndex?: number
}

const baseState = reactive<StateItem>({
  show: false,
  value: '',
  result: ''
})
const customColorState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: ''
})
const asyncState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: '',
  options: t('asyncOptions1')
})
const customInputState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: ''
})

const inputNames = {
  text: 'name',
  value: 'code',
  children: 'items'
}

const customContentState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: ''
})

const customInputOptions = computed(() => {
  const options = deepClone(t('options'))
  const adjustInputName = (item: CascaderOption) => {
    if ('text' in item) {
      item.name = item.text
      delete item.text
    }
    if ('value' in item) {
      item.code = item.value
      delete item.value
    }
    if ('children' in item) {
      item.items = item.children
      delete item.children
      item.items.forEach(adjustInputName)
    }
  }
  options.forEach(adjustInputName)
  return options
})

const loadDynamicOptions = ({ value }: CascaderOption) => {
  if (value === '330000') {
    setTimeout(() => {
      asyncState.options![0].children = t('asyncOptions2')
    }, 500)
  }
}

const onFinish = (
  state: StateItem,
  {
    value,
    selectedOptions
  }: { value: Numeric; selectedOptions: CascaderOption[] }
) => {
  const result = selectedOptions
    .map((option) => option.text || option.name)
    .join('/')

  state.show = false
  state.value = value
  state.result = result
}
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <r-input
      v-model="baseState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="baseState.show = true"
    />
    <r-popup
      v-model:show="baseState.show"
      round
      teleport="body"
      position="bottom"
    >
      <r-cascader
        v-model="baseState.value"
        :title="t('selectArea')"
        :options="t('options')"
        @close="baseState.show = false"
        @finish="onFinish(baseState, $event)"
      />
    </r-popup>
  </demo-block>

  <demo-block card :title="t('customColor')">
    <r-input
      v-model="customColorState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customColorState.show = true"
    />
    <r-popup
      v-model:show="customColorState.show"
      round
      teleport="body"
      position="bottom"
    >
      <r-cascader
        v-model="customColorState.value"
        :title="t('selectArea')"
        :options="t('options')"
        active-color="#ee0a24"
        @close="customColorState.show = false"
        @finish="onFinish(customColorState, $event)"
      />
    </r-popup>
  </demo-block>

  <demo-block card :title="t('asyncOptions')">
    <r-input
      v-model="asyncState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="asyncState.show = true"
    />
    <r-popup
      v-model:show="asyncState.show"
      round
      teleport="body"
      position="bottom"
    >
      <r-cascader
        v-model="asyncState.value"
        :title="t('selectArea')"
        :options="asyncState.options"
        @close="asyncState.show = false"
        @change="loadDynamicOptions"
        @finish="onFinish(asyncState, $event)"
      />
    </r-popup>
  </demo-block>

  <demo-block card :title="t('customInputNames')">
    <r-input
      v-model="customInputState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customInputState.show = true"
    />
    <r-popup
      v-model:show="customInputState.show"
      round
      teleport="body"
      position="bottom"
      safe-area-inset-bottom
    >
      <r-cascader
        v-model="customInputState.value"
        :title="t('selectArea')"
        :options="customInputOptions"
        :input-names="inputNames"
        @close="customInputState.show = false"
        @finish="onFinish(customInputState, $event)"
      />
    </r-popup>
  </demo-block>

  <demo-block card :title="t('customContent')">
    <r-input
      v-model="customContentState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customContentState.show = true"
    />
    <r-popup
      v-model:show="customContentState.show"
      round
      teleport="body"
      position="bottom"
      safe-area-inset-bottom
    >
      <r-cascader
        v-model="customContentState.value"
        :title="t('selectArea')"
        :options="customInputOptions"
        :input-names="inputNames"
        @close="customContentState.show = false"
        @finish="onFinish(customContentState, $event)"
      >
        <template #options-top="{ tabIndex }">
          <div class="current-level">{{ t('currentLevel', tabIndex) }}</div>
        </template>
      </r-cascader>
    </r-popup>
  </demo-block>
</template>

<style lang="less">
.current-level {
  padding: 10px 16px 0;
}
</style>
