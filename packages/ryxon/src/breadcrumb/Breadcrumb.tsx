import {
  ref,
  provide,
  onMounted,
  defineComponent,
  type InjectionKey,
  type ExtractPropTypes
} from 'vue'
import { iconPropType, createNamespace } from '../utils'

const [, bem] = createNamespace('breadcrumb')
const [, bemItem] = createNamespace('breadcrumb-item')

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/'
  },
  separatorIcon: {
    type: iconPropType
  }
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export const breadcrumbKey: InjectionKey<BreadcrumbProps> =
  Symbol('breadcrumbKey')

export default defineComponent({
  name: 'RBreadcrumb',
  props: breadcrumbProps,
  setup(props, { slots }) {
    const breadcrumb = ref<HTMLDivElement>()

    provide(breadcrumbKey, props)

    onMounted(() => {
      const items = breadcrumb.value!.querySelectorAll(`.${bemItem()}`)

      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page')
      }
    })

    return () => (
      <div
        ref={breadcrumb}
        class={bem()}
        aria-label="Breadcrumb"
        role="navigation"
      >
        {slots.default?.()}
      </div>
    )
  }
})
