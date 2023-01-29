<script setup lang="ts">
import REmpty from '..';
import RTabs from '../../tabs';
import RTab from '../../tab';
import RButton from '../../button';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    error: '通用错误',
    search: '搜索提示',
    network: '网络错误',
    imageType: '图片类型',
    customSize: '自定义大小',
    description: '描述文字',
    customImage: '自定义图片',
    bottomContent: '底部内容',
  },
  'en-US': {
    error: 'Error',
    search: 'Search',
    network: 'Network',
    imageType: 'Image Type',
    customSize: 'Custom Size',
    description: 'Description',
    customImage: 'Custom Image',
    bottomContent: 'Bottom Content',
  },
});

const active = ref('error');
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-empty :description="t('description')" />
  </demo-block>

  <demo-block :title="t('imageType')">
    <r-tabs v-model:active="active">
      <r-tab name="error" :title="t('error')">
        <r-empty image="error" :description="t('description')" />
      </r-tab>
      <r-tab name="network" :title="t('network')">
        <r-empty image="network" :description="t('description')" />
      </r-tab>
      <r-tab name="search" :title="t('search')">
        <r-empty image="search" :description="t('description')" />
      </r-tab>
    </r-tabs>
  </demo-block>

  <demo-block :title="t('customSize')">
    <r-empty image-size="100" :description="t('description')" />
  </demo-block>

  <demo-block :title="t('customImage')">
    <r-empty
      :image="cdnURL('custom-empty-image.png')"
      :image-size="80"
      :description="t('description')"
    />
  </demo-block>

  <demo-block :title="t('bottomContent')">
    <r-empty :description="t('description')">
      <r-button round type="primary" class="bottom-button">
        {{ t('button') }}
      </r-button>
    </r-empty>
  </demo-block>
</template>

<style lang="less">
.demo-empty {
  background: var(--r-background-2);

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
