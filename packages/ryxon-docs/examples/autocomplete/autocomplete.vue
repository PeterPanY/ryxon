<template>
  <r-row class="demo-autocomplete">
    <r-col :span="12">
      <div>list suggestions when activated</div>
      <r-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        placeholder="Please Input"
        @select="handleSelect"
      />
    </r-col>
    <r-col :span="12">
      <div>list suggestions on input</div>
      <r-autocomplete
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        placeholder="Please Input"
        @select="handleSelect"
      />
    </r-col>
  </r-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface RestaurantItem {
  value: string
  link: string
}

const state1 = ref('')
const state2 = ref('')

const createFilter = (queryString: string) => (restaurant: RestaurantItem) =>
  restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const loadAll = () => [
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' }
]

const handleSelect = (item: RestaurantItem) => {
  console.log(item)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>
