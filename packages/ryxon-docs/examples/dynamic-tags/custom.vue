<template>
  <r-dynamic-tags
    ref="dynamicTagesRef"
    v-model="tags"
    :max="3"
    :create="onCreate"
  >
    <template #input>
      <r-autocomplete
        ref="autoCompleteInstRef"
        v-model="inputValueRef"
        :fetch-suggestions="querySearch"
        placeholder="Please Input"
        @select="handleSelect"
        @blur="handleBlur"
      />
    </template>
    <template #trigger="{ disabled }">
      <r-button :icon="Plus" :disabled="disabled" @click.stop="handleAdd"
        >添加</r-button
      >
    </template>
  </r-dynamic-tags>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { type DynamicTagsExpose } from '@ryxon/components'
import { Plus } from '@ryxon/icons'

const tags = ref([
  { label: 'vue', value: 'https://github.com/vuejs/vue' },
  { label: 'vuex', value: 'https://github.com/vuejs/vuex' }
])

const onCreate = (label: string) => {
  return { label, value: 'v' + label }
}

const inputValueRef = ref('')
const dynamicTagesRef = ref<DynamicTagsExpose | null>(null)
const autoCompleteInstRef = ref<HTMLElement>()
const handleAdd = () => {
  dynamicTagesRef.value?.activate()

  void nextTick(() => {
    autoCompleteInstRef.value?.focus()
  })
}

const restaurants = ref([
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' }
])

interface RestaurantItem {
  value: string
  link: string
}
const createFilter = (queryString: string) => (restaurant: RestaurantItem) =>
  restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}

const handleSelect = (row: RestaurantItem) => {
  inputValueRef.value = ''
  dynamicTagesRef.value?.submit(row.value)
}

const handleBlur = () => {
  dynamicTagesRef.value?.deactivate()
}
</script>
