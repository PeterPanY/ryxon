<script setup lang="ts">
import RRow from '../../row';
import RImage from '..';
import RCol from '../../col';
import RLoading from '../../loading';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    fitMode: '填充模式',
    position: '图片位置',
    round: '圆形图片',
    loading: '加载中提示',
    error: '加载失败提示',
    defaultTip: '默认提示',
    customTip: '自定义提示',
    loadFail: '加载失败',
  },
  'en-US': {
    fitMode: 'Fit Mode',
    position: 'Position',
    round: 'Round',
    loading: 'Loading',
    error: 'Error',
    defaultTip: 'Default Tip',
    customTip: 'Custom Tip',
    loadFail: 'Load failed',
  },
});

const image = cdnURL('cat.jpeg');
const fits = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const;
const positions1 = ['left', 'center', 'right'] as const;
const positions2 = ['top', 'center', 'bottom'] as const;
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-row>
      <r-image width="100" height="100" :src="image" />
    </r-row>
  </demo-block>

  <demo-block :title="t('fitMode')">
    <r-row gutter="20">
      <r-col v-for="fit in fits" span="8" :key="fit">
        <r-image :fit="fit" width="100%" height="27vw" :src="image" />
        <div class="text">{{ fit }}</div>
      </r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('position')">
    <r-row gutter="20">
      <r-col v-for="pos in positions1" span="8" :key="pos">
        <r-image
          :position="pos"
          width="100%"
          height="27vw"
          fit="cover"
          :src="image"
        />
        <div class="text">cover</div>
        <div class="text">{{ pos }}</div>
      </r-col>
      <r-col v-for="pos in positions2" span="8" :key="pos">
        <r-image
          :position="pos"
          width="100%"
          height="27vw"
          fit="contain"
          :src="image"
        />
        <div class="text">contain</div>
        <div class="text">{{ pos }}</div>
      </r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('round')">
    <r-row gutter="20">
      <r-col v-for="fit in fits" span="8" :key="fit">
        <r-image round :fit="fit" width="100%" height="27vw" :src="image" />
        <div class="text">{{ fit }}</div>
      </r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('loading')">
    <r-row gutter="20">
      <r-col span="8">
        <r-image width="100%" height="27vw" />
        <div class="text">{{ t('defaultTip') }}</div>
      </r-col>

      <r-col span="8">
        <r-image width="100%" height="27vw">
          <template #loading>
            <r-loading type="spinner" size="20" />
          </template>
        </r-image>
        <div class="text">{{ t('customTip') }}</div>
      </r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('error')">
    <r-row gutter="20">
      <r-col span="8">
        <r-image width="100%" height="27vw" src="http://x" />
        <div class="text">{{ t('defaultTip') }}</div>
      </r-col>

      <r-col span="8">
        <r-image width="100%" height="27vw" src="http://x">
          <template #error>{{ t('loadFail') }}</template>
        </r-image>
        <div class="text">{{ t('customTip') }}</div>
      </r-col>
    </r-row>
  </demo-block>
</template>

<style lang="less">
.demo-image {
  overflow-x: hidden;
  background-color: var(--r-background-2);

  .r-row {
    padding: 0 var(--r-padding-md);
  }

  .r-col {
    margin-bottom: 20px;
  }

  .text {
    margin-top: 5px;
    color: var(--r-gray-7);
    font-size: 14px;
    text-align: center;
  }
}
</style>
