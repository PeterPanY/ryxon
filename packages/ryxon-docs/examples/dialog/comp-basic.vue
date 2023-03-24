<template>
  <r-button text @click="show = true"> Show dialog </r-button>

  <r-dialog v-model:show="show" title="标题" show-cancel-button>
    This is a message
  </r-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
