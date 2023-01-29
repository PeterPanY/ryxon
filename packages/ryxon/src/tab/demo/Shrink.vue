<script setup lang="ts">
import { ref } from 'vue';
import RTabs from '../../tabs';
import RTab from '..';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    tab: '标签 ',
    shrink: '收缩布局',
  },
  'en-US': {
    tab: 'Tab ',
    shrink: 'Shrink',
  },
});

const tabs = [1, 2, 3, 4];
const active1 = ref(0);
const active2 = ref(0);
</script>

<template>
  <demo-block :title="t('shrink')">
    <r-tabs v-model:active="active1" shrink>
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
    <r-tabs
      v-model:active="active2"
      type="card"
      shrink
      style="margin-top: var(--r-padding-lg)"
    >
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>
</template>
