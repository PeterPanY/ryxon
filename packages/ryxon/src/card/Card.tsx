import { defineComponent, type StyleValue, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace, definePropType } from '../utils'

// Components

const [name, bem, , isBem] = createNamespace('card')

export const cardProps = {
  header: { type: String, default: '' },
  bodyStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: ''
  },
  shadow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'always'
  }
}

export type CardProps = ExtractPropTypes<typeof cardProps>

export default defineComponent({
  name,

  props: cardProps,

  emits: [''],

  setup(props, { slots }) {
    return () => (
      <div class={[bem(), isBem(`${props.shadow}-shadow`)]}>
        {(slots.header || props.header) && (
          <div class={bem('header')}>
            {slots.header ? slots.header() : props.header}
          </div>
        )}
        <div class={bem('body')} style={props.bodyStyle}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
