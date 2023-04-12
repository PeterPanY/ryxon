import {
  h,
  ref,
  computed,
  reactive,
  withKeys,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  noop,
  pick,
  extend,
  addUnit,
  isString,
  truthProp,
  isFunction,
  BORDER_TOP,
  BORDER_LEFT,
  unknownProp,
  numericProp,
  iconPropType,
  makeStringProp,
  callInterceptor,
  createNamespace,
  TypeComponentsMap,
  type ComponentInstance
} from '../utils'
import { popupSharedProps, popupSharedPropKeys } from '../popup/shared'

// Components
import { Popup } from '../popup'
import { Button } from '../button'
import { ActionBar } from '../action-bar'
import { ActionBarButton } from '../action-bar-button'
import { Icon } from '../icon'
import { Close } from '@ryxon/icons'

// Types
import type {
  DialogType,
  DialogTheme,
  DialogAction,
  DialogPositon,
  DialogMessage,
  DialogMessageAlign
} from './types'

const [, bem, t] = createNamespace('dialog')

export const dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String as PropType<DialogTheme>,
  width: numericProp,
  position: makeStringProp<DialogPositon>('center'),
  message: [String, Function] as PropType<DialogMessage>,
  type: makeStringProp<DialogType>(''),
  icon: iconPropType,
  callback: Function as PropType<(action?: DialogAction) => void>,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp('r-dialog-bounce'),
  messageAlign: String as PropType<DialogMessageAlign>,
  closeOnPopstate: truthProp,
  showConfirmButton: truthProp,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  closeOnClickOverlay: Boolean,
  showClose: truthProp,
  showFooter: truthProp
})

export type DialogProps = ExtractPropTypes<typeof dialogProps>

const popupInheritKeys = [
  ...popupSharedPropKeys,
  'transition',
  'closeOnPopstate'
] as const

