<script setup lang="ts">
import RArea from '..';
import { ref } from 'vue';
import { areaList } from '@ryxon/area-data';
import { areaListEn } from './area-en';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    title2: '控制选中项',
    title3: '配置显示列',
    title4: '配置列占位提示文字',
    columnsPlaceholder: ['请选择', '请选择', '请选择'],
    areaList,
  },
  'en-US': {
    title2: 'Model Value',
    title3: 'Columns Number',
    title4: 'Columns Placeholder',
    columnsPlaceholder: ['Choose', 'Choose', 'Choose'],
    areaList: areaListEn,
  },
});

const value = ref('330302');
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <r-area :title="t('title')" :area-list="t('areaList')" />
  </demo-block>

  <demo-block card :title="t('title2')">
    <r-area v-model="value" :title="t('title')" :area-list="t('areaList')" />
  </demo-block>

  <demo-block card :title="t('title3')">
    <r-area :title="t('title')" :area-list="t('areaList')" :columns-num="2" />
  </demo-block>

  <demo-block card :title="t('title4')">
    <r-area
      :title="t('title')"
      :area-list="t('areaList')"
      :columns-placeholder="t('columnsPlaceholder')"
    />
  </demo-block>
</template>
