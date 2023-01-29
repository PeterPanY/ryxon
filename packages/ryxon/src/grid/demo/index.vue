<script setup lang="ts">
import RGrid from '..';
import RGridItem from '../../grid-item';
import RImage from '../../image';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文字',
    route: '页面导航',
    gutter: '格子间距',
    square: '正方形格子',
    columnNum: '自定义列数',
    customContent: '自定义内容',
    urlRoute: 'URL 跳转',
    vueRoute: '路由跳转',
    showBadge: '徽标提示',
    horizontal: '内容横排',
  },
  'en-US': {
    text: 'Text',
    route: 'Route',
    gutter: 'Gutter',
    square: 'Square',
    columnNum: 'Column Num',
    customContent: 'Custom Content',
    urlRoute: 'URL',
    vueRoute: 'Vue Router',
    showBadge: 'Show Badge',
    horizontal: 'Horizontal',
  },
});
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-grid>
      <r-grid-item v-for="i in 4" :key="i" icon="photo-o" :text="t('text')" />
    </r-grid>
  </demo-block>

  <demo-block :title="t('columnNum')">
    <r-grid :column-num="3">
      <r-grid-item v-for="i in 6" :key="i" icon="photo-o" :text="t('text')" />
    </r-grid>
  </demo-block>

  <demo-block :title="t('customContent')">
    <r-grid :border="false" :column-num="3">
      <r-grid-item>
        <r-image fit="contain" :src="cdnURL('apple-1.jpeg')" />
      </r-grid-item>
      <r-grid-item>
        <r-image fit="contain" :src="cdnURL('apple-2.jpeg')" />
      </r-grid-item>
      <r-grid-item>
        <r-image fit="contain" :src="cdnURL('apple-3.jpeg')" />
      </r-grid-item>
    </r-grid>
  </demo-block>

  <demo-block :title="t('square')">
    <r-grid square>
      <r-grid-item v-for="i in 8" :key="i" icon="photo-o" :text="t('text')" />
    </r-grid>
  </demo-block>

  <demo-block :title="t('gutter')">
    <r-grid :gutter="10">
      <r-grid-item v-for="i in 8" :key="i" icon="photo-o" :text="t('text')" />
    </r-grid>
  </demo-block>

  <demo-block :title="t('horizontal')">
    <r-grid direction="horizontal" :column-num="3">
      <r-grid-item icon="photo-o" :text="t('text')" />
      <r-grid-item icon="photo-o" :text="t('text')" />
      <r-grid-item icon="photo-o" :text="t('text')" />
    </r-grid>
  </demo-block>

  <demo-block :title="t('route')">
    <r-grid clickable :column-num="2">
      <r-grid-item icon="home-o" :text="t('vueRoute')" to="/" />
      <r-grid-item
        icon="search"
        :text="t('urlRoute')"
        url="https://github.com/PeterPanY/ryxon"
      />
    </r-grid>
  </demo-block>

  <demo-block :title="t('showBadge')">
    <r-grid :column-num="2">
      <r-grid-item icon="home-o" :text="t('text')" dot />
      <r-grid-item icon="search" :text="t('text')" badge="99+" />
    </r-grid>
  </demo-block>
</template>