export default defineComponent({
  name: 'RDialog',
  props: dialogProps,
  emits: ['confirm', 'cancel', 'keydown', 'update:show'],
  setup(props, { emit, slots }) {
    const root = ref<ComponentInstance>()
    const loading = reactive({
      confirm: false,
      cancel: false
    })

    const updateShow = (value: boolean) => emit('update:show', value)

    const close = (action: DialogAction) => {
      updateShow(false)
      props.callback?.(action)
    }

    const getActionHandler = (action: DialogAction) => () => {
      // 隐藏时不应触发关闭事件
      if (!props.show) {
        return
      }

      emit(action)

      if (props.beforeClose) {
        loading[action] = true
        callInterceptor(props.beforeClose, {
          args: [action],
          done() {
            close(action)
            loading[action] = false
          },
          canceled() {
            loading[action] = false
          }
        })
      } else {
        close(action)
      }
    }

    const onCancel = getActionHandler('cancel')
    const onConfirm = getActionHandler('confirm')
    const onKeydown = withKeys(
      (event: KeyboardEvent) => {
        // skip keyboard events of child elements
        if (event.target !== root.value?.popupRef?.value) {
          return
        }

        const onEventType: Record<string, () => void> = {
          Enter: props.showConfirmButton ? onConfirm : noop,
          Escape: props.showCancelButton ? onCancel : noop
        }

        onEventType[event.key]()
        emit('keydown', event)
      },
      ['enter', 'esc']
    )

    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title
      if (title) {
        return (
          <div
            class={bem('header', {
              isolated: !props.message && !slots.default
            })}
          >
            {title}
            {props.showClose && (
              <Icon class={bem('close')} onClick={onCancel}>
                <Close></Close>
              </Icon>
            )}
          </div>
        )
      }
    }

    const iconComponent = computed(() => {
      const { icon, type } = props
      if (icon) {
        return icon
      }
      if (
        type === 'success' ||
        type === 'warning' ||
        type === 'info' ||
        type === 'danger'
      ) {
        return TypeComponentsMap[type]
      }
      return ''
    })

    const typeClass = computed(() => {
      const { type } = props
      if (
        type === 'success' ||
        type === 'warning' ||
        type === 'info' ||
        type === 'danger'
      ) {
        return {
          [bem(`icon`, type) as string]: type && TypeComponentsMap[type]
        }
      }
      return ''
    })

    const renderMessage = (hasTitle: boolean) => {
      const { message, allowHtml, messageAlign } = props
      const classNames = bem('message', {
        'has-title': hasTitle,
        [messageAlign as string]: messageAlign
      })

      const content = isFunction(message) ? message() : message

      if (allowHtml && typeof content === 'string') {
        return (
          <>
            {iconComponent.value && (
              <Icon
                name={isString(iconComponent.value) ? iconComponent.value : ''}
                class={[bem('status'), typeClass.value]}
              >
                {!isString(iconComponent.value) && h(iconComponent.value)}
              </Icon>
            )}
            <div class={classNames} innerHTML={content} />
          </>
        )
      }

      return (
        <>
          {iconComponent.value && (
            <Icon
              name={isString(iconComponent.value) ? iconComponent.value : ''}
              class={[bem('status'), typeClass.value]}
            >
              {!isString(iconComponent.value) && h(iconComponent.value)}
            </Icon>
          )}
          <div class={classNames}>{content}</div>
        </>
      )
    }

    const renderContent = () => {
      if (slots.default) {
        return <div class={bem('content')}>{slots.default()}</div>
      }

      const { title, message, allowHtml } = props
      if (message) {
        const hasTitle = !!(title || slots.title)
        return (
          <div
            // 添加key值以强制重新渲染
            key={allowHtml ? 1 : 0}
            class={bem('content', {
              isolated: !hasTitle,
              type: iconComponent.value,
              [props.messageAlign as string]: props.messageAlign
            })}
          >
            {renderMessage(hasTitle)}
          </div>
        )
      }
    }

    // 默认按钮
    const renderButtons = () => (
      <div class={[BORDER_TOP, bem('footer')]}>
        {props.showCancelButton && (
          <Button
            size="large"
            text={props.cancelButtonText || t('cancel')}
            class={[bem('cancel'), bem('default')]}
            style={{ color: props.cancelButtonColor }}
            loading={loading.cancel}
            disabled={props.cancelButtonDisabled}
            onClick={onCancel}
          />
        )}
        {props.showConfirmButton && (
          <Button
            size="large"
            text={props.confirmButtonText || t('confirm')}
            class={[
              bem('confirm'),
              { [BORDER_LEFT]: props.showCancelButton },
              bem('default')
            ]}
            style={{ color: props.confirmButtonColor }}
            loading={loading.confirm}
            disabled={props.confirmButtonDisabled}
            onClick={onConfirm}
          />
        )}
      </div>
    )

    // 原型底部按钮
    const renderRoundButtons = () => (
      <ActionBar class={bem('footer')}>
        {props.showCancelButton && (
          <ActionBarButton
            text={props.cancelButtonText || t('cancel')}
            class={bem('cancel')}
            color={props.cancelButtonColor}
            loading={loading.cancel}
            disabled={props.cancelButtonDisabled}
            onClick={onCancel}
          />
        )}
        {props.showConfirmButton && (
          <ActionBarButton
            type="primary"
            text={props.confirmButtonText || t('confirm')}
            class={bem('confirm')}
            color={props.confirmButtonColor}
            loading={loading.confirm}
            disabled={props.confirmButtonDisabled}
            onClick={onConfirm}
          />
        )}
      </ActionBar>
    )

    // 底部按钮
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer()
      }
      return props.theme === 'space-button'
        ? renderRoundButtons()
        : renderButtons()
    }

    return () => {
      const { width, title, theme, message, className } = props
      return (
        <Popup
          ref={root}
          role="dialog"
          class={[bem([theme]), className, bem(props.position)]}
          tabindex={0}
          aria-labelledby={title || message}
          onKeydown={onKeydown}
          onUpdate:show={updateShow}
          {...pick(props, popupInheritKeys)}
        >
          <div class={bem('body')} style={{ width: addUnit(width) }}>
            {renderTitle()}
            {renderContent()}
            {props.showFooter && renderFooter()}
          </div>
        </Popup>
      )
    }
  }
})
