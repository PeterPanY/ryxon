<template>
  <div class="demo-collapse">
    <r-collapse v-model="activeNames" ref="collapse">
      <r-collapse-item title="标题1" name="1">
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse>

    <r-button type="primary" @click="openAll">全部展开</r-button>
    <r-button type="primary" @click="toggleAll">全部切换</r-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const collapse = ref(null)

const openAll = () => {
  collapse.value.toggleAll(true)
}
const toggleAll = () => {
  collapse.value.toggleAll()
}
</script>
