import { h, defineComponent, type ExtractPropTypes } from 'vue'
import {
  addUnit,
  isString,
  isPromise,
  isBoolean,
  numericProp,
  unknownProp,
  iconPropType,
  definePropType,
  createNamespace
} from '../utils'
import { useCustomInputValue } from '@ryxon/use'
import { Loading } from '../loading'
import { Icon } from '../icon'

const [name, bem, , isBem] = createNamespace('switch')

export const switchProps = {
  modelValue: unknownProp,
  size: numericProp,
  loading: Boolean,
  disabled: Boolean,
  activeValue: { type: unknownProp, default: true as unknown },
  inactiveValue: { type: unknownProp, default: false as unknown },
  inlinePrompt: { type: Boolean, default: false },
  activeText: { type: String, default: '' },
  inactiveText: { type: String, default: '' },
  activeIcon: { type: iconPropType },
  inactiveIcon: { type: iconPropType },
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function)
  }
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export default defineComponent({
  name,

  props: switchProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const isChecked = () => props.modelValue === props.activeValue

    const handleChange = () => {
      const newValue = isChecked() ? props.inactiveValue : props.activeValue
      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    const onClick = () => {
      if (!props.disabled && !props.loading) {
        const { beforeChange } = props
        if (!beforeChange) {
          handleChange()
          return
        }

        const shouldChange = beforeChange()

        const isPromiseOrBool = [
          isPromise(shouldChange),
          isBoolean(shouldChange)
        ].includes(true)
        if (!isPromiseOrBool) {
          new Error(
            'RSwitch: beforeChange must return type `Promise<boolean>` or `boolean`'
          )
        }

        if (isPromise(shouldChange)) {
          shouldChange
            .then((result) => {
              if (result) {
                handleChange()
              }
            })
            .catch((e) => {
              new Error(`RSwitch: some error occurred: ${e}`)
            })
        } else if (shouldChange) {
          handleChange()
        }
      }
    }

    const renderLoading = () => {
      if (props.loading) {
        return <Loading class={bem('loading')} />
      }
      if (slots.node) {
        return slots.node()
      }
    }

    useCustomInputValue(() => props.modelValue)

    // 文本显示在点内
    const renderInner = () => {
      const { activeIcon, inactiveIcon, activeText, inactiveText } = props
      const checked = isChecked()

      return (
        <span class={bem('inner')}>
          {activeIcon || inactiveIcon ? (
            <Icon
              name={
                checked
                  ? isString(activeIcon)
                    ? activeIcon
                    : ''
                  : isString(inactiveIcon)
                  ? inactiveIcon
                  : ''
              }
              class={isBem('icon')}
            >
              {checked
                ? activeIcon && !isString(activeIcon) && h(activeIcon)
                : inactiveIcon && !isString(inactiveIcon) && h(inactiveIcon)}
            </Icon>
          ) : (
            (activeText || inactiveText) && (
              <span class={isBem('text')}>
                {checked ? activeText : inactiveText}
              </span>
            )
          )}
        </span>
      )
    }

    return () => {
      const {
        size,
        loading,
        disabled,
        inlinePrompt,
        activeIcon,
        inactiveIcon,
        activeText,
        inactiveText
      } = props
      const checked = isChecked()
      const style = { fontSize: addUnit(size) }

      const renderCore = () => (
        <div
          role="switch"
          class={bem({
            on: checked,
            loading,
            disabled
          })}
          style={style}
          tabindex={disabled ? undefined : 0}
          aria-checked={checked}
          onClick={onClick}
        >
          {inlinePrompt && renderInner()}
          <div class={bem('node')}>{renderLoading()}</div>
          {slots.background?.()}
        </div>
      )

      if (
        !inlinePrompt &&
        (activeIcon || inactiveIcon || activeText || inactiveText)
      ) {
        return (
          <div class={bem('text')}>
            {(inactiveIcon || inactiveText) && (
              <span
                class={[
                  bem('label'),
                  bem('label-left'),
                  isBem('active', !checked)
                ]}
              >
                {inactiveIcon ? (
                  <Icon name={isString(inactiveIcon) ? inactiveIcon : ''}>
                    {!isString(inactiveIcon) && h(inactiveIcon)}
                  </Icon>
                ) : (
                  <span>{inactiveText}</span>
                )}
              </span>
            )}
            {renderCore()}
            {(activeIcon || activeText) && (
              <span
                class={[
                  bem('label'),
                  bem('label-right'),
                  isBem('active', checked)
                ]}
              >
                {activeIcon ? (
                  <Icon name={isString(activeIcon) ? activeIcon : ''}>
                    {!isString(activeIcon) && h(activeIcon)}
                  </Icon>
                ) : (
                  <span>{activeText}</span>
                )}
              </span>
            )}
          </div>
        )
      }
      return renderCore()
    }
  }
})
