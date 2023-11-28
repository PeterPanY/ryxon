<template>
  <r-mention
    v-model:text="text"
    :loading="loading"
    :options="options"
    placeholder="请输入"
    @search="handleSearch"
  >
  </r-mention>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([])

const text = ref('')
const loading = ref(false)

let searchTimerId: number | null = null
const handleSearch = (value: string) => {
  if (searchTimerId !== null) clearTimeout(searchTimerId)

  loading.value = true
  searchTimerId = window.setTimeout(() => {
    options.value = [
      '它烫不了你的舌',
      '也烧不了你的口',
      '喝醉吧',
      '不要回头'
    ].map((v) => ({
      label: value + v,
      value: value + v
    }))
    loading.value = false
  }, 1500)
}
</script>
