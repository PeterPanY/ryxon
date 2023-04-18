<template>
  <div class="demo-collapse">
    <r-collapse v-model="activeNames">
      <r-collapse-item title="标题1" name="1">
        <template #title>
          <div>
            标题1 <r-icon> <info-filled /> </r-icon>
          </div>
        </template>
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InfoFilled } from '@ryxon/icons'

const activeNames = ref(['1'])
</script>
