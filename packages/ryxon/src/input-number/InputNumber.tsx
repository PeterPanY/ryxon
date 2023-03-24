import {
  ref,
  watch,
  computed,
  nextTick,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  isDef,
  addUnit,
  addNumber,
  truthProp,
  isUndefined,
  resetScroll,
  Interceptor,
  numericProp,
  formatNumber,
  getSizeStyle,
  preventDefault,
  createNamespace,
  callInterceptor,
  makeNumericProp,
  HAPTICS_FEEDBACK,
  LONG_PRESS_START_TIME,
  type Numeric
} from '../utils'
import { isNil } from 'lodash-unified'

// Composables
import { useCustomInputValue } from '@ryxon/use'

const [name, bem] = createNamespace('input-number')

const LONG_PRESS_INTERVAL = 200

const isEqual = (value1?: Numeric, value2?: Numeric) =>
  String(value1) === String(value2)

export type InputNumberTheme = 'default' | 'round'

export const inputNumberProps = {
  modelValue: numericProp,
  min: makeNumericProp(1),
  max: makeNumericProp(Infinity),
  name: makeNumericProp(''),
  step: makeNumericProp(1),
  theme: String as PropType<InputNumberTheme>,
  integer: Boolean,
  disabled: Boolean,
  showPlus: truthProp,
  showMinus: truthProp,
  showInput: truthProp,
  longPress: truthProp,
  autoFixed: truthProp,
  allowEmpty: Boolean,
  inputWidth: numericProp,
  buttonSize: numericProp,
  placeholder: String,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function as PropType<Interceptor>,
  defaultValue: makeNumericProp(1),
  decimalLength: numericProp,
  stepStrictly: Boolean
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export default defineComponent({
  name,

  props: inputNumberProps,

  emits: [
    'plus',
    'blur',
    'minus',
    'focus',
    'change',
    'overlimit',
    'update:modelValue'
  ],

  setup(props, { emit }) {
    const getPrecision = (value: number | null | undefined | string) => {
      if (isNil(value)) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    }

    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(+props.step)
      if (!isUndefined(props.decimalLength)) {
        if (stepPrecision > +props.decimalLength) {
          new Error(
            'InputNumber: precision should not be less than the decimal places of step'
          )
        }
        return props.decimalLength
      }
      return Math.max(getPrecision(props.modelValue), stepPrecision)
    })

    const toPrecision = (num: number, pre?: number | string) => {
      if (isUndefined(pre)) pre = +numPrecision.value
      if (pre === 0) return Math.round(num)
      let snum = String(num)
      const pointPos = snum.indexOf('.')
      if (pointPos === -1) return num.toFixed(+pre)
      const nums = snum.replace('.', '').split('')
      const datum = nums[pointPos + +pre]
      if (!datum) return num
      const { length } = snum
      if (snum.charAt(length - 1) === '5') {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`
      }
      console.log(pre)
      return Number.parseFloat(Number(snum).toFixed(+pre))
    }

    const format = (value: Numeric, autoFixed = true) => {
      const { min, max, allowEmpty, decimalLength, stepStrictly, step } = props

      if (allowEmpty && value === '') {
        return value
      }

      value = formatNumber(String(value), !props.integer)
      value = value === '' ? 0 : +value
      value = Number.isNaN(value) ? +min : value

      // whether to format the value entered by the user
      value = autoFixed ? Math.max(Math.min(+max, value), +min) : value

      // 是否采用严格模式
      if (stepStrictly) {
        value = toPrecision(Math.round(+value / +step) * +step, decimalLength)
      } else if (isDef(decimalLength)) {
        // format decimal
        value = value.toFixed(+decimalLength)
      }

      return value
    }

    const getInitialValue = () => {
      const defaultValue = props.modelValue ?? props.defaultValue
      const value = format(defaultValue)

      if (!isEqual(value, props.modelValue)) {
        emit('update:modelValue', value)
      }

      return value
    }

    let actionType: 'plus' | 'minus'
    const inputRef = ref<HTMLInputElement>()
    const current = ref(getInitialValue())

    const minusDisabled = computed(
      () => props.disabled || props.disableMinus || +current.value <= +props.min
    )

    const plusDisabled = computed(
      () => props.disabled || props.disablePlus || +current.value >= +props.max
    )

    const inputStyle = computed(() => ({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize)
    }))

    const buttonStyle = computed(() => getSizeStyle(props.buttonSize))

    const check = () => {
      const value = format(current.value)
      if (!isEqual(value, current.value)) {
        current.value = value
      }
    }

    const setValue = (value: Numeric) => {
      if (props.beforeChange) {
        callInterceptor(props.beforeChange, {
          args: [value],
          done() {
            current.value = value
          }
        })
      } else {
        current.value = value
      }
    }

    const onChange = () => {
      if (
        (actionType === 'plus' && plusDisabled.value) ||
        (actionType === 'minus' && minusDisabled.value)
      ) {
        emit('overlimit', actionType)
        return
      }

      const diff = actionType === 'minus' ? -props.step : +props.step
      const value = format(addNumber(+current.value, diff))

      setValue(value)
      emit(actionType)
    }

    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement
      const { value } = input
      const { decimalLength } = props

      let formatted = formatNumber(String(value), !props.integer)

      // limit max decimal length
      if (isDef(decimalLength) && formatted.includes('.')) {
        const pair = formatted.split('.')
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`
      }

      if (props.beforeChange) {
        input.value = String(current.value)
      } else if (!isEqual(value, formatted)) {
        input.value = formatted
      }

      // prefer number type
      const isNumeric = formatted === String(+formatted)
      setValue(isNumeric ? +formatted : formatted)
    }

    const onFocus = (event: Event) => {
      // readonly not work in legacy mobile safari
      if (props.disableInput) {
        inputRef.value?.blur()
      } else {
        emit('focus', event)
      }
    }

    const onBlur = (event: Event) => {
      const input = event.target as HTMLInputElement
      const value = format(input.value, props.autoFixed)
      input.value = String(value)
      current.value = value
      nextTick(() => {
        emit('blur', event)
        resetScroll()
      })
    }

    let isLongPress: boolean
    let longPressTimer: ReturnType<typeof setTimeout>

    const longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange()
        longPressStep()
      }, LONG_PRESS_INTERVAL)
    }

    const onTouchStart = () => {
      if (props.longPress) {
        isLongPress = false
        clearTimeout(longPressTimer)
        longPressTimer = setTimeout(() => {
          isLongPress = true
          onChange()
          longPressStep()
        }, LONG_PRESS_START_TIME)
      }
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (props.longPress) {
        clearTimeout(longPressTimer)
        if (isLongPress) {
          preventDefault(event)
        }
      }
    }

    const onMousedown = (event: MouseEvent) => {
      // fix mobile safari page scroll down issue
      // see: https://github.com/PeterPanY/ryxon/issues/7690
      if (props.disableInput) {
        preventDefault(event)
      }
    }

    const createListeners = (type: typeof actionType) => ({
      onClick: (event: MouseEvent) => {
        // disable double tap scrolling on mobile safari
        preventDefault(event)
        actionType = type
        onChange()
      },
      onTouchstartPassive: () => {
        actionType = type
        onTouchStart()
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    })

    watch(
      () => [props.max, props.min, props.integer, props.decimalLength],
      check
    )

    watch(
      () => props.modelValue,
      (value) => {
        if (!isEqual(value, current.value)) {
          current.value = format(value!)
        }
      }
    )

    watch(current, (value) => {
      emit('update:modelValue', value)
      emit('change', value, { name: props.name })
    })

    useCustomInputValue(() => props.modelValue)

    return () => (
      <div role="group" class={bem([props.theme])}>
        <button
          v-show={props.showMinus}
          type="button"
          style={buttonStyle.value}
          class={[
            bem('minus', { disabled: minusDisabled.value }),
            { [HAPTICS_FEEDBACK]: !minusDisabled.value }
          ]}
          aria-disabled={minusDisabled.value || undefined}
          {...createListeners('minus')}
        />
        <input
          v-show={props.showInput}
          ref={inputRef}
          type={props.integer ? 'tel' : 'text'}
          role="spinbutton"
          class={bem('input')}
          value={current.value}
          style={inputStyle.value}
          disabled={props.disabled}
          readonly={props.disableInput}
          // set keyboard in modern browsers
          inputmode={props.integer ? 'numeric' : 'decimal'}
          placeholder={props.placeholder}
          aria-valuemax={props.max}
          aria-valuemin={props.min}
          aria-valuenow={current.value}
          onBlur={onBlur}
          onInput={onInput}
          onFocus={onFocus}
          onMousedown={onMousedown}
        />
        <button
          v-show={props.showPlus}
          type="button"
          style={buttonStyle.value}
          class={[
            bem('plus', { disabled: plusDisabled.value }),
            { [HAPTICS_FEEDBACK]: !plusDisabled.value }
          ]}
          aria-disabled={plusDisabled.value || undefined}
          {...createListeners('plus')}
        />
      </div>
    )
  }
})
