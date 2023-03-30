import type { Ref } from 'vue'

export const useFocus = (
  el: Ref<{
    focus: () => void
  } | null>
) => ({
  focus: () => {
    el.value?.focus?.()
  }
})
