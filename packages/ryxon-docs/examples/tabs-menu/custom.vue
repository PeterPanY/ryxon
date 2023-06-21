<template>
  <r-tabs-menu @select="handleSelect">
    <r-tabs-menu-item title="标签1"> </r-tabs-menu-item>
    <r-tabs-menu-item v-model="value" title="标签2" :options="options" />
    <r-tabs-menu-item title="筛选" ref="itemRef">
      <r-cell center title="包邮">
        <template #right-icon>
          <r-switch v-model="switch1" />
        </template>
      </r-cell>
      <r-cell center title="团购">
        <template #right-icon>
          <r-switch v-model="switch2" />
        </template>
      </r-cell>
      <div style="padding: 5px 16px">
        <r-button type="primary" block round @click="onConfirm">
          确认
        </r-button>
      </div>
    </r-tabs-menu-item>
  </r-tabs-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// const menuRef = ref(null)
const itemRef = ref(null)
const value = ref(0)
const switch1 = ref(false)
const switch2 = ref(false)
const options = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
const onConfirm = () => {
  itemRef.value.toggle()
  // 或者
  // menuRef.value.close();
}

const handleSelect = (index: number) => {
  console.log(index)
}
</script>

<style scoped></style>
