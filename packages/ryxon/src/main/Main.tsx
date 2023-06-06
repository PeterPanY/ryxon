import { defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('main')

export const mainProps = {}

export type MainProps = ExtractPropTypes<typeof mainProps>

export default defineComponent({
  name,

  props: mainProps,

  setup(props, { slots }) {
    return () => <main class={bem()}> {slots.default?.()}</main>
  }
})
