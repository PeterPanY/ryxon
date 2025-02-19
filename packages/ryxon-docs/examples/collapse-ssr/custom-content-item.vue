<template>
  <div class="demo-collapse">
    <r-collapse-ssr v-model="activeNames" :items="items" @change="handleChange">
      <template #a-content="{ item }">
        {{ item }} <r-icon> <info-filled /> </r-icon>
      </template>
      <template #b-content="{ item }">
        {{ item }} <r-icon> <info-filled /> </r-icon>
      </template>
      <template #c-content="{ item }">
        {{ item }} <r-icon> <info-filled /> </r-icon>
      </template>
    </r-collapse-ssr>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InfoFilled } from '@ryxon/icons'

const items = [
  {
    title: '标题1',
    name: 'a',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题2',
    name: 'b',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  },
  {
    title: '标题3',
    name: 'c',
    content: '代码是写出来给人看的，附带能在机器上运行。'
  }
]

const activeNames = ref(['a'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>
