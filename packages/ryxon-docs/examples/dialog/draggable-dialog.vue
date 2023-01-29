<template>
  <r-button type="text" @click="dialogVisible = true"
    >Click to open Dialog
  </r-button>

  <r-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <r-button @click="dialogVisible = false">Cancel</r-button>
        <r-button type="primary" @click="dialogVisible = false"
          >Confirm</r-button
        >
      </span>
    </template> 
  </r-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
