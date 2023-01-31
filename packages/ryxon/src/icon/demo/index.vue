<script setup lang="ts">
import RIcon from '..';
import RTabs from '../../tabs';
import RTab from '../../tab';
import RRow from '../../row';
import RCol from '../../col';
// import * as Icons from '@ryxon/icons';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';
import { showNotify } from '../../notify';

// from https://30secondsofcode.org
function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selection = document.getSelection();

  if (!selection) {
    return;
  }

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
}

const t = useTranslate({
  'zh-CN': {
    title: '图标列表',
    badge: '徽标提示',
    basic: '基础图标',
    copied: '复制成功',
    outline: '线框风格',
    filled: '实底风格',
    demo: '用法示例',
    color: '图标颜色',
    size: '图标大小',
  },
  'en-US': {
    title: 'Icon List',
    badge: 'Show Badge',
    basic: 'Basic',
    copied: 'Copied',
    outline: 'Outline',
    filled: 'Filled',
    demo: 'Demo',
    color: 'Icon Color',
    size: 'Icon Size',
  },
});

const tab = ref(0);
const demoIcon = 'chat-o';
const demoImage = cdnURL('icon-demo.png');

const copy = (icon: string, option: Record<string, unknown> = {}) => {
  let tag = `<r-icon name="${icon}"`;
  if ('dot' in option) {
    tag = `${tag} ${option.dot ? 'dot' : ''}`;
  }
  if ('badge' in option) {
    tag = `${tag} badge="${option.badge}"`;
  }
  if ('color' in option) {
    tag = `${tag} color="${option.color}"`;
  }
  if ('size' in option) {
    tag = `${tag} size="${option.size}"`;
  }
  tag = `${tag} />`;
  copyToClipboard(tag);

  showNotify({
    type: 'success',
    duration: 1500,
    className: 'demo-icon-notify',
    message: `${t('copied')}：${tag}`,
  });
};
</script>

<template>
  <r-tabs v-model:active="tab" sticky>
    <r-tab class="demo-icon-tab-panel" :title="t('demo')">
      <demo-block :title="t('basicUsage')">
        <r-row>
          <r-col span="6" @click="copy(demoIcon)">
            <r-icon :name="demoIcon" />
          </r-col>
        </r-row>
      </demo-block>

      <demo-block :title="t('usingUrl')">
        <r-row>
          <r-col span="6" @click="copy(demoImage)">
            <r-icon :name="demoImage" />
          </r-col>
        </r-row>
      </demo-block>

      <demo-block :title="t('badge')">
        <r-row>
          <r-col span="6" @click="copy(demoIcon, { dot: true })">
            <r-icon :name="demoIcon" dot />
          </r-col>
          <r-col span="6" @click="copy(demoIcon, { badge: '9' })">
            <r-icon :name="demoIcon" badge="9" />
          </r-col>
          <r-col span="6" @click="copy(demoIcon, { badge: '99+' })">
            <r-icon :name="demoIcon" badge="99+" />
          </r-col>
        </r-row>
      </demo-block>

      <demo-block :title="t('color')">
        <r-row>
          <r-col span="6" @click="copy('cart-o', { color: '#1989fa' })">
            <r-icon name="cart-o" color="#1989fa" />
          </r-col>
          <r-col span="6" @click="copy('fire-o', { color: '#ee0a24' })">
            <r-icon name="fire-o" color="#ee0a24" />
          </r-col>
        </r-row>
      </demo-block>

      <demo-block :title="t('size')">
        <r-row>
          <r-col span="6" @click="copy(demoIcon, { size: '40' })">
            <r-icon :name="demoIcon" size="40" />
          </r-col>
          <r-col span="6" @click="copy(demoIcon, { size: '3rem' })">
            <r-icon :name="demoIcon" size="3rem" />
          </r-col>
        </r-row>
      </demo-block>
    </r-tab>

    <!-- <r-tab class="demo-icon-tab-panel" :title="t('basic')">
      <r-row>
        <r-col
          v-for="icon in Icons.basic"
          :key="icon"
          span="6"
          @click="copy(icon)"
        >
          <r-icon :name="icon" />
          <span>{{ icon }}</span>
        </r-col>
      </r-row>
    </r-tab> -->

    <!-- <r-tab class="demo-icon-tab-panel" :title="t('outline')">
      <r-row>
        <r-col
          v-for="icon in icons.outline"
          :key="icon"
          span="6"
          @click="copy(icon)"
        >
          <r-icon :name="icon" />
          <span>{{ icon }}</span>
        </r-col>
      </r-row>
    </r-tab> -->

    <!-- <r-tab class="demo-icon-tab-panel" :title="t('filled')">
      <r-row>
        <r-col
          v-for="icon in icons.filled"
          :key="icon"
          span="6"
          @click="copy(icon)"
        >
          <r-icon :name="icon" />
          <span>{{ icon }}</span>
        </r-col>
      </r-row>
    </r-tab> -->
  </r-tabs>
</template>

<style lang="less">
.demo-icon {
  font-size: 0;

  &-notify {
    font-size: 13px;
  }

  &-tab-panel {
    width: auto;
    margin: 20px;
    background-color: var(--r-background-2);
    border-radius: 12px;
  }

  .r-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: var(--r-text-color);
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: var(--r-active-color);
    }
  }

  .r-icon {
    margin: 16px 0 16px;
    color: var(--r-text-color);
    font-size: 32px;
  }
}
</style>
