<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <r-date-picker-pc v-model="value1" type="date" placeholder="Pick a day" />
    </div>

    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <r-date-picker-pc
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

const disabledDate = (time: Date) => time.getTime() > Date.now()
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--r-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--r-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
