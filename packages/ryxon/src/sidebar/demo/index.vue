<script setup lang="ts">
import RGrid from '../../grid'
import RGridItem from '../../grid-item'
import RSidebar from '..'
import RSidebarItem from '../../sidebar-item'
import { ref } from 'vue'
import { useTranslate } from '../../../docs/site'
import { showMessage } from '../../message'

const t = useTranslate({
  'zh-CN': {
    title: '标签名',
    disabled: '禁用选项',
    showBadge: '徽标提示',
    changeEvent: '监听切换事件'
  },
  'en-US': {
    disabled: 'Disabled',
    showBadge: 'Show Badge',
    changeEvent: 'Change Event'
  }
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

const onChange = (index: number) => showMessage(`${t('title')} ${index + 1}`)
</script>

<template>
  <r-grid :column-num="2" :border="false">
    <r-grid-item>
      <h3 class="demo-sidebar-title">{{ t('basicUsage') }}</h3>
      <r-sidebar v-model="active1">
        <r-sidebar-item :title="t('title')" />
        <r-sidebar-item :title="t('title')" />
        <r-sidebar-item :title="t('title')" />
      </r-sidebar>
    </r-grid-item>

    <r-grid-item>
      <h3 class="demo-sidebar-title">{{ t('showBadge') }}</h3>
      <r-sidebar v-model="active2">
        <r-sidebar-item :title="t('title')" dot />
        <r-sidebar-item :title="t('title')" badge="5" />
        <r-sidebar-item :title="t('title')" />
      </r-sidebar>
    </r-grid-item>

    <r-grid-item>
      <h3 class="demo-sidebar-title">{{ t('disabled') }}</h3>
      <r-sidebar v-model="active3">
        <r-sidebar-item :title="t('title')" />
        <r-sidebar-item :title="t('title')" disabled />
        <r-sidebar-item :title="t('title')" />
      </r-sidebar>
    </r-grid-item>

    <r-grid-item>
      <h3 class="demo-sidebar-title">{{ t('changeEvent') }}</h3>
      <r-sidebar v-model="active4" @change="onChange">
        <r-sidebar-item :title="`${t('title')} 1`" />
        <r-sidebar-item :title="`${t('title')} 2`" />
        <r-sidebar-item :title="`${t('title')} 3`" />
      </r-sidebar>
    </r-grid-item>
  </r-grid>
</template>

<style lang="less">
.demo-sidebar {
  background-color: var(--r-background-2);

  .r-sidebar {
    margin-left: var(--r-padding-md);
  }

  &-title {
    margin-bottom: 16px;
    color: var(--r-text-color-2);
    font-weight: normal;
    font-size: 14px;
  }
}
</style>
