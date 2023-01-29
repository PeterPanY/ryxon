<script setup lang="ts">
import RTabs from '../../tabs';
import RTab from '..';
import RIcon from '../../icon';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';
import { showToast } from '../../toast';
import Shrink from './Shrink.vue';

const t = useTranslate({
  'zh-CN': {
    tab: '标签 ',
    title2: '标签栏滚动',
    title3: '禁用标签',
    title4: '样式风格',
    title5: '点击事件',
    title6: '粘性布局',
    title7: '自定义标签',
    title8: '切换动画',
    title9: '滑动切换',
    title10: '滚动导航',
    disabled: ' 已被禁用',
    matchByName: '通过名称匹配',
    beforeChange: '异步切换',
  },
  'en-US': {
    tab: 'Tab ',
    content: 'content of tab',
    title2: 'Swipe Tabs',
    title3: 'Disabled Tab',
    title4: 'Card Style',
    title5: 'Click Event',
    title6: 'Sticky',
    title7: 'Custom Tab',
    title8: 'Switch Animation',
    title9: 'Swipeable',
    title10: 'Scrollspy',
    disabled: ' is disabled',
    matchByName: 'Match By Name',
    beforeChange: 'Before Change',
  },
});

const active1 = ref(0);
const active2 = ref(0);
const active3 = ref(0);
const active4 = ref(0);
const active5 = ref(0);
const active6 = ref(0);
const active7 = ref(0);
const active8 = ref(0);
const active9 = ref(0);
const active10 = ref(0);
const active11 = ref(0);
const activeName = ref('b');

const tabs = [1, 2, 3, 4];

const onClickTab = ({ title }: { title: string }) => {
  showToast(title);
};

const beforeChange = (name: number) => {
  if (name === 1) {
    return false;
  }
  return new Promise<boolean>((resolve) => {
    resolve(name !== 3);
  });
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-tabs v-model:active="active1">
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('matchByName')">
    <r-tabs v-model:active="activeName">
      <r-tab name="a" :title="t('tab') + 1"> {{ t('content') }} 1 </r-tab>
      <r-tab name="b" :title="t('tab') + 2"> {{ t('content') }} 2 </r-tab>
      <r-tab name="c" :title="t('tab') + 3"> {{ t('content') }} 3 </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title2')">
    <r-tabs v-model:active="active2">
      <r-tab v-for="index in 8" :title="t('tab') + index" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title3')">
    <r-tabs v-model:active="active3">
      <r-tab
        v-for="index in 3"
        :title="t('tab') + index"
        :disabled="index === 2"
        :key="index"
      >
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title4')">
    <r-tabs v-model:active="active4" type="card">
      <r-tab v-for="index in 3" :title="t('tab') + index" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title5')">
    <r-tabs v-model:active="active5" @click-tab="onClickTab">
      <r-tab v-for="index in 2" :title="t('tab') + index" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title6')">
    <r-tabs v-model:active="active6" sticky>
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <shrink />

  <demo-block :title="t('title7')">
    <r-tabs v-model:active="active7">
      <r-tab v-for="index in 2" :key="index">
        <template #title> <r-icon name="more-o" />{{ t('tab') }} </template>
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title8')">
    <r-tabs v-model:active="active8" animated>
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title9')">
    <r-tabs v-model:active="active9" swipeable>
      <r-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('title10')">
    <r-tabs v-model:active="active10" scrollspy sticky>
      <r-tab :title="t('tab') + index" v-for="index in 8" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('beforeChange')">
    <r-tabs v-model:active="active11" :before-change="beforeChange">
      <r-tab :title="t('tab') + index" v-for="index in 4" :key="index">
        {{ t('content') }} {{ index }}
      </r-tab>
    </r-tabs>
  </demo-block>
</template>

<style lang="less">
.demo-tab {
  margin-bottom: 80vh;

  .r-tab .r-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .r-tab__panel {
    padding: 24px 20px;
    background: var(--r-background-2);
  }

  .r-tabs--card .r-tab__panel {
    background: transparent;
  }
}
</style>
