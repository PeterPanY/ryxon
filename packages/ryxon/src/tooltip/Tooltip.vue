<template>
  <slot v-if="$slots.default" />
  <popup v-model:show="open" :overlay="false"> 内容</popup>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Popup } from '../popup'

const COMPONENT_NAME = 'RTooltip'
export default defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    Popup
  },
  setup() {
    const open = ref(true)

    return { open }
  }
})
</script>
