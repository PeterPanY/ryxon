import {
  h,
  ref,
  watch,
  provide,
  computed,
  nextTick,
  reactive,
  onMounted,
  defineComponent,
  type PropType,
  type ExtractPropTypes,
  type HTMLAttributes
} from 'vue'

// Utils
import {
  isDef,
  isString,
  extend,
  addUnit,
  toArray,
  truthProp,
  numericProp,
  unknownProp,
  resetScroll,
  formatNumber,
  preventDefault,
  makeStringProp,
  makeNumericProp,
  type ComponentInstance,
  clamp
} from '@ryxon/utils'
import { FORM_KEY, iconPropType, createNamespace } from '../utils'
import {
  cutString,
  runSyncRule,
  mapInputType,
  isEmptyValue,
  getRuleMessage,
  resizeTextarea,
  getStringLength,
  runRuleValidator
} from './utils'
import { cellSharedProps } from '../cell/Cell'

// Composables
import { useParent, CUSTOM_INPUT_INJECTION_KEY } from '@ryxon/use'
import { useId } from '../composables/use-id'
import { useExpose } from '../composables/use-expose'

// Components
import { Icon } from '../icon'
import { Cell } from '../cell'

import { CircleClose } from '@ryxon/icons'

// Types
import type {
  InputRule,
  InputType,
  InputTextAlign,
  InputClearTrigger,
  InputFormatTrigger,
  InputValidateError,
  InputAutosizeConfig,
  InputValidationStatus,
  InputValidateTrigger,
  InputFormSharedProps
} from './types'

const [name, bem, , isBem] = createNamespace('input')

// provide to Search component to inherit
export const inputSharedProps = {
  id: String,
  name: String,
  leftIcon: iconPropType,
  rightIcon: iconPropType,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  max: Number,
  min: Number,
  formatter: Function as PropType<(value: string) => string>,
  modelValue: makeNumericProp(''),
  inputAlign: String as PropType<InputTextAlign>,
  placeholder: String,
  autocomplete: makeStringProp('off'),
  autocapitalize: String,
  autocorrect: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: makeStringProp<InputClearTrigger>('focus'),
  formatTrigger: makeStringProp<InputFormatTrigger>('onChange'),
  spellcheck: { type: Boolean, default: null },
  clearIcon: { type: iconPropType, default: CircleClose },
  error: { type: Boolean, default: null },
  disabled: { type: Boolean, default: null },
  readonly: { type: Boolean, default: null },
  inputBorder: truthProp,
  tabindex: { type: [String, Number], default: 0 }, // 输入框的 tabindex
  inputmode: String as PropType<HTMLAttributes['inputmode']>
}

export const inputProps = extend({}, cellSharedProps, inputSharedProps, {
  rows: numericProp,
  type: makeStringProp<InputType>('text'),
  rules: Array as PropType<InputRule[]>,
  autosize: [Boolean, Object] as PropType<boolean | InputAutosizeConfig>,
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String as PropType<InputTextAlign>,
  showWordLimit: Boolean,
  errorMessageAlign: String as PropType<InputTextAlign>,
  colon: { type: Boolean, default: null }
})

export type InputProps = ExtractPropTypes<typeof inputProps>

type TargetElement = HTMLInputElement | HTMLTextAreaElement

