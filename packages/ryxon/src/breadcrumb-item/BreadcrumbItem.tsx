import {
  h,
  ref,
  toRefs,
  inject,
  defineComponent,
  type ExtractPropTypes
} from 'vue'
import { extend, isString } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { useRoute, routeProps } from '../composables/use-route'

import { Icon } from '../icon'
import { breadcrumbKey } from '../breadcrumb/Breadcrumb'

const [, bem, , isBem] = createNamespace('breadcrumb')
const [, bemItem] = createNamespace('breadcrumb-item')

export const breadcrumbItemProps = extend({}, routeProps)

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

export default defineComponent({
  name: 'RBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props, { slots }) {
    const link = ref<HTMLSpanElement>()

    const breadcrumbContext = inject(breadcrumbKey, undefined)!
    const { separator, separatorIcon } = toRefs(breadcrumbContext)

    const route = useRoute()

    return () => (
      <span class={bemItem()}>
        <span
          ref={link}
          class={[bem('inner'), isBem('link', !!props.to)]}
          role="link"
          onClick={route}
        >
          {slots.default?.()}
        </span>
        {separatorIcon?.value ? (
          <Icon
            name={isString(separatorIcon.value) ? separatorIcon.value : ''}
            class={bem('separator')}
          >
            {!isString(separatorIcon.value) && h(separatorIcon.value)}
          </Icon>
        ) : (
          <span class={bem('separator')} role="presentation">
            {separator.value}
          </span>
        )}
      </span>
    )
  }
})
