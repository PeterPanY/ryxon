import { computed, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('header')

export const headerProps = {
  height: { type: String, default: null }
}

export type HeaderProps = ExtractPropTypes<typeof headerProps>

export default defineComponent({
  name,

  props: headerProps,

  setup(props, { slots }) {
    const style = computed(() => (props.height ? { height: props.height } : {}))

    return () => (
      <header class={bem()} style={style.value}>
        {slots.default?.()}
      </header>
    )
  }
})
