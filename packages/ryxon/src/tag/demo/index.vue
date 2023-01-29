<script setup lang="ts">
import RCell from '../../cell';
import RTag from '..';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    type: '类型',
    mark: '标记样式',
    plain: '空心样式',
    round: '圆角样式',
    tagStyle: '样式风格',
    closeable: '可关闭标签',
    smallSize: '小号标签',
    largeSize: '大号标签',
    mediumSize: '中号标签',
    customSize: '标签大小',
    customColor: '自定义颜色',
    customBgColor: '背景颜色',
    customTextColor: '文字颜色',
    customPlainColor: '空心颜色',
  },
  'en-US': {
    mark: 'Mark style',
    plain: 'Plain style',
    round: 'Round style',
    tagStyle: 'Tag Style',
    closeable: 'Closeable',
    smallSize: 'Small Size',
    largeSize: 'Large Size',
    mediumSize: 'Medium Size',
    customColor: 'Custom Color',
    customSize: 'Custom Size',
    customBgColor: 'Background Color',
    customTextColor: 'Text Color',
    customPlainColor: 'Plain Color',
  },
});

const show = ref(true);
const close = () => {
  show.value = false;
};
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <r-cell :title="`primary ${t('type')}`">
      <template #value>
        <r-tag type="primary">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="`success ${t('type')}`">
      <template #value>
        <r-tag type="success">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="`danger ${t('type')}`">
      <template #value>
        <r-tag type="danger">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="`warning ${t('type')}`">
      <template #value>
        <r-tag type="warning">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
  </demo-block>

  <demo-block card :title="t('tagStyle')">
    <r-cell :title="t('plain')">
      <template #value>
        <r-tag plain type="primary">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('round')">
      <template #value>
        <r-tag round type="primary">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('mark')">
      <template #value>
        <r-tag mark type="primary">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('closeable')">
      <template #value>
        <r-tag
          closeable
          :show="show"
          size="medium"
          type="primary"
          @close="close"
        >
          {{ t('tag') }}
        </r-tag>
      </template>
    </r-cell>
  </demo-block>

  <demo-block card :title="t('customSize')">
    <r-cell :title="t('smallSize')">
      <template #value>
        <r-tag type="primary">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('mediumSize')">
      <template #value>
        <r-tag type="primary" size="medium">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('largeSize')">
      <template #value>
        <r-tag type="primary" size="large">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
  </demo-block>

  <demo-block card :title="t('customColor')">
    <r-cell :title="t('customBgColor')">
      <template #value>
        <r-tag color="#7232dd">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('customTextColor')">
      <template #value>
        <r-tag color="#ffe1e1" text-color="#ad0000">{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
    <r-cell :title="t('customPlainColor')">
      <template #value>
        <r-tag color="#7232dd" plain>{{ t('tag') }}</r-tag>
      </template>
    </r-cell>
  </demo-block>
</template>

<style lang="less">
.demo-tag {
  .r-tag + .r-tag {
    margin-left: var(--r-padding-xs);
  }
}
</style>
