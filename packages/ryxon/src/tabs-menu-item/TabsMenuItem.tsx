import {
  ref,
  computed,
  reactive,
  Teleport,
  nextTick,
  defineComponent,
  type PropType,
  type TeleportProps,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { usePopper, buildPopperOptions } from '../tooltip/use-popper'
import {
  inBrowser,
  truthProp,
  unknownProp,
  numericProp,
  makeArrayProp,
  getZIndexStyle,
  definePropType,
  makeStringProp,
  type ComponentInstance
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { TABSMENU_KEY } from '../tabs-menu/TabsMenu'

// Composables
import { useParent } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Components
import { Check } from '@ryxon/icons'
import { Cell } from '../cell'
import { Icon } from '../icon'
import { Popup } from '../popup'

// Types
import type { TabsMenuItemOption, TabsMenuItemPlacement } from './types'
import type {
  Instance,
  Options,
  Placement,
  PositioningStrategy
} from '@popperjs/core'

const [name, bem] = createNamespace('tabs-menu-item')

export const tabsMenuItemProps = {
  title: String,
  options: makeArrayProp<TabsMenuItemOption>(),
  disabled: Boolean,
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  lazyRender: truthProp,
  modelValue: unknownProp,
  titleClass: unknownProp,
  contentClass: unknownProp,
  name: numericProp,
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8]
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({})
  },
  strategy: makeStringProp<PositioningStrategy>('absolute'),
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined
  },
  gpuAcceleration: { type: Boolean, default: false }
}

export type TabsMenuItemProps = ExtractPropTypes<typeof tabsMenuItemProps>

export default defineComponent({
  name,

  inheritAttrs: false,

  props: tabsMenuItemProps,

  emits: ['open', 'opened', 'close', 'closed', 'change', 'update:modelValue'],

  setup(props, { emit, slots, attrs }) {
    const state = reactive({
      showPopup: false,
      transition: true,
      showWrapper: false
    })

    const { parent, index } = useParent(TABSMENU_KEY)

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Ryxon] <TabsMenuItem> must be a child component of <TabsMenuMenu>.'
        )
      }
      return
    }

    const getEmitter = (name: 'open' | 'close' | 'opened') => () => emit(name)
    const onOpen = getEmitter('open')
    const onClose = getEmitter('close')
    const onOpened = getEmitter('opened')

    const onClosed = () => {
      state.showWrapper = false
      emit('closed')
    }

    const onClickWrapper = (event: MouseEvent) => {
      // 防止在使用传送时被识别为点击外部和关闭
      if (props.teleport) {
        event.stopPropagation()
      }
    }

    const { createPopperInstance } = usePopper()

    const options = computed(() => {
      return buildPopperOptions({
        placement:
          parent.props.direction === 'down'
            ? 'bottom'
            : ('top' as TabsMenuItemPlacement),
        strategy: props.strategy,
        popperOptions: props.popperOptions,
        offset: props.offset,
        gpuAcceleration: props.gpuAcceleration,
        fallbackPlacements: props.fallbackPlacements
      })
    })

    let popper: Instance | null
    const wrapperRef = ref<HTMLElement>()
    const popoverRef = ref<ComponentInstance>()

    const updateLocation = () => {
      nextTick(() => {
        if (!state.showPopup) {
          return
        }

        if (!popper) {
          popper = createPopperInstance(
            wrapperRef,
            popoverRef.value?.popupRef,
            options.value
          )
          if (inBrowser) {
            window.addEventListener('animationend', updateLocation)
            window.addEventListener('transitionend', updateLocation)
          }
        } else {
          popper.setOptions(options.value)
        }
      })
    }

    const toggle = (
      wrapper?: HTMLElement,
      show = !state.showPopup,
      options: { immediate?: boolean } = {}
    ) => {
      if (show === state.showPopup) {
        return
      }

      state.showPopup = show
      state.transition = !options.immediate

      if (show) {
        // 不是全屏的时候才调用
        if (!parent.props.full) {
          wrapperRef.value = wrapperRef.value || wrapper
          updateLocation()
        }
        parent.updateOffset()
        state.showWrapper = true
      }
    }

    // 父级调用展示标题名称
    const renderTitle = () => {
      if (slots.title) {
        return slots.title()
      }

      if (props.title) {
        return props.title
      }

      const match = props.options.find(
        (option) => option.value === props.modelValue
      )

      return match ? match.text : ''
    }

    // 自己调用   展示子集中菜单
    const renderOption = (option: TabsMenuItemOption) => {
      const { activeColor } = parent.props
      const active = option.value === props.modelValue

      const onClick = () => {
        parent.updateActive(index.value) // 激活父级的展示

        state.showPopup = false

        if (option.value !== props.modelValue) {
          emit('update:modelValue', option.value)
          emit('change', option.value)
        }
      }

      const renderIcon = () => {
        if (active) {
          return (
            <Icon class={bem('icon')} color={activeColor}>
              <Check></Check>
            </Icon>
          )
        }
      }

      return (
        <Cell
          v-slots={{ value: renderIcon }}
          role="menuitem"
          key={option.value}
          icon={option.icon}
          title={option.text}
          class={bem('option', { active })}
          style={{ color: active ? activeColor : '' }}
          tabindex={active ? 0 : -1}
          clickable
          onClick={onClick}
        />
      )
    }

    const renderContent = () => {
      const { offset } = parent
      const {
        full,
        zIndex,
        overlay,
        duration,
        direction,
        showArrow,
        lockScroll,
        closeOnClickOverlay
      } = parent.props

      const style: CSSProperties = getZIndexStyle(zIndex)

      if (direction === 'down') {
        style.top = `${offset.value}px`
      } else {
        style.bottom = `${offset.value}px`
      }

      return (
        <div
          v-show={state.showWrapper}
          style={style}
          class={[
            bem([direction]),
            full ? 'full' : 'dropdown',
            props.contentClass
          ]}
          onClick={onClickWrapper}
          {...attrs}
        >
          <Popup
            v-model:show={state.showPopup}
            ref={popoverRef}
            role="menu"
            class={bem('content')}
            overlay={full ? overlay : false}
            position={direction === 'down' ? 'top' : 'bottom'}
            transition={full ? '' : 'r-popover-zoom'}
            duration={state.transition ? duration : 0}
            lazyRender={props.lazyRender}
            lockScroll={lockScroll}
            overlayStyle={{ position: 'absolute' }}
            aria-labelledby={`${parent.id}-${index.value}`}
            closeOnClickOverlay={closeOnClickOverlay}
            onOpen={onOpen}
            onClose={onClose}
            onOpened={onOpened}
            onClosed={onClosed}
          >
            {showArrow && <div class={bem('arrow')} />}
            <div class={bem('body')}>
              {props.options.map(renderOption)}
              {slots.default?.()}
            </div>
          </Popup>
        </div>
      )
    }

    useExpose({ state, toggle, renderTitle })

    return () => {
      if (props.teleport) {
        return <Teleport to={props.teleport}>{renderContent()}</Teleport>
      }
      return renderContent()
    }
  }
})
