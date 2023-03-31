<template>
  <r-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(30 * 60 * 60 * 1000)
</script>
