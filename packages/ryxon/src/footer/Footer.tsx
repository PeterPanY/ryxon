import { computed, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('footer')

export const footerProps = {
  height: { type: String, default: null }
}

export type FooterProps = ExtractPropTypes<typeof footerProps>

export default defineComponent({
  name,

  props: footerProps,

  setup(props, { slots }) {
    const style = computed(() => (props.height ? { height: props.height } : {}))

    return () => (
      <footer class={bem()} style={style.value}>
        {slots.default?.()}
      </footer>
    )
  }
})
