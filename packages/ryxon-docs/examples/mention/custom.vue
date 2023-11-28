<template>
  <r-mention v-model:text="text" :options="options" placeholder="请输入">
    <template #item="{ row: { src, label }, index }">
      <div class="mention-item">
        <r-avatar :src="src" :size="22" />
        <span>{{ label + index }}</span>
      </div>
    </template>
    <div>bbbbb</div>
  </r-mention>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    label: '07akioni',
    value: '07akioni',
    src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    label: 'star-kirby',
    value: 'star-kirby',
    src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    label: '广东路',
    value: '广东路',
    src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
]

const text = ref('')
</script>

<style scoped lang="scss">
.mention-item {
  display: flex;
  align-items: center;

  :deep(.r-avatar) {
    margin-right: 5px;
  }
}
</style>
