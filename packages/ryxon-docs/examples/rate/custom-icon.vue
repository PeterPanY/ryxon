<template>
  <r-rate
    v-model="value"
    :icons="icons"
    :void-icon="ChatRound"
    :colors="['#409eff', '#67c23a', '#FF9900']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChatDotRound, ChatLineRound, ChatRound } from '@ryxon/icons'

const value = ref()
const icons = [ChatRound, ChatLineRound, ChatDotRound]
</script>
