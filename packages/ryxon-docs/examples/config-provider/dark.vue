<template>
  <div :style="{ background: darkMode ? 'black' : '' }">
    <r-config-provider :theme="theme">
      <r-cell title="模式">
        <template #right-icon>
          <r-button size="small" @click="toggle">切换</r-button>
        </template>
      </r-cell>
    </r-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const darkMode = ref(false)

const theme = computed(() => (darkMode.value ? 'dark' : 'light'))

const toggle = () => {
  darkMode.value = !darkMode.value
}
</script>
