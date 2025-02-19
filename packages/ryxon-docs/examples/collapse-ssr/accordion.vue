<template>
  <div class="demo-collapse">
    <r-collapse-ssr
      v-model="activeNames"
      :items="items"
      accordion
      @change="handleChange"
    />
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

const activeNames = ref('1')
const handleChange = (val: string) => {
  console.log(val)
}
</script>
