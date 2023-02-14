// @ts-nocheck
import {
  ref,
  toRaw,
  watch,
  inject,
  toRefs,
  provide,
  reactive,
  onMounted,
  defineComponent,
  getCurrentInstance,
  type ExtractPropTypes
} from 'vue'

import { createNamespace } from '../utils'
import { selectGroupKey, selectKey } from './token'

const [, bem] = createNamespace('select-group')

// 传值
export const optionGroupProps = {
  label: String,
  disabled: {
    type: Boolean,
    default: false
  }
}

// 传参数据类型
export type OptionGroupProps = ExtractPropTypes<typeof optionGroupProps>

export default defineComponent({
  name: 'ROptionGroup',
  componentName: 'ROptionGroup',
  props: optionGroupProps,
  setup(props, { slots }) {
    const visible = ref(true)
    const instance = getCurrentInstance()
    const children = ref([])

    const { label, disabled } = toRefs(props)

    provide(
      selectGroupKey,
      reactive({
        label,
        disabled
      })
    )

    const select = inject(selectKey)

    // 获取选项的所有实例
    const flattedChildren = (node) => {
      const children = []
      if (Array.isArray(node.children)) {
        node.children.forEach((child) => {
          if (
            child.type &&
            child.type.name === 'ROption' &&
            child.component &&
            child.component.proxy
          ) {
            children.push(child.component.proxy)
          } else if (child.children?.length) {
            children.push(...flattedChildren(child))
          }
        })
      }
      return children
    }

    onMounted(() => {
      children.value = flattedChildren(instance.subTree)
    })

    const { groupQueryChange } = toRaw(select)

    watch(
      groupQueryChange,
      () => {
        visible.value = children.value.some((option) => option.visible === true)
      },
      { flush: 'post' }
    )

    return () => (
      <ul v-show={visible.value} class={bem('wrap')}>
        <li class={bem('title')}>{props.label}</li>
        <li>
          <ul class={bem()}>{slots.default?.()}</ul>
        </li>
      </ul>
    )
  }
})
