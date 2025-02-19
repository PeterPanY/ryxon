<template>
  <div class="demo-collapse">
    <r-collapse-ssr v-model="activeNames" :items="items" ref="collapse" />

    <r-button type="primary" @click="openAll">全部展开</r-button>
    <r-button type="primary" @click="toggleAll">全部切换</r-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  {
    title: '标题1',
    name: '1',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题2',
    name: '2',
    disabled: true,
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题3',
    name: '3',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题4',
    name: '4',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题5',
    name: '5',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题6',
    name: '6',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  }
]

const activeNames = ref(['1'])
const collapse = ref(null)

const openAll = () => {
  collapse.value.toggleAll(true)
}
const toggleAll = () => {
  collapse.value.toggleAll()
}
</script>
