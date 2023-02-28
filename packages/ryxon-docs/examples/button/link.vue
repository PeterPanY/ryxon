<template>
  <p>Basic link button</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <r-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      :url="button.url"
      :to="button.to"
      link
      >{{ button.text }}</r-button
    >
  </div>

  <p>Disabled link button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <r-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      link
      disabled
      >{{ button.text }}</r-button
    >
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain', url: 'https://www.baidu.com/' },
  { type: 'primary', text: 'primary', url: 'https://www.baidu.com/' },
  { type: 'success', text: 'success', url: 'https://www.baidu.com/' },
  { type: 'info', text: 'info', url: 'https://www.baidu.com/' },
  { type: 'warning', text: 'warning', url: 'https://www.baidu.com/' },
  { type: 'danger', text: 'danger', url: 'https://www.baidu.com/' }
] as const
</script>
