<script setup lang="ts">
import RSkeleton, {
  SkeletonImage as RSkeletonImage,
  SkeletonParagraph as RSkeletonParagraph,
} from '..';
import RSwitch from '../../switch';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    showAvatar: '显示头像',
    showChildren: '显示子组件',
    title: '关于 Ryxon',
    desc: 'Ryxon 是一套轻量、可靠的移动端 Vue 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。',
    customContent: '自定义展示内容',
  },
  'en-US': {
    showAvatar: 'Show Avatar',
    showChildren: 'Show Children',
    title: 'About Ryxon',
    desc: 'Ryxon is a set of Mobile UI Components built on Vue.',
    customContent: 'Custom Content',
  },
});

const show = ref(false);
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-skeleton title :row="3" />
  </demo-block>

  <demo-block :title="t('showAvatar')">
    <r-skeleton title avatar :row="3" />
  </demo-block>

  <demo-block :title="t('showChildren')">
    <r-switch v-model="show" />
    <r-skeleton title avatar :row="3" :loading="!show">
      <div class="demo-preview">
        <img :src="cdnURL('logo.png')" />
        <div class="demo-content">
          <h3>{{ t('title') }}</h3>
          <p>{{ t('desc') }}</p>
        </div>
      </div>
    </r-skeleton>
  </demo-block>

  <demo-block :title="t('customContent')">
    <r-skeleton>
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <r-skeleton-image />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <r-skeleton-paragraph row-width="60%" />
            <r-skeleton-paragraph />
            <r-skeleton-paragraph />
            <r-skeleton-paragraph />
          </div>
        </div>
      </template>
    </r-skeleton>
  </demo-block>
</template>

<style lang="less">
.demo-skeleton {
  background-color: var(--r-background-2);

  .r-switch {
    margin: 0 var(--r-padding-md) var(--r-padding-xs);
  }

  .demo-preview {
    display: flex;
    padding: 0 var(--r-padding-md);

    .demo-content {
      padding-top: 6px;

      h3 {
        margin: 0;
        font-size: 18px;
        line-height: 20px;
      }

      p {
        margin: 13px 0 0;
        font-size: 14px;
        line-height: 20px;
      }
    }

    img {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      margin-right: var(--r-padding-md);
    }
  }
}
</style>
