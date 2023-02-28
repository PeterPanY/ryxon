<template>
  <r-checkbox-group v-model="checked">
    <r-checkbox name="a">复选框 a</r-checkbox>
    <r-checkbox name="b">复选框 b</r-checkbox>
    <r-checkbox name="c" disabled>复选框 c</r-checkbox>
  </r-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(['a', 'b', 'c'])
</script>
