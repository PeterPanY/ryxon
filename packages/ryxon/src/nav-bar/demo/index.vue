<script setup lang="ts">
import RNavBar from '..'
import RIcon from '../../icon'
import { useTranslate } from '../../../docs/site'
import { showMessage } from '../../message'

const t = useTranslate({
  'zh-CN': {
    useSlot: '使用插槽',
    showBack: '返回上级',
    rightButton: '右侧按钮'
  },
  'en-US': {
    useSlot: 'Use Slot',
    showBack: 'Back',
    rightButton: 'Right Button'
  }
})

const onClickLeft = () => showMessage(t('back'))
const onClickRight = () => showMessage(t('button'))
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-nav-bar :title="t('title')" />
  </demo-block>

  <demo-block :title="t('showBack')">
    <r-nav-bar
      :title="t('title')"
      :left-text="t('back')"
      left-arrow
      @click-right="onClickRight"
    />
  </demo-block>

  <demo-block :title="t('rightButton')">
    <r-nav-bar
      :title="t('title')"
      :left-text="t('back')"
      :right-text="t('button')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </demo-block>

  <demo-block :title="t('useSlot')">
    <r-nav-bar :title="t('title')" :left-text="t('back')" left-arrow>
      <template #right>
        <r-icon name="search" size="18" />
      </template>
    </r-nav-bar>
  </demo-block>
</template>
