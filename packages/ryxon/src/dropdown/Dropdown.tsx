// @ts-nocheck
import {
  ref,
  unref,
  toRef,
  provide,
  computed,
  defineComponent,
  getCurrentInstance,
  type PropType,
  type TeleportProps,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import {
  addUnit,
  truthProp,
  definePropType,
  makeStringProp,
  createNamespace,
  composeEventHandlers
} from '../utils'
import { useId } from '../composables/use-id'
import { EVENT_CODE } from '../constants/aria'
import { useExpose } from '../composables/use-expose'
import {
  DROPDOWN_INJECTION_KEY,
  RCollection as RDropdownCollection
} from './types'
import { whenTrigger } from '../tooltip/tooltip-utils'

import { Tooltip } from '../tooltip'
import { Scrollbar } from '../scrollbar'
import { ButtonGroup } from '../button-group'
import { Button } from '../button'
import { Icon } from '../icon'
import { ArrowDown } from '@ryxon/icons'
import RRovingFocusGroup from '../roving-focus-group'

import type { TooltipTheme, TooltipTrigger, TooltipPlacement } from '../tooltip'
import type { ButtonType, ButtonProps } from '../button'

const [name, bem, t, isBem] = createNamespace('dropdown')

export const dropdownProps = {
  trigger: makeStringProp<TooltipTrigger>('hover'),
  theme: makeStringProp<TooltipTheme>('light'),
  type: { type: definePropType<ButtonType>(String) },
  placement: {
    type: definePropType<TooltipPlacement>(String),
    default: 'bottom'
  },
  // popperOptions: {
  //   type: definePropType<Partial<Options>>(Object),
  //   default: () => ({})
  // },
  id: String,
  size: { type: String, default: '' },
  splitButton: Boolean,
  hideOnClick: truthProp,
  loop: truthProp,
  showTimeout: { type: Number, default: 150 },
  hideTimeout: { type: Number, default: 150 },
  tabindex: {
    type: definePropType<number | string>([Number, String]),
    default: 0
  },
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: ''
  },
  showArrow: truthProp,
  popperClass: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  role: { type: String, default: 'menu' },
  buttonProps: { type: definePropType<ButtonProps>(Object) },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export default defineComponent({
  name,
  props: dropdownProps,
  emits: ['visible-change', 'click', 'command'],
  setup(props, { slots, emit }) {
    const _instance = getCurrentInstance()
    const triggeringElementRef = ref()
    const referenceElementRef = ref()
    const popperRef = ref<InstanceType<typeof Tooltip> | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const scrollbar = ref(null)
    const currentTabId = ref<string | null>(null)
    const isUsingKeyboard = ref(false)

    const triggerKeys = [EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.down]

    const wrapStyle = computed<CSSProperties>(() => ({
      maxHeight: addUnit(props.maxHeight)
    }))

    const dropdownSize = computed(() => props.size)

    const defaultTriggerId = useId()
    const triggerId = computed<string>(() => props.id || defaultTriggerId)

    function handleClose() {
      popperRef.value?.onClose()
    }

    function handleClick() {
      handleClose()
    }

    function handleOpen() {
      popperRef.value?.onOpen()
    }

    function commandHandler(...args: any[]) {
      emit('command', ...args)
    }

    function onItemEnter() {
      // NOOP for now
    }

    function onItemLeave() {
      const contentEl = unref(contentRef)

      contentEl?.focus()
      currentTabId.value = null
    }

    function handleCurrentTabIdChange(id: string) {
      currentTabId.value = id
    }

    function handleEntryFocus(e: Event) {
      if (!isUsingKeyboard.value) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }

    function handleBeforeShowTooltip() {
      emit('visible-change', true)
    }

    function handleShowTooltip(event?: Event) {
      if (event?.type === 'keydown') {
        contentRef.value.focus()
      }
    }

    function handleBeforeHideTooltip() {
      emit('visible-change', false)
    }

    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave
    })

    provide('rDropdown', {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, 'trigger'),
      hideOnClick: toRef(props, 'hideOnClick')
    })

    useExpose({ handleOpen, handleClose })

    const handlerMainButtonClick = (event: MouseEvent) => {
      emit('click', event)
    }

    // 受控或禁用时停止
    const stopWhenControlledOrDisabled = () => {
      if (props.disabled) {
        return true
      }
    }

    const trigger = toRef(props, 'trigger')

    const onClickWrapper = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        if ((e as MouseEvent).button === 0) {
          popperRef.value.onToggle(e)
        }
      })
    )

    // 鼠标移入
    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', () => {
        popperRef.value.onOpen()
      })
    )

    // 鼠标移出
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', () => {
        popperRef.value.onClose()
      })
    )

    // 获得焦点
    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', () => {
        popperRef.value.onOpen()
      })
    )

    // 失去焦点
    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', () => {
        popperRef.value.onClose()
      })
    )

    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'contextmenu', (e: Event) => {
        e.preventDefault()
        popperRef.value.onToggle(e)
      })
    )

    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e: KeyboardEvent) => {
        const { code } = e
        if (props.triggerKeys.includes(code)) {
          e.preventDefault()
          onToggle(e)
        }
      }
    )

    const rendercontentontent = {
      content: () => (
        <Scrollbar
          ref={scrollbar}
          wrap-style={wrapStyle.value}
          tag="div"
          view-class={bem('list')}
        >
          <RRovingFocusGroup
            loop={props.loop}
            current-tab-id={currentTabId.value}
            orientation="horizontal"
            onCurrentTabIdChange={handleCurrentTabIdChange}
            onEntryFocus={handleEntryFocus}
          >
            <RDropdownCollection>{slots.dropdown?.()}</RDropdownCollection>
          </RRovingFocusGroup>
        </Scrollbar>
      ),
      default: () => <>{!props.splitButton && slots.default?.()}</>
    }
    return () => (
      <div class={[bem(), isBem('disabled', props.disabled)]}>
        {props.splitButton && (
          <ButtonGroup>
            <Button
              ref={referenceElementRef}
              {...props.buttonProps}
              size={dropdownSize.value}
              type={props.type}
              disabled={props.disabled}
              tabindex={props.tabindex}
              onClick={handlerMainButtonClick}
            >
              {slots.default?.()}
            </Button>
            <Button
              id={triggerId.value}
              ref={triggeringElementRef}
              {...props.buttonProps}
              role="button"
              size={dropdownSize.value}
              type={props.type}
              class={bem('caret-button')}
              disabled={props.disabled}
              tabindex={props.tabindex}
              aria-label={t('toggleDropdown')}
              onClick={onClickWrapper}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseleave}
              onFocus={onFocus}
              onBlur={onBlur}
              onContextmenu={onContextMenu}
              onKeydown={onKeydown}
            >
              <Icon class={bem('icon')}>
                <ArrowDown></ArrowDown>
              </Icon>
            </Button>
          </ButtonGroup>
        )}
        <Tooltip
          ref={popperRef}
          role={props.role}
          offset={props.splitButton ? [-16, 8] : [0, 8]}
          theme={props.theme}
          fallback-placements={['bottom', 'top']}
          gpu-acceleration={false}
          hide-after={props.trigger === 'hover' ? props.hideTimeout : 0}
          manual-mode={true}
          placement={props.placement}
          popper-class={[bem('popper'), props.popperClass]}
          reference-element={referenceElementRef.value?.$el}
          trigger={props.trigger}
          trigger-keys={triggerKeys}
          trigger-target-el={contentRef}
          show-after={props.trigger === 'hover' ? props.showTimeout : 0}
          stop-popper-mouse-event={false}
          disabled={props.disabled}
          show-arrow={props.showArrow}
          transition="r-zoom-in-top"
          teleport={props.teleport}
          lazyRender={false}
          persistent={true}
          onBeforeShow={handleBeforeShowTooltip}
          onShow={handleShowTooltip}
          onBeforeHide={handleBeforeHideTooltip}
          v-slots={rendercontentontent}
        ></Tooltip>
      </div>
    )
  }
})
