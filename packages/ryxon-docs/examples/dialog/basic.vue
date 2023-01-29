<template>
  <r-button text @click="handleClick">
    click to open the Dialog
  </r-button>

  <r-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <r-button @click="dialogVisible = false">Cancel</r-button>
        <r-button type="primary" @click="dialogVisible = false">
          Confirm
        </r-button>
      </span>
    </template>
  </r-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const handleClick = () => {
  dialogVisible.value = true
}

const handleClose = (done: () => void) => {
  // dialogVisible.value = false
  done()
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>