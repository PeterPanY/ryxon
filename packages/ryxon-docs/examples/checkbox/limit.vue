<template>
  <div>最少一个，最多两个</div>
  <r-checkbox-group v-model="checked" :min="1" :max="2">
    <r-checkbox name="a">复选框 a</r-checkbox>
    <r-checkbox name="b">复选框 b</r-checkbox>
    <r-checkbox name="c">复选框 c</r-checkbox>
  </r-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(['a'])
</script>
