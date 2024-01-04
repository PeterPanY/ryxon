<template>
  <r-dynamic-tags id="el" v-model="tags" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'

const tags = ref(['动动', '态态'])

useSortable('#el .r-dynamic-tags__body', tags, {
  animation: 150
})
</script>