export default defineComponent({
  name,
  props: inputProps,
  emits: [
    'blur',
    'focus',
    'paste',
    'clear',
    'input',
    'change',
    'keydown',
    'keypress',
    'mouseenter',
    'mouseleave',
    'clickInput',
    'endValidate',
    'startValidate',
    'clickLeftIcon',
    'clickRightIcon',
    'compositionend',
    'compositionstart',
    'compositionupdate',
    'update:modelValue'
  ],
  setup(props, { emit, slots }) {
    const id = useId()
    const state = reactive({
      status: 'unvalidated' as InputValidationStatus,
      focused: false,
      hovering: false,
      validateMessage: ''
    })

    const inputRef = ref<HTMLInputElement>()
    const clearIconRef = ref<ComponentInstance>()
    const customValue = ref<() => unknown>()

    const { parent: form } = useParent(FORM_KEY)

    const getModelValue = () => String(props.modelValue ?? '')

    const getProp = <T extends InputFormSharedProps>(key: T) => {
      if (isDef(props[key])) {
        return props[key]
      }
      if (form && isDef(form.props[key])) {
        return form.props[key]
      }
    }

    const showClear = computed(() => {
      const readonly = getProp('readonly')

      if (props.clearable && !readonly) {
        const hasValue = getModelValue() !== ''
        const trigger =
          props.clearTrigger === 'always' ||
          (props.clearTrigger === 'focus' && (state.focused || state.hovering))

        return hasValue && trigger
      }
      return false
    })

    const formValue = computed(() => {
      if (customValue.value && slots.input) {
        return customValue.value()
      }
      return props.modelValue
    })

    const showRequiredMark = computed(() => {
      const required = getProp('required')
      if (required === 'auto') {
        return props.rules?.some((rule: InputRule) => rule.required)
      }
      return required
    })

    const runRules = (rules: InputRule[]) =>
      rules.reduce(
        (promise, rule) =>
          promise.then(() => {
            if (state.status === 'failed') {
              return
            }

            let { value } = formValue

            if (rule.formatter) {
              value = rule.formatter(value, rule)
            }

            if (!runSyncRule(value, rule)) {
              state.status = 'failed'
              state.validateMessage = getRuleMessage(value, rule)
              return
            }

            if (rule.validator) {
              if (isEmptyValue(value) && rule.validateEmpty === false) {
                return
              }

              return runRuleValidator(value, rule).then((result) => {
                if (result && typeof result === 'string') {
                  state.status = 'failed'
                  state.validateMessage = result
                } else if (result === false) {
                  state.status = 'failed'
                  state.validateMessage = getRuleMessage(value, rule)
                }
              })
            }
          }),
        Promise.resolve()
      )

    const resetValidation = () => {
      state.status = 'unvalidated'
      state.validateMessage = ''
    }

    const endValidate = () =>
      emit('endValidate', {
        status: state.status,
        message: state.validateMessage
      })

    const validate = (rules = props.rules) =>
      new Promise<InputValidateError | void>((resolve) => {
        resetValidation()
        if (rules) {
          emit('startValidate')
          runRules(rules).then(() => {
            if (state.status === 'failed') {
              resolve({
                name: props.name,
                message: state.validateMessage
              })
              endValidate()
            } else {
              state.status = 'passed'
              resolve()
              endValidate()
            }
          })
        } else {
          resolve()
        }
      })

    const validateWithTrigger = (trigger: InputValidateTrigger) => {
      if (form && props.rules) {
        const { validateTrigger } = form.props
        const defaultTrigger = toArray(validateTrigger).includes(trigger)
        const rules = props.rules.filter((rule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger)
          }
          return defaultTrigger
        })

        if (rules.length) {
          validate(rules)
        }
      }
    }

    // 最大长度的换行计数
    const limitValueLength = (value: string) => {
      const { maxlength } = props
      if (isDef(maxlength) && getStringLength(value) > +maxlength) {
        const modelValue = getModelValue()
        if (modelValue && getStringLength(modelValue) === +maxlength) {
          return modelValue
        }
        // 删除冗余插值，使其与本地输入maxlength行为一致。
        const selectionEnd = inputRef.value?.selectionEnd
        if (state.focused && selectionEnd) {
          const valueArr = [...value]
          const exceededLength = valueArr.length - +maxlength
          valueArr.splice(selectionEnd - exceededLength, exceededLength)
          return valueArr.join('')
        }
        return cutString(value, +maxlength)
      }
      return value
    }

    const updateValue = (
      value: string,
      trigger: InputFormatTrigger = 'onChange'
    ) => {
      const originalValue = value
      value = limitValueLength(value)
      // 当值长度超过maxlength时，记录用于校正光标位置的多余长度。
      const limitDiffLen =
        getStringLength(originalValue) - getStringLength(value)

      if (props.type === 'number' || props.type === 'digit') {
        const isNumber = props.type === 'number'
        value = formatNumber(value, isNumber, isNumber)

        if (
          trigger === 'onBlur' &&
          value !== '' &&
          (props.min !== undefined || props.max !== undefined)
        ) {
          const adjustedValue = clamp(
            +value,
            props.min ?? -Infinity,
            props.max ?? Infinity
          )

          if (+value !== adjustedValue) {
            value = adjustedValue.toString()
          }
        }
      }

      let formatterDiffLen = 0
      if (props.formatter && trigger === props.formatTrigger) {
        const { formatter, maxlength } = props
        value = formatter(value)
        // The length of the formatted value may exceed maxlength.
        if (isDef(maxlength) && getStringLength(value) > +maxlength) {
          value = cutString(value, +maxlength)
        }
        if (inputRef.value && state.focused) {
          const { selectionEnd } = inputRef.value
          // 格式化值的长度可能超过maxlength。
          const bcoVal = cutString(originalValue, selectionEnd!)
          // 记录格式化后“bcoVal”的长度变化，其用于校正光标位置。
          formatterDiffLen =
            getStringLength(formatter(bcoVal)) - getStringLength(bcoVal)
        }
      }

      if (inputRef.value && inputRef.value.value !== value) {
        // 当输入聚焦时，纠正光标位置。
        if (state.focused) {
          let { selectionStart, selectionEnd } = inputRef.value
          inputRef.value.value = value

          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = getStringLength(value)

            if (limitDiffLen) {
              selectionStart -= limitDiffLen
              selectionEnd -= limitDiffLen
            } else if (formatterDiffLen) {
              selectionStart += formatterDiffLen
              selectionEnd += formatterDiffLen
            }

            inputRef.value.setSelectionRange(
              Math.min(selectionStart, valueLen),
              Math.min(selectionEnd, valueLen)
            )
          }
        } else {
          inputRef.value.value = value
        }
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    }

    const onInput = (event: Event) => {
      const { value } = event.target as HTMLInputElement

      // 编写时跳过更新值
      if (!event.target!.composing) {
        updateValue(value)
        emit('input', value)
      }
    }

    const onChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value)
      const { target } = event
      if (target!.composing) {
        target!.composing = false
        target!.dispatchEvent(new Event('input'))
      }
    }

    function startComposing(event: CompositionEvent) {
      emit('compositionstart', event)
      const { target } = event
      target!.composing = true
    }

    const updateComposing = (event: CompositionEvent) => {
      emit('compositionupdate', event)
    }

    const endComposing = (event: CompositionEvent) => {
      emit('compositionend', event)
      const { target } = event
      if (target!.composing) {
        target!.composing = false
        target!.dispatchEvent(new Event('input'))
      }
    }

    const onKeydown = (event: KeyboardEvent) => emit('keydown', event)
    const onPaste = () => emit('paste')

    const blur = () => inputRef.value?.blur()
    const focus = () => inputRef.value?.focus()

    const adjustTextareaSize = () => {
      const input = inputRef.value
      if (props.type === 'textarea' && props.autosize && input) {
        resizeTextarea(input, props.autosize)
      }
    }

    const onFocus = (event: Event) => {
      state.focused = true
      emit('focus', event)
      nextTick(adjustTextareaSize)

      // readonly在传统移动safari中不起作用
      if (getProp('readonly')) {
        blur()
      }
    }

    const onBlur = (event: Event) => {
      state.focused = false
      updateValue(getModelValue(), 'onBlur')
      emit('blur', event)

      if (getProp('readonly')) {
        return
      }

      validateWithTrigger('onBlur')
      nextTick(adjustTextareaSize)
      resetScroll()
    }

    const onClickInput = (event: MouseEvent) => emit('clickInput', event)

    const onClickLeftIcon = (event: MouseEvent) => emit('clickLeftIcon', event)

    const onClickRightIcon = (event: MouseEvent) =>
      emit('clickRightIcon', event)

    const onClear = (event: MouseEvent) => {
      preventDefault(event)
      emit('update:modelValue', '')
      emit('clear', event)
    }

    const showError = computed(() => {
      if (typeof props.error === 'boolean') {
        return props.error
      }
      if (form && form.props.showError && state.status === 'failed') {
        return true
      }
    })

    const labelStyle = computed(() => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      if (labelWidth && labelAlign !== 'top') {
        return { width: addUnit(labelWidth) }
      }
    })

    const onKeypress = (event: KeyboardEvent) => {
      const ENTER_CODE = 13

      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter
        if (!submitOnEnter && props.type !== 'textarea') {
          preventDefault(event)
        }

        // 单击键盘搜索按钮后触发模糊
        if (props.type === 'search') {
          blur()
        }
      }

      emit('keypress', event)
    }

    const getInputId = () => props.id || `${id}-input`

    const getValidationStatus = () => state.status

    const renderInput = () => {
      const controlClass = bem('control', [
        getProp('inputAlign'),
        {
          error: showError.value,
          custom: !!slots.input,
          'min-height': props.type === 'textarea' && !props.autosize
        }
      ])

      if (slots.input) {
        return (
          <div class={controlClass} onClick={onClickInput}>
            {slots.input()}
          </div>
        )
      }

      const inputAttrs = {
        id: getInputId(),
        ref: inputRef,
        name: props.name,
        tabindex: props.tabindex,
        rows: props.rows !== undefined ? +props.rows : undefined,
        class: controlClass,
        disabled: getProp('disabled'),
        readonly: getProp('readonly'),
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        autocapitalize: props.autocapitalize,
        autocorrect: props.autocorrect,
        enterkeyhint: props.enterkeyhint,
        spellcheck: props.spellcheck,
        'aria-labelledby': props.label ? `${id}-label` : undefined,
        'data-allow-mismatch': 'attribute',
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange,
        onKeypress,
        onCompositionend: endComposing,
        onCompositionstart: startComposing,
        onCompositionupdate: updateComposing,
        onKeydown,
        onPaste
      }

      if (props.type === 'textarea') {
        return <textarea {...inputAttrs} inputmode={props.inputmode} />
      }

      return (
        <input {...mapInputType(props.type, props.inputmode)} {...inputAttrs} />
      )
    }

    const renderLeftIcon = () => {
      const leftIconSlot = slots['left-icon']

      if (props.leftIcon || leftIconSlot) {
        return (
          <div class={bem('left-icon')} onClick={onClickLeftIcon}>
            {leftIconSlot ? (
              leftIconSlot()
            ) : (
              <Icon
                name={isString(props.leftIcon) ? props.leftIcon : ''}
                classPrefix={props.iconPrefix}
              >
                {props.leftIcon &&
                  !isString(props.leftIcon) &&
                  h(props.leftIcon)}
              </Icon>
            )}
          </div>
        )
      }
    }

    const renderRightIcon = () => {
      const rightIconSlot = slots['right-icon']

      if (props.rightIcon || rightIconSlot) {
        return (
          <div class={bem('right-icon')} onClick={onClickRightIcon}>
            {rightIconSlot ? (
              rightIconSlot()
            ) : (
              <Icon
                name={isString(props.rightIcon) ? props.rightIcon : ''}
                classPrefix={props.iconPrefix}
              >
                {props.rightIcon &&
                  !isString(props.rightIcon) &&
                  h(props.rightIcon)}
              </Icon>
            )}
          </div>
        )
      }
    }

    const renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        const count = getStringLength(getModelValue())
        return (
          <div class={bem('word-limit')}>
            <span class={bem('word-num')}>{count}</span>/{props.maxlength}
          </div>
        )
      }
    }

    const isError = ref(false)

    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        isError.value = false
        return
      }

      const message = props.errorMessage || state.validateMessage

      if (message) {
        isError.value = true
        const slot = slots['error-message']
        const errorMessageAlign = getProp('errorMessageAlign')
        return (
          <div class={bem('error-message', errorMessageAlign)}>
            {slot ? slot({ message }) : message}
          </div>
        )
      }
      isError.value = false
    }

    const renderLabel = () => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      const colon = getProp('colon') ? ':' : ''

      if (slots.label) {
        return [slots.label(), colon]
      }
      if (props.label) {
        return (
          <label
            id={`${id}-label`}
            for={slots.input ? undefined : getInputId()}
            data-allow-mismatch="attribute"
            onClick={(event: MouseEvent) => {
              // 组件在点击label位置时，绑定的click事件会执行两次
              preventDefault(event)
              focus()
            }}
            style={
              labelAlign === 'top' && labelWidth
                ? { width: addUnit(labelWidth) }
                : undefined
            }
          >
            {props.label + colon}
          </label>
        )
      }
    }

    const handleMouseEnter = (event: Event) => {
      state.hovering = true
      emit('mouseenter', event)
    }
    const handleMouseLeave = (event: Event) => {
      state.hovering = false
      emit('mouseleave', event)
    }

    const renderInputBody = () => [
      <div
        class={[
          bem('body', {
            border: !slots.input && props.inputBorder,
            input: !slots.input
          }),
          state.focused ? 'is-focus' : ''
        ]}
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >
        {renderInput()}
        {showClear.value && (
          <Icon
            ref={clearIconRef}
            name={isString(props.clearIcon) ? props.clearIcon : ''}
            class={bem('clear')}
            onClick={onClear}
          >
            {props.clearIcon &&
              !isString(props.clearIcon) &&
              h(props.clearIcon)}
          </Icon>
        )}
        {renderRightIcon()}
        {slots.button && <div class={bem('button')}>{slots.button()}</div>}
      </div>,
      renderWordLimit(),
      renderMessage()
    ]

    useExpose({
      ref: inputRef,
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus
    })

    provide(CUSTOM_INPUT_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger
    })

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue())
        resetValidation()
        validateWithTrigger('onChange')
        nextTick(adjustTextareaSize)
      }
    )

    onMounted(() => {
      updateValue(getModelValue(), props.formatTrigger)
      nextTick(adjustTextareaSize)
    })

    return () => {
      const disabled = getProp('disabled')
      const labelAlign = getProp('labelAlign')
      const LeftIcon = renderLeftIcon()

      const renderTitle = () => {
        const Label = renderLabel()
        if (labelAlign === 'top') {
          return [LeftIcon, Label].filter(Boolean)
        }
        return Label || []
      }

      return (
        <Cell
          v-slots={{
            icon: LeftIcon && labelAlign !== 'top' ? () => LeftIcon : null,
            title: renderTitle,
            value: renderInputBody,
            extra: slots.extra
          }}
          size={props.size}
          class={[
            bem({
              error: showError.value,
              disabled,
              [`label-${labelAlign}`]: labelAlign
            }),
            isBem('error', isError.value)
          ]}
          center={props.center}
          border={props.border}
          isLink={props.isLink}
          clickable={props.clickable}
          titleStyle={labelStyle.value}
          valueClass={bem('value')}
          titleClass={[
            bem('label', [labelAlign, { required: showRequiredMark.value }]),
            props.labelClass
          ]}
          arrowDirection={props.arrowDirection}
        />
      )
    }
  }
})
