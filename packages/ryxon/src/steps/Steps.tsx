import {
  defineComponent,
  type InjectionKey,
  type SetupContext,
  type ExtractPropTypes
} from 'vue'
import { makeStringProp, makeNumericProp } from '@ryxon/utils'
import { iconPropType, createNamespace } from '../utils'
import { useChildren } from '@ryxon/use'

const [name, bem] = createNamespace('steps')

export type StepsDirection = 'horizontal' | 'vertical'

export const stepsProps = {
  active: makeNumericProp(0),
  activeIcon: iconPropType,
  finishIcon: iconPropType,
  inactiveIcon: iconPropType,
  direction: makeStringProp<StepsDirection>('horizontal'),
  iconPrefix: String
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export type StepsProvide = {
  props: StepsProps
  onClickStep: (index: number) => void
  slots: SetupContext['slots']
}

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol(name)

export default defineComponent({
  name,

  props: stepsProps,

  emits: ['clickStep'],

  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(STEPS_KEY)

    const onClickStep = (index: number) => emit('clickStep', index)

    linkChildren({
      props,
      onClickStep,
      slots
    })

    return () => (
      <div class={bem([props.direction])}>
        <div class={bem('items')}>{slots.default?.()}</div>
      </div>
    )
  }
})
