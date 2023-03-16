<template>
  <r-tabs v-model:active="active" swipeable>
    <r-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
      内容 {{ index }}
    </r-tab>
  </r-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
