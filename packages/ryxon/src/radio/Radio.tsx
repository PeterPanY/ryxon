import { defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { pick, extend, makeStringProp } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { RADIO_KEY } from '../radio-group/RadioGroup'

// Composables
import { useParent } from '@ryxon/use'

// Components
import Checker, {
  checkerProps,
  CheckerShape,
  CheckerLabelPosition,
  CheckerCheckShapeShape
} from '../checkbox/Checker'

export const radioProps = extend({}, checkerProps, {
  checkShape: makeStringProp<CheckerCheckShapeShape>('dot')
})

export type RadioShape = CheckerShape
export type RadioLabelPosition = CheckerLabelPosition
export type RadioProps = ExtractPropTypes<typeof radioProps>

const [, bem] = createNamespace('radio')

export default defineComponent({
  name: 'RRadio',
  props: radioProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const { parent } = useParent(RADIO_KEY)

    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue
      return value === props.name
    }

    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name)
      } else {
        emit('update:modelValue', props.name)
        emit('change', props.name)
      }
    }

    return () => (
      <Checker
        v-slots={pick(slots, ['default', 'icon'])}
        bem={bem}
        role="radio"
        parent={parent}
        checked={checked()}
        onToggle={toggle}
        {...props}
      />
    )
  }
})
