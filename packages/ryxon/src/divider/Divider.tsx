import {
  computed,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import { makeStringProp } from '@ryxon/utils'
import { cssVarBlock, createNamespace } from '../utils'

const [name, bem] = createNamespace('divider')

export type DividerContentPosition = 'left' | 'center' | 'right'

export const dividerProps = {
  borderStyle: String,
  hairline: Boolean,
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal'
  },
  contentPosition: makeStringProp<DividerContentPosition>('center')
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>

export default defineComponent({
  name,

  props: dividerProps,

  setup(props, { slots }) {
    const dividerStyle = computed(
      () =>
        cssVarBlock('divider', {
          'border-style': props.borderStyle || ''
        }) as CSSProperties
    )

    return () => (
      <div
        role="separator"
        class={[
          bem({
            hairline: props.hairline,
            [`content-${props.contentPosition}`]: !!slots.default
          }),
          bem(props.direction)
        ]}
        style={dividerStyle.value}
      >
        {slots.default && props.direction !== 'vertical' && slots.default()}
      </div>
    )
  }
})
