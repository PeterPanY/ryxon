// @ts-nocheck
import {
  h,
  ref,
  watch,
  markRaw,
  computed,
  defineComponent,
  type PropType,
  type Component,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

import {
  addUnit,
  mutable,
  isArray,
  isObject,
  hasClass,
  isString,
  makeStringProp,
  makeNumericProp,
  makeNumberProp,
  definePropType
} from '@ryxon/utils'
import { FORM_KEY, iconPropType, createNamespace } from '../utils'
import { EVENT_CODE } from '../constants/aria'
import { useId } from '../composables/use-id'
import { useExpose } from '../composables/use-expose'
import { Icon } from '../icon'
import { Star, StarFilled } from '@ryxon/icons'
import { useParent, useCustomInputValue } from '@ryxon/use'

function getValueFromMap<T>(
  value: number,
  map: Record<string, T | { excluded?: boolean; value: T }>
) {
  const isExcludedObject = (
    val: unknown
  ): val is { excluded?: boolean } & Record<any, unknown> => isObject(val)

  const matchedKeys = Object.keys(map)
    .map((key) => +key)
    .filter((key) => {
      const val = map[key]
      const excluded = isExcludedObject(val) ? val.excluded : false
      return excluded ? value < key : value <= key
    })
    .sort((a, b) => a - b)
  const matchedValue = map[matchedKeys[0]]
  return (isExcludedObject(matchedValue) && matchedValue.value) || matchedValue
}

const [name, bem, , isBem] = createNamespace('rate')

export const rateProps = {
  modelValue: makeNumberProp(0),
  id: String,
  lowThreshold: makeNumberProp(2),
  highThreshold: makeNumberProp(4),
  max: makeNumberProp(5),
  gutter: {
    type: [String, Number] as PropType<string | number>,
    default: 4
  },
  size: makeNumericProp(18),
  colors: {
    type: definePropType<string[] | Record<number, string>>([Array, Object]),
    default: () => mutable(['', '', ''] as const)
  },
  voidColor: String,
  disabledVoidColor: String,
  icons: {
    type: definePropType<
      Array<string | Component> | Record<number, string | Component>
    >([Array, Object]),
    default: () =>
      [StarFilled, StarFilled, StarFilled] as [Component, Component, Component]
  },
  voidIcon: { type: iconPropType, default: () => Star as Component },
  disabledVoidIcon: {
    type: iconPropType,
    default: () => StarFilled as Component
  },
  disabled: Boolean,
  allowHalf: Boolean,
  showText: Boolean,
  showScore: Boolean,
  textColor: String,
  texts: {
    type: definePropType<string[]>(Array),
    default: () =>
      mutable([
        'Extremely bad',
        'Disappointed',
        'Fair',
        'Satisfied',
        'Surprise'
      ] as const)
  },
  scoreTemplate: makeStringProp('{value}'),
  clearable: Boolean
}

export type RateProps = ExtractPropTypes<typeof rateProps>

export default defineComponent({
  name,
  props: rateProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const list = computed(() =>
      Array(+props.max)
        .fill('')
        .map((_, i) => i + 1)
    )

    const id = useId()
    const getRateId = () => props.id || `${id}`

    const currentValue = ref(props.modelValue)
    const hoverIndex = ref(-1)
    const pointerAtLeftHalf = ref(true)

    const { parent: form } = useParent(FORM_KEY)

    const rateDisabled = computed(() => props.disabled || form?.props.disabled)
    const valueDecimal = computed(
      () => props.modelValue * 100 - Math.floor(props.modelValue) * 100
    )

    function showDecimalIcon(item: number) {
      const showWhenDisabled =
        rateDisabled.value &&
        valueDecimal.value > 0 &&
        item - 1 < props.modelValue &&
        item > props.modelValue
      const showWhenAllowHalf =
        props.allowHalf &&
        pointerAtLeftHalf.value &&
        item - 0.5 <= currentValue.value &&
        item > currentValue.value
      return showWhenDisabled || showWhenAllowHalf
    }

    const componentMap = computed(() => {
      // eslint-disable-next-line no-restricted-syntax
      let icons = isArray(props.icons) ? [...props.icons] : { ...props.icons }
      icons = markRaw(icons) as
        | Array<string | Component>
        | Record<number, string | Component>
      return isArray(icons)
        ? {
            [props.lowThreshold]: icons[0],
            [props.highThreshold]: { value: icons[1], excluded: true },
            [props.max]: icons[2]
          }
        : icons
    })

    const voidComponent = computed(() =>
      rateDisabled.value
        ? isString(props.disabledVoidIcon)
          ? props.disabledVoidIcon
          : (markRaw(props.disabledVoidIcon) as Component)
        : isString(props.voidIcon)
          ? props.voidIcon
          : (markRaw(props.voidIcon) as Component)
    )

    const activeComponent = computed(() =>
      getValueFromMap(currentValue.value, componentMap.value)
    )

    const colorMap = computed(() =>
      isArray(props.colors)
        ? {
            [props.lowThreshold]: props.colors[0],
            [props.highThreshold]: { value: props.colors[1], excluded: true },
            [props.max]: props.colors[2]
          }
        : props.colors
    )

    const activeColor = computed(() => {
      const color = getValueFromMap(currentValue.value, colorMap.value)
      return isObject(color) ? '' : color
    })

    const decimalStyle = computed(() => {
      let width = ''
      if (rateDisabled.value) {
        width = `${valueDecimal.value}%`
      } else if (props.allowHalf) {
        width = '50%'
      }
      return {
        color: activeColor.value,
        width
      }
    })

    const decimalIconComponent = computed(() =>
      getValueFromMap(props.modelValue, componentMap.value)
    )

    function setCurrentValue(value: number, event?: MouseEvent) {
      if (rateDisabled.value) {
        return
      }
      if (props.allowHalf && event) {
        let target = event.target as HTMLElement
        if (hasClass(target, bem('item'))) {
          target = target.querySelector(`.${bem('icon')}`)!
        }
        if (target.clientWidth === 0 || hasClass(target, bem('decimal'))) {
          target = target.parentNode as HTMLElement
        }
        pointerAtLeftHalf.value = event.offsetX * 2 <= target.clientWidth
        currentValue.value = pointerAtLeftHalf.value ? value - 0.5 : value
      } else {
        currentValue.value = value
      }
      hoverIndex.value = value
    }

    function resetCurrentValue() {
      if (rateDisabled.value) {
        return
      }
      if (props.allowHalf) {
        pointerAtLeftHalf.value =
          props.modelValue !== Math.floor(props.modelValue)
      }
      currentValue.value = props.modelValue
      hoverIndex.value = -1
    }

    function emitValue(value: number) {
      // 如果允许清除，并且所选值与modelValue相同，则将值重置为0
      if (props.clearable && value === props.modelValue) {
        value = 0
      }

      emit('update:modelValue', value)
      if (props.modelValue !== value) {
        emit('change', value)
      }
    }

    function selectValue(value: number) {
      if (rateDisabled.value) {
        return
      }
      if (props.allowHalf && pointerAtLeftHalf.value) {
        emitValue(currentValue.value)
      } else {
        emitValue(value)
      }
    }

    const renderStar = (item: number, key: number) => {
      let style
      if (key + 1 !== props.max) {
        style = {
          marginRight: addUnit(props.gutter)
        }
      }

      return (
        <span
          key={key}
          class={bem('item')}
          onMousemove={($event) => setCurrentValue(item, $event)}
          onMouseleave={resetCurrentValue}
          onClick={() => selectValue(item)}
        >
          <Icon
            size={props.size}
            style={style}
            class={[
              bem('icon'),
              { hover: hoverIndex.value === item },
              isBem('active', item <= currentValue.value)
            ]}
          >
            {!showDecimalIcon(item)
              ? [
                  h(activeComponent.value, {
                    class: { hidden: !(item <= currentValue.value) }
                  }),
                  h(voidComponent.value, {
                    class: { hidden: item <= currentValue.value }
                  })
                ]
              : [
                  h(voidComponent.value, { class: bem('decimal--box') }),
                  <Icon
                    style={decimalStyle.value}
                    class={[bem('icon'), bem('decimal')]}
                  >
                    {h(decimalIconComponent.value)}
                  </Icon>
                ]}
          </Icon>
        </span>
      )
    }

    const rateStyles = computed(() => {
      return {
        '--r-rate-void-color': props.voidColor,
        '--r-rate-disabled-void-color': props.disabledVoidColor,
        '--r-rate-fill-color': activeColor.value
      } as CSSProperties
    })

    const text = computed(() => {
      let result = ''
      if (props.showScore) {
        result = props.scoreTemplate.replace(
          /\{\s*value\s*\}/,
          rateDisabled.value ? `${props.modelValue}` : `${currentValue.value}`
        )
      } else if (props.showText) {
        result = props.texts[Math.ceil(currentValue.value) - 1]
      }
      return result
    })

    function handleKey(e: KeyboardEvent) {
      if (rateDisabled.value) {
        return
      }
      let _currentValue = currentValue.value
      const { code } = e
      if (code === EVENT_CODE.up || code === EVENT_CODE.right) {
        if (props.allowHalf) {
          _currentValue += 0.5
        } else {
          _currentValue += 1
        }
        e.stopPropagation()
        e.preventDefault()
      } else if (code === EVENT_CODE.left || code === EVENT_CODE.down) {
        if (props.allowHalf) {
          _currentValue -= 0.5
        } else {
          _currentValue -= 1
        }
        e.stopPropagation()
        e.preventDefault()
      }
      _currentValue = _currentValue < 0 ? 0 : _currentValue
      _currentValue = _currentValue > props.max ? props.max : _currentValue
      emit('update:modelValue', _currentValue)
      emit('change', _currentValue)
      return _currentValue
    }

    watch(
      () => props.modelValue,
      (val) => {
        currentValue.value = val
        pointerAtLeftHalf.value =
          props.modelValue !== Math.floor(props.modelValue)
      }
    )

    useCustomInputValue(() => props.modelValue)

    if (!props.modelValue) {
      emit('update:modelValue', 0)
    }

    useExpose({
      setCurrentValue,
      resetCurrentValue
    })

    return () => (
      <div
        id={getRateId()}
        class={bem({ disabled: rateDisabled.value })}
        role="slider"
        aria-valuenow={currentValue.value}
        aria-valuetext={text.value || undefined}
        aria-valuemin="0"
        aria-valuemax={props.max}
        tabindex="0"
        style={rateStyles.value}
        onKeydown={handleKey}
      >
        {list.value.map(renderStar)}
        {(props.showText || props.showScore) && (
          <span
            class={bem('text')}
            style={{
              color: props.textColor,
              marginLeft: addUnit(props.gutter)
            }}
          >
            {text.value}
          </span>
        )}
      </div>
    )
  }
})
