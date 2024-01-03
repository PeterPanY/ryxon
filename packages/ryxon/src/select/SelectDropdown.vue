<template>
  <div
    :class="[bem('dropdown'), isBem('multiple', isMultiple), popperClass]"
    :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, inject, computed, onMounted, defineComponent } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { createNamespace } from '../utils'
import { selectKey } from './token'

const [, bem, , isBem] = createNamespace('select-dropdown')

export default defineComponent({
  name: 'RSelectDropdown',
  componentName: 'RSelectDropdown',
  setup() {
    const select = inject(selectKey)!

    const popperClass = computed(() => select.props.popperClass)
    const isMultiple = computed(() => select.props.multiple)
    const isFitInputWidth = computed(() => select.props.fitInputWidth)
    const minWidth = ref('')

    function updateMinWidth() {
      minWidth.value = `${select.selectWrapper?.offsetWidth}px`
    }

    onMounted(() => {
      // TODO: updatePopper
      // popper.value.update()
      updateMinWidth()
      useResizeObserver(select.selectWrapper, updateMinWidth)
    })

    return {
      bem,
      isBem,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    }
  }
})
</script>
