import {
  toRef,
  provide,
  reactive,
  defineComponent,
  type InjectionKey,
  type ExtractPropTypes
} from 'vue'

// Utils
import { makeStringProp } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Types
import { ButtonSize, ButtonType } from '../button/types'

const [, bem] = createNamespace('button-group')

export const buttonGroupProps = {
  type: makeStringProp<ButtonType>('default'), // 类型，可选值为 primary success warning danger
  size: makeStringProp<ButtonSize>('normal') // 尺寸，可选值为 large small mini
}

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface ButtonGroupContext {
  size?: ButtonGroupProps['size']
  type?: ButtonGroupProps['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
)

export default defineComponent({
  name: 'RButtonGroup',
  props: buttonGroupProps,
  emits: ['click'],
  setup(props, { slots }) {
    provide(
      buttonGroupContextKey,
      reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type')
      })
    )

    return () => <div class={bem()}>{slots.default?.()}</div>
  }
})
