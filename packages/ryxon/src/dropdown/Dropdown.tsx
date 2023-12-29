// @ts-nocheck
import {
  ref,
  unref,
  toRef,
  watch,
  provide,
  computed,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  type PropType,
  type TeleportProps,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import {
  pick,
  addUnit,
  truthProp,
  ensureArray,
  definePropType,
  makeStringProp
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { useId } from '../composables/use-id'
import { EVENT_CODE } from '../constants/aria'
import { useExpose } from '../composables/use-expose'
import {
  DROPDOWN_INJECTION_KEY,
  RCollection as RDropdownCollection
} from './types'

import { Tooltip } from '../tooltip'
import { OnlyChild } from '../popup/only-child'
import { Scrollbar } from '../scrollbar'
import { ButtonGroup } from '../button-group'
import { Button } from '../button'
import { Icon } from '../icon'
import { ArrowDown } from '@ryxon/icons'
import RRovingFocusGroup from '../roving-focus-group'

import type { TooltipTheme, TooltipTrigger, TooltipPlacement } from '../tooltip'
import type { ButtonType, ButtonProps } from '../button'
import type { RoleTypes } from '../popup/types'
import type { Options } from '@popperjs/core'

const [name, bem, t, isBem] = createNamespace('dropdown')

const tooltipProps = [] as const

export const dropdownProps = {
  trigger: makeStringProp<TooltipTrigger>('hover'),
  theme: makeStringProp<TooltipTheme>('light'),
  type: { type: definePropType<ButtonType>(String) },
  placement: {
    type: definePropType<TooltipPlacement>(String),
    default: 'bottom'
  },
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
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({})
  },
  popperClass: { type: String, default: '' },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: null
  },
  disabled: { type: Boolean, default: false },
  role: makeStringProp<RoleTypes>('menu'),
  buttonProps: { type: definePropType<ButtonProps>(Object) },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  lazyRender: Boolean
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

    const onFocusAfterTrapped = (e: Event) => {
      e.preventDefault()
      contentRef.value?.focus?.({ preventScroll: true })
    }

    useExpose({ handleOpen, handleClose, onFocusAfterTrapped })

    const handlerMainButtonClick = (event: MouseEvent) => {
      emit('click', event)
    }

    const triggerEnsure = computed(() => ensureArray(props.trigger))
    function onAutofocusTriggerEnter() {
      triggeringElementRef.value?.$el?.focus()
    }

    watch(
      [triggeringElementRef, triggerEnsure],
      ([triggeringElement, trigger], [prevTriggeringElement]) => {
        if (prevTriggeringElement?.$el?.removeEventListener) {
          prevTriggeringElement.$el.removeEventListener(
            'pointerenter',
            onAutofocusTriggerEnter
          )
        }
        if (triggeringElement?.$el?.removeEventListener) {
          triggeringElement.$el.removeEventListener(
            'pointerenter',
            onAutofocusTriggerEnter
          )
        }
        if (
          triggeringElement?.$el?.addEventListener &&
          trigger.includes('hover')
        ) {
          triggeringElement.$el.addEventListener(
            'pointerenter',
            onAutofocusTriggerEnter
          )
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      if (triggeringElementRef.value?.$el?.removeEventListener) {
        triggeringElementRef.value.$el.removeEventListener(
          'pointerenter',
          onAutofocusTriggerEnter
        )
      }
    })

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
      default: () =>
        !props.splitButton && (
          <OnlyChild
            ref={triggeringElementRef}
            id={triggerId.value}
            role="button"
            tabindex={props.tabindex}
          >
            {slots.default?.()}
          </OnlyChild>
        )
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
          offset={props.offset || (props.splitButton ? [-16, 8] : [0, 8])}
          theme={props.theme}
          fallback-placements={['bottom', 'top']}
          popper-options={props.popperOptions}
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
          virtual-triggering={props.splitButton}
          virtual-ref={triggeringElementRef}
          disabled={props.disabled}
          show-arrow={props.showArrow}
          transition="r-zoom-in-top"
          teleport={props.teleport}
          lazyRender={props.lazyRender}
          persistent={true}
          {...pick(props, tooltipProps)}
          onBeforeShow={handleBeforeShowTooltip}
          onShow={handleShowTooltip}
          onBeforeHide={handleBeforeHideTooltip}
          v-slots={rendercontentontent}
        ></Tooltip>
      </div>
    )
  }
})
