import { computed, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('aside')

export const asideProps = {
  width: { type: String, default: null }
}

export type AsideProps = ExtractPropTypes<typeof asideProps>

export default defineComponent({
  name,

  props: asideProps,

  setup(props, { slots }) {
    const style = computed(() => (props.width ? { width: props.width } : {}))

    return () => (
      <aside class={bem()} style={style.value}>
        {slots.default?.()}
      </aside>
    )
  }
})
