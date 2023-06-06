import {
  computed,
  defineComponent,
  type VNode,
  type Component,
  type ExtractPropTypes
} from 'vue'

// Utils
import { createNamespace } from '../utils'

const [name, bem, , isBem] = createNamespace('container')

export const containerProps = {
  direction: { type: String }
}

export type ContainerProps = ExtractPropTypes<typeof containerProps>

export default defineComponent({
  name,

  props: containerProps,

  setup(props, { slots }) {
    const isVertical = computed(() => {
      if (props.direction === 'vertical') {
        return true
      }
      if (props.direction === 'horizontal') {
        return false
      }
      if (slots && slots.default) {
        const vNodes: VNode[] = slots.default()
        return vNodes.some((vNode) => {
          const tag = (vNode.type as Component).name
          return tag === 'r-header' || tag === 'r-footer'
        })
      }
      return false
    })
    return () => (
      <section class={[bem(), isBem('vertical', isVertical.value)]}>
        {slots.default?.()}
      </section>
    )
  }
})
