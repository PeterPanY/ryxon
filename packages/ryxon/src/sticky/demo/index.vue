<script setup lang="ts">
import RSticky from '..';
import RButton from '../../button';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    offsetTop: '吸顶距离',
    offsetBottom: '吸底距离',
    setContainer: '指定容器',
  },
  'en-US': {
    offsetTop: 'Offset Top',
    offsetBottom: 'Offset Bottom',
    setContainer: 'Set Container',
  },
});

const container = ref<Element>();
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-sticky>
      <r-button type="primary" style="margin-left: 15px">
        {{ t('basicUsage') }}
      </r-button>
    </r-sticky>
  </demo-block>

  <demo-block :title="t('offsetTop')">
    <r-sticky :offset-top="50">
      <r-button type="primary" style="margin-left: 115px">
        {{ t('offsetTop') }}
      </r-button>
    </r-sticky>
  </demo-block>

  <demo-block :title="t('setContainer')">
    <div
      ref="container"
      style="height: 150px; background-color: var(--r-background-2)"
    >
      <r-sticky :container="container">
        <r-button type="warning" style="margin-left: 215px">
          {{ t('setContainer') }}
        </r-button>
      </r-sticky>
    </div>
  </demo-block>

  <demo-block :title="t('offsetBottom')">
    <div style="height: 200px"></div>
    <r-sticky :offset-bottom="50" position="bottom">
      <r-button type="primary" style="margin-left: 15px">
        {{ t('offsetBottom') }}
      </r-button>
    </r-sticky>
  </demo-block>
</template>

<style lang="less">
.demo-sticky {
  height: 200vh;

  .r-button {
    margin-left: var(--r-padding-md);
  }
}
</style>
