import { ref, computed, defineComponent, type PropType } from 'vue'
import {
  extend,
  isArray,
  addUnit,
  truthProp,
  isUndefined,
  numericProp,
  unknownProp,
  makeStringProp,
  makeRequiredProp,
  type Numeric
} from '../utils'
import { Icon } from '../icon'
import { Check, Minus } from '@ryxon/icons'

import { CheckboxSize } from './types'

export type CheckerShape = 'square' | 'round'
export type CheckerCheckShapeShape = 'dot' | 'check'
export type CheckerLabelPosition = 'left' | 'right'
export type CheckerType = 'button' | ''
export type CheckerParent = {
  props: {
    disabled?: boolean
    iconSize?: Numeric
    checkedColor?: string
    max?: Numeric
    min?: Numeric
    modelValue?: unknown
    size?: string
  }
}

export const checkerProps = {
  name: unknownProp,
  shape: makeStringProp<CheckerShape>('round'),
  disabled: Boolean,
  iconSize: numericProp,
  checkShape: makeStringProp<CheckerCheckShapeShape>('check'),
  modelValue: unknownProp,
  checkedColor: String,
  size: makeStringProp<CheckboxSize>(''),
  labelPosition: String as PropType<CheckerLabelPosition>,
  labelDisabled: Boolean,
  indeterminate: Boolean,
  type: makeStringProp<CheckerType>(''),
  border: Boolean
}

export default defineComponent({
  props: extend({}, checkerProps, {
    bem: makeRequiredProp(Function),
    role: String,
    parent: Object as PropType<CheckerParent | null>,
    checked: Boolean,
    bindGroup: truthProp
  }),
  emits: ['click', 'toggle'],
  setup(props, { emit, slots }) {
    const iconRef = ref<HTMLElement>()

    const getParentProp = <T extends keyof CheckerParent['props']>(name: T) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name]
      }
    }

    // 样式大小
    const size = computed(() => getParentProp('size') || props.size)

    // 数量限制后禁用
    const isLimitDisabled = computed(() => {
      const max = getParentProp('max')
      const min = getParentProp('min')
      const modelValue = getParentProp('modelValue')
      const value = isArray(modelValue) ? modelValue.slice() : []

      return (
        (!isUndefined(max) && value.length >= +max && !props.checked) ||
        (!isUndefined(min) && value.length <= +min && props.checked)
      )
    })

    // 是否禁用
    const disabled = computed(
      () => getParentProp('disabled') || props.disabled || isLimitDisabled.value
    )

    const iconStyle = computed(() => {
      const checkedColor = props.checkedColor || getParentProp('checkedColor')

      if (checkedColor && props.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        }
      }
    })

    // 点击事件
    const onClick = (event: MouseEvent) => {
      const { target } = event
      const icon = iconRef.value
      const iconClicked = icon === target || icon?.contains(target as Node)

      if (!disabled.value && (iconClicked || !props.labelDisabled)) {
        emit('toggle')
      }
      emit('click', event)
    }

    // 图标
    const renderIcon = () => {
      const { bem, shape, checked, checkShape, indeterminate } = props
      const iconSize = props.iconSize || getParentProp('iconSize')

      const checkShapeClass = slots.icon ? '' : checkShape

      return (
        <div
          ref={iconRef}
          class={bem('icon', [
            shape,
            checkShapeClass,
            { disabled: disabled.value, checked, indeterminate }
          ])}
          style={{ fontSize: addUnit(iconSize) }}
        >
          {slots.icon ? (
            slots.icon({ checked, disabled: disabled.value, indeterminate })
          ) : (
            <Icon style={iconStyle.value}>
              {indeterminate ? <Minus></Minus> : <Check></Check>}
            </Icon>
          )}
        </div>
      )
    }
    // label文字
    const renderLabel = () => (
      <span
        class={props.bem('label', [
          props.labelPosition,
          { disabled: disabled.value }
        ])}
      >
        {slots.default ? slots.default() : props.name}
      </span>
    )

    return () => {
      const nodes: (JSX.Element | undefined)[] =
        props.labelPosition === 'left'
          ? [renderLabel(), renderIcon()]
          : [renderIcon(), renderLabel()]

      return (
        <div
          role={props.role}
          class={props.bem([
            {
              disabled: disabled.value,
              'label-disabled': props.labelDisabled,
              bordered: props.border
            },
            size.value,
            props.type
          ])}
          tabindex={disabled.value ? undefined : 0}
          aria-checked={props.checked}
          onClick={onClick}
        >
          {nodes}
        </div>
      )
    }
  }
})
