<script setup lang="ts">
import RTabs from '../../tabs';
import RTab from '../../tab';
import RIndexBar from '..';
import RIndexAnchor from '../../index-anchor';
import RCell from '../../cell';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    customIndexList: '自定义索引列表',
  },
  'en-US': {
    text: 'Text',
    customIndexList: 'Custom Index List',
  },
});

const activeTab = ref(0);
const indexList: string[] = [];
const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
const charCodeOfA = 'A'.charCodeAt(0);

for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}
</script>

<template>
  <r-tabs v-model:active="activeTab">
    <r-tab :title="t('basicUsage')">
      <r-index-bar>
        <div v-for="index in indexList" :key="index">
          <r-index-anchor :index="index" />
          <r-cell :title="t('text')" />
          <r-cell :title="t('text')" />
          <r-cell :title="t('text')" />
        </div>
      </r-index-bar>
    </r-tab>

    <r-tab :title="t('customIndexList')">
      <r-index-bar :index-list="customIndexList">
        <div v-for="index in customIndexList" :key="index">
          <r-index-anchor :index="index">
            {{ t('title') + index }}
          </r-index-anchor>
          <r-cell :title="t('text')" />
          <r-cell :title="t('text')" />
          <r-cell :title="t('text')" />
        </div>
      </r-index-bar>
    </r-tab>
  </r-tabs>
</template>
