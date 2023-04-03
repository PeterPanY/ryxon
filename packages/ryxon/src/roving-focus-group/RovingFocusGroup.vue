<template>
  <r-focus-group-collection>
    <r-roving-focus-group-impl v-bind="$attrs">
      <slot />
    </r-roving-focus-group-impl>
  </r-focus-group-collection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RRovingFocusGroupImpl from './rovingFocusGroupImpl.vue'
import { RCollection as RFocusGroupCollection } from './types'

export default defineComponent({
  name: 'RRovingFocusGroup',
  components: {
    RFocusGroupCollection,
    RRovingFocusGroupImpl
  }
})
</script>
