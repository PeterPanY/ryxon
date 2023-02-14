import { ref, inject, computed, onMounted, defineComponent } from 'vue'

import { createNamespace } from '../utils'
import { useResizeObserver } from '@vueuse/core'
import { selectKey } from './token'

const [, bem] = createNamespace('select-dropdown')

export default defineComponent({
  name: 'RSelectDropdown',
  setup(_, { slots }) {
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

    return () => (
      <div
        class={[
          bem(),
          isMultiple.value ? 'is-multiple' : '',
          popperClass.value
        ]}
        style={{
          [isFitInputWidth.value ? 'width' : 'minWidth']: minWidth.value
        }}
      >
        {slots.default?.()}
      </div>
    )
  }
})
