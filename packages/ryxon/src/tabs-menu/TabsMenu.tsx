import {
  ref,
  computed,
  defineComponent,
  type InjectionKey,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  isDef,
  truthProp,
  numericProp,
  windowHeight,
  makeStringProp,
  makeNumericProp,
  createNamespace,
  HAPTICS_FEEDBACK,
  type ComponentInstance
} from '../utils'

import { Icon } from '../icon'
import { ArrowDown } from '@ryxon/icons'

// Composables
import { useId } from '../composables/use-id'
import { useExpose } from '../composables/use-expose'
import {
  useRect,
  useChildren,
  useClickAway,
  useScrollParent,
  useEventListener
} from '@ryxon/use'

// Types
import type {
  TabsMenuProvide,
  TabsMenuDirection,
  TabsMenuTrigger
} from './types'

const [name, bem] = createNamespace('tabs-menu')

export const tabsMenuProps = {
  overlay: truthProp,
  zIndex: numericProp,
  duration: makeNumericProp(0.2),
  direction: makeStringProp<TabsMenuDirection>('down'),
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp,
  trigger: makeStringProp<TabsMenuTrigger>('click'),
  isFull: Boolean, // 下拉框是否全屏展示
  showArrow: truthProp, // 下拉模式下是否显示箭头
  lockScroll: Boolean // 是否锁定
}

export type TabsMenuProps = ExtractPropTypes<typeof tabsMenuProps>

export const TABSMENU_KEY: InjectionKey<TabsMenuProvide> = Symbol(name)

export default defineComponent({
  name,

  props: tabsMenuProps,

  emits: ['select'],

  setup(props, { slots, emit }) {
    const id = useId()
    const root = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const offset = ref(0)

    const { children, linkChildren } = useChildren(TABSMENU_KEY)
    const scrollParent = useScrollParent(root)

    const opened = computed(() =>
      children.some((item) => item.state.showWrapper)
    )

    const barStyle = computed<CSSProperties | undefined>(() => {
      if (opened.value && isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        }
      }
    })

    const boxRefs = ref<HTMLElement[]>([]) // 申明数组vue
    const setBoxRef = (el: any) => {
      if (el) boxRefs.value.push(el)
    }

    const close = () => {
      children.forEach((item, index) => {
        item.toggle(boxRefs.value[index], false)
      })
    }

    const onClickAway = () => {
      if (props.closeOnClickOutside) {
        close()
      }
    }

    const updateOffset = () => {
      if (barRef.value) {
        const rect = useRect(barRef)
        if (props.direction === 'down') {
          offset.value = rect.bottom
        } else {
          offset.value = windowHeight.value - rect.top
        }
      }
    }

    const onScroll = () => {
      if (opened.value) {
        updateOffset()
      }
    }

    const toggleItem = (active: number) => {
      children.forEach((item, index) => {
        if (index === active) {
          item.toggle(boxRefs.value[active])
        } else if (item.state.showPopup) {
          item.toggle(boxRefs.value[active], false, { immediate: true })
        }
      })
    }

    const mentShow = (item: ComponentInstance, index: number) => {
      if (!item.disabled) {
        if (children[index].options.length !== 1) {
          toggleItem(index)
        }
      }
    }

    const onClick = (item: ComponentInstance, index: number) => {
      emit('select', index, item)

      if (props.trigger === 'click') {
        mentShow(item, index)
      }
    }

    const onMouseenter = (item: ComponentInstance, index: number) => {
      if (props.trigger === 'hover') {
        mentShow(item, index)
      }
    }

    const onMouseleave = () => {
      if (props.trigger === 'hover') {
        setTimeout(() => {
          close()
        }, 200)
      }
    }

    const renderTitle = (item: ComponentInstance, index: number) => {
      const { showPopup } = item.state
      const { disabled, titleClass } = item

      return (
        <div
          id={`${id}-${index}`}
          ref={setBoxRef}
          role="button"
          tabindex={disabled ? undefined : 0}
          class={[bem('item', { disabled }), { [HAPTICS_FEEDBACK]: !disabled }]}
          onClick={() => onClick(item, index)}
          onMouseenter={() => onMouseenter(item, index)}
          onMouseleave={onMouseleave}
        >
          <span
            class={[
              bem('title', {
                down: showPopup === (props.direction === 'down'),
                active: showPopup
              }),
              titleClass
            ]}
            style={{ color: showPopup ? props.activeColor : '' }}
          >
            <div class="r-ellipsis">
              {item.renderTitle()}{' '}
              {item.options.length > 1 && (
                <Icon>
                  <ArrowDown />
                </Icon>
              )}
            </div>
          </span>
        </div>
      )
    }

    useExpose({ close })
    linkChildren({ id, props, offset, updateOffset, boxRefs })
    useClickAway(root, onClickAway)
    useEventListener('scroll', onScroll, {
      target: scrollParent,
      passive: true
    })

    return () => (
      <div ref={root} class={bem()}>
        <div
          ref={barRef}
          style={barStyle.value}
          class={bem('bar', { opened: opened.value })}
        >
          {children.map(renderTitle)}
        </div>
        {slots.default?.()}
      </div>
    )
  }
})
