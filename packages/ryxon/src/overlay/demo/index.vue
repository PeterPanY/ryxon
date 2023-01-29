<script setup lang="ts">
import RButton from '../../button';
import ROverlay from '..';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    showOverlay: '显示遮罩层',
    embeddedContent: '嵌入内容',
  },
  'en-US': {
    showOverlay: 'Show Overlay',
    embeddedContent: 'Embedded Content',
  },
});

const show = ref(false);
const showEmbedded = ref(false);
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-button
      type="primary"
      :text="t('showOverlay')"
      style="margin-left: 16px"
      @click="show = true"
    />
    <r-overlay :show="show" @click="show = false" />
  </demo-block>

  <demo-block :title="t('embeddedContent')">
    <r-button
      type="primary"
      :text="t('embeddedContent')"
      style="margin-left: 16px"
      @click="showEmbedded = true"
    />
    <r-overlay :show="showEmbedded" @click="showEmbedded = false">
      <div class="wrapper">
        <div class="block" />
      </div>
    </r-overlay>
  </demo-block>
</template>

<style lang="less">
.demo-overlay {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: var(--r-background-2);
    border-radius: 4px;
  }
}
</style>
