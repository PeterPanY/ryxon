<template>
  <r-pagination
    v-model="currentPage"
    v-model:items-per-page="itemsPerPage"
    :total-items="125"
    :show-page-size="3"
    force-ellipses
    layout="sizes, prev, pager, next, total, jumper"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
const itemsPerPage = ref(10)

const handleChange = () => {
  console.log(currentPage.value)
}
</script>
