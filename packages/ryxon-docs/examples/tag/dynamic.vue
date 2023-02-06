<template>
  <r-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closeable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </r-tag>
  <r-field
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  ></r-field>
  <r-button v-else class="button-new-tag ml-1" size="mini" @click="showInput">
    + New Tag
  </r-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()

const showInput = () => {
  inputVisible.value = true
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
</script>
