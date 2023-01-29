<template>
  <r-button @click="visible = true">
    Open Dialog with customized header
  </r-button>
  <r-dialog v-model="visible" :show-close="false">
    <template #header="{ close }">
      <div class="my-header">
        <h4>This is a custom header!</h4>
        <r-button type="danger" @click="close">
          <r-icon class="r-icon--left" name="circle-close-filled"></r-icon>
          Close
        </r-button>
      </div>
    </template>
    This is dialog content.
  </r-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>