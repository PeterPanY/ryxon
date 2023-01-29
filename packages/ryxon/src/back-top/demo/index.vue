<script setup lang="ts">
import { ref } from 'vue';
import RBackTop from '..';
import RTabs from '../../tabs';
import RTab from '../../tab';
import RCell from '../../cell';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    backTop: '返回顶部',
    customContent: '自定义内容',
    customPosition: '自定义位置',
    setScrollTarget: '设置滚动目标',
  },
  'en-US': {
    backTop: 'Back Top',
    customContent: 'Custom Content',
    customPosition: 'Custom Position',
    setScrollTarget: 'Set Scroll Target',
  },
});

const activeTab = ref(0);
const list = [...Array(50).keys()];
const targetEl = ref<HTMLElement>();
</script>

<template>
  <r-tabs v-model:active="activeTab">
    <r-tab :title="t('basicUsage')">
      <r-cell v-for="item in list" :key="item" :title="item" />
      <r-back-top v-if="activeTab === 0" />
    </r-tab>

    <r-tab :title="t('customPosition')">
      <r-cell v-for="item in list" :key="item" :title="item" />
      <r-back-top v-if="activeTab === 1" right="15vw" bottom="10vh" />
    </r-tab>

    <r-tab :title="t('customContent')">
      <r-cell v-for="item in list" :key="item" :title="item" />
      <r-back-top v-if="activeTab === 2" class="custom-back-top">
        {{ t('backTop') }}
      </r-back-top>
    </r-tab>

    <r-tab :title="t('setScrollTarget')">
      <div class="back-top-wrapper" ref="targetEl">
        <r-cell v-for="item in list" :key="item" :title="item" />
        <r-back-top v-if="activeTab === 3" :target="targetEl" bottom="30vh" />
      </div>
    </r-tab>
  </r-tabs>
</template>

<style lang="less">
.back-top-wrapper {
  height: 60vh;
  overflow: auto;
}

.custom-back-top {
  width: 80px;
  font-size: 14px;
  text-align: center;
}
</style>
