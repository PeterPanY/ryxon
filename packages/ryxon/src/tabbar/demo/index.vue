<script setup lang="ts">
import RTabbar from '..';
import RTabbarItem from '../../tabbar-item';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';
import { showToast } from '../../toast';

const t = useTranslate({
  'zh-CN': {
    badge: '徽标提示',
    customIcon: '自定义图标',
    customColor: '自定义颜色',
    matchByName: '通过名称匹配',
    switchEvent: '监听切换事件',
  },
  'en-US': {
    badge: 'Show Badge',
    customIcon: 'Custom Icon',
    customColor: 'Custom Color',
    matchByName: 'Match by name',
    switchEvent: 'Change Event',
  },
});

const active = ref(0);
const active2 = ref(0);
const active3 = ref(0);
const active4 = ref(0);
const active5 = ref(0);
const activeName = ref('home');

const icon = {
  active: cdnURL('user-active.png'),
  inactive: cdnURL('user-inactive.png'),
};

const onChange = (index: number) => {
  showToast(`${t('tab')} ${index + 1}`);
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-tabbar v-model="active">
      <r-tabbar-item icon="home-o">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="search">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="friends-o">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="setting-o">{{ t('tab') }}</r-tabbar-item>
    </r-tabbar>
  </demo-block>

  <demo-block :title="t('matchByName')">
    <r-tabbar v-model="activeName">
      <r-tabbar-item name="home" icon="home-o">
        {{ t('tab') }}
      </r-tabbar-item>
      <r-tabbar-item name="search" icon="search">
        {{ t('tab') }}
      </r-tabbar-item>
      <r-tabbar-item name="friends" icon="friends-o">
        {{ t('tab') }}
      </r-tabbar-item>
      <r-tabbar-item name="setting" icon="setting-o">
        {{ t('tab') }}
      </r-tabbar-item>
    </r-tabbar>
  </demo-block>

  <demo-block :title="t('badge')">
    <r-tabbar v-model="active2">
      <r-tabbar-item icon="home-o">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="search" dot>{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="friends-o" badge="5">
        {{ t('tab') }}
      </r-tabbar-item>
      <r-tabbar-item icon="setting-o" badge="20">
        {{ t('tab') }}
      </r-tabbar-item>
    </r-tabbar>
  </demo-block>

  <demo-block :title="t('customIcon')">
    <r-tabbar v-model="active3">
      <r-tabbar-item badge="3">
        <span>{{ t('custom') }}</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </r-tabbar-item>
      <r-tabbar-item icon="search">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="setting-o">{{ t('tab') }}</r-tabbar-item>
    </r-tabbar>
  </demo-block>

  <demo-block :title="t('customColor')">
    <r-tabbar v-model="active4" active-color="#ee0a24">
      <r-tabbar-item icon="home-o">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="search">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="friends-o">{{ t('tab') }}</r-tabbar-item>
      <r-tabbar-item icon="setting-o">{{ t('tab') }}</r-tabbar-item>
    </r-tabbar>
  </demo-block>

  <demo-block :title="t('switchEvent')">
    <r-tabbar v-model="active5" @change="onChange">
      <r-tabbar-item icon="home-o">{{ `${t('tab')} 1` }}</r-tabbar-item>
      <r-tabbar-item icon="search">{{ `${t('tab')} 2` }}</r-tabbar-item>
      <r-tabbar-item icon="friends-o">{{ `${t('tab')} 3` }}</r-tabbar-item>
      <r-tabbar-item icon="setting-o">{{ `${t('tab')} 4` }}</r-tabbar-item>
    </r-tabbar>
  </demo-block>
</template>

<style lang="less">
.demo-tabbar {
  .r-tabbar {
    position: relative;
    padding-bottom: 0;
  }
}
</style>
