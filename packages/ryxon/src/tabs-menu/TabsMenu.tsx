// @ts-nocheck
import {
  ref,
  watch,
  reactive,
  computed,
  nextTick,
  onActivated,
  defineComponent,
  type InjectionKey,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  isDef,
  addUnit,
  isHidden,
  truthProp,
  capitalize,
  windowWidth,
  numericProp,
  windowHeight,
  scrollLeftTo,
  makeNumberProp,
  makeStringProp,
  makeNumericProp,
  createNamespace,
  HAPTICS_FEEDBACK,
  type ComponentInstance
} from '../utils'
import { useResizeObserver } from '@vueuse/core'

import { Icon } from '../icon'
import { ArrowDown, ArrowLeft, ArrowRight } from '@ryxon/icons'

// Composables
import { useId } from '../composables/use-id'
import { useRefs } from '../composables/use-refs'
import { useExpose } from '../composables/use-expose'
import { onPopupReopen } from '../composables/on-popup-reopen'

import {
  useRect,
  useChildren,
  useClickAway,
  useScrollParent,
  useEventListener,
  onMountedOrActivated
} from '@ryxon/use'

// Types
import type {
  TabsMenuType,
  TabsMenuProvide,
  TabsMenuDirection,
  TabsMenuScrollable,
  TabsMenuTrigger
} from './types'

const [name, bem, , isBem] = createNamespace('tabs-menu')

export const tabsMenuProps = {
  modelValue: makeNumberProp(0),
  overlay: truthProp,
  zIndex: numericProp,
  ellipsis: truthProp,
  swipeThreshold: makeNumericProp(5),
  shrink: Boolean,
  duration: makeNumericProp(0.2),
  direction: makeStringProp<TabsMenuDirection>('down'),
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp,
  trigger: makeStringProp<TabsMenuTrigger>('click'),
  full: Boolean, // 下拉框是否全屏展示
  showArrow: truthProp, // 下拉模式下是否显示箭头
  lockScroll: Boolean, // 是否锁定
  subSelect: Boolean, // 父级菜单能否点击
  multiple: Boolean,
  type: makeStringProp<TabsMenuType>('line'),
  lineWidth: numericProp,
  lineHeight: numericProp
}

export type TabsMenuProps = ExtractPropTypes<typeof tabsMenuProps>

export const TABSMENU_KEY: InjectionKey<TabsMenuProvide> = Symbol(name)

export default defineComponent({
  name,

  props: tabsMenuProps,

  emits: ['select', 'update:modelValue'],

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

    // 导航是否可滚动
    const scrollable = computed(
      () =>
        children.length > +props.swipeThreshold ||
        !props.ellipsis ||
        props.shrink
    )

    const [titleRefs, setTitleRefs] = useRefs<ComponentInstance>()

    const state = reactive({
      inited: false,
      position: '',
      lineStyle: {} as CSSProperties,
      currentIndex: -1
    })

    const scrollableTool = ref<false | TabsMenuScrollable>(false)

    const navOffset = ref(0)

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(props.direction === 'down' ? 'bottom' : 'top')
        ? 'width'
        : 'height'
    )

    // 当前选中项位置偏移
    const currentOffset = computed(() => (index: number) => {
      const nav = barRef.value

      if (nav) {
        const titles = titleRefs.value
        const title = titles[index]
        return title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2
      }

      return 0
    })

    // 计算真实内容大小
    const navSize = computed(() => {
      const titles = titleRefs.value
      let totalNumber = 0
      for (let index = 0; index < titles.length; index++) {
        // 在动态增减标签页时，存在为null的情况
        const sizeNumber = titles[index]
          ? useRect(titles[index])[sizeName.value]
          : 0

        totalNumber += sizeNumber
      }
      return totalNumber
    })

    const scrollIntoView = (
      immediate?: boolean,
      type?: string,
      clickTo?: number
    ) => {
      const nav = barRef.value
      const titles = titleRefs.value

      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return
      }

      // 容器大小
      const containerSize = nav[`offset${capitalize(sizeName.value)}`]

      navOffset.value =
        type === 'hand' ? clickTo || 0 : currentOffset.value(state.currentIndex)

      // 判断是否显示左右箭头
      if (navSize.value > containerSize) {
        scrollableTool.value = scrollableTool.value || { prev: false }

        scrollableTool.value.prev = navOffset.value <= currentOffset.value(0)
        scrollableTool.value.next =
          navOffset.value >= currentOffset.value(titles.length - 1)
      } else {
        scrollableTool.value = false
      }

      scrollLeftTo(nav, navOffset.value, immediate ? 0 : +props.duration)
    }

    // 上一页滚动
    const scrollPrev = () => {
      if (!barRef.value || (scrollableTool.value && scrollableTool.value.prev))
        return

      const nav = barRef.value

      const containerSize = nav[`offset${capitalize(sizeName.value)}`]
      const startOffset = currentOffset.value(0)

      const newOffset =
        navOffset.value - containerSize > startOffset
          ? navOffset.value - containerSize
          : startOffset

      scrollIntoView(false, 'hand', newOffset)
    }

    // 下一页
    const scrollNext = () => {
      if (!barRef.value || (scrollableTool.value && scrollableTool.value.next))
        return
      const nav = barRef.value
      const containerSize = nav[`offset${capitalize(sizeName.value)}`]
      const { length } = titleRefs.value
      const endOffset = currentOffset.value(length - 1)

      const newOffset =
        containerSize + navOffset.value < endOffset
          ? containerSize + navOffset.value
          : endOffset

      scrollIntoView(false, 'hand', newOffset)
    }

    const findAvailableTab = (index: number) => {
      const diff = index < state.currentIndex ? -1 : 1

      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index
        }

        index += diff
      }
    }

    const activeIndex = ref(!props.multiple ? props.modelValue : null) // 当前的激活的index

    const lineRef = ref<HTMLDivElement>()

    // 更新导航栏样式
    const setLine = () => {
      const shouldAnimate = state.inited

      nextTick(() => {
        const titles = titleRefs.value

        if (
          !titles ||
          !titles[activeIndex.value || 0] ||
          props.type !== 'line' ||
          isHidden(root.value!)
        ) {
          return
        }

        const title = titles[activeIndex.value || 0]
        const { lineWidth, lineHeight } = props

        let lineStyle: CSSProperties = {}

        const left = title.offsetLeft + title.offsetWidth / 2

        lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props.activeColor,
          transform: `translateX(${left}px) translateX(-50%)`
        }

        if (shouldAnimate) {
          lineStyle.transitionDuration = `${props.duration}s`
        }

        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight)
          lineStyle.height = height
          lineStyle.borderRadius = height
        }

        state.lineStyle = lineStyle
      })
    }

    const updateActive = (index: number) => {
      if (index !== props.modelValue) {
        activeIndex.value = index
        emit('update:modelValue', index)
        setLine()
      }
    }

    // 设置当前的tab
    const setCurrentIndex = (
      currentIndex: number,
      skipScrollIntoView?: boolean
    ) => {
      const newIndex = findAvailableTab(currentIndex)

      if (!isDef(newIndex)) {
        return
      }

      if (
        newIndex !== props.modelValue &&
        !(!props.subSelect && children[newIndex].options.length > 1)
      ) {
        activeIndex.value = newIndex
        emit('update:modelValue', newIndex)
      }

      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex

        if (!skipScrollIntoView) {
          scrollIntoView()
        }

        setLine()
      }
    }

    watch(
      () => props.modelValue,
      (value) => {
        if (value !== state.currentIndex) {
          setCurrentIndex(value)
        }
      }
    )

    const init = () => {
      setCurrentIndex(props.modelValue, true)

      nextTick(() => {
        scrollIntoView(true)
      })
    }

    onMountedOrActivated(init)

    const close = () => {
      children.forEach((item, index) => {
        item.toggle(titleRefs.value[index], false)
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
          item.toggle(titleRefs.value[active])
        } else if (item.state.showPopup) {
          item.toggle(titleRefs.value[active], false, { immediate: true })
        }
      })
    }

    const mentShow = (item: ComponentInstance, index: number) => {
      if (!item.disabled) {
        setCurrentIndex(index)

        if (children[index].options.length !== 1) {
          // 判断父级菜单是否能点击，能点击就不展示子集菜单
          if (props.subSelect) {
            close()
          } else {
            toggleItem(index)
          }
        } else {
          close()
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
          ref={setTitleRefs(index)}
          role="button"
          tabindex={disabled ? undefined : 0}
          class={[
            bem('item', {
              disabled,
              shrink: props.shrink,
              active: !props.multiple ? activeIndex.value === index : false
            }),
            { [HAPTICS_FEEDBACK]: !disabled }
          ]}
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
            <span>{item.renderTitle()}</span>
            {item.options.length > 1 && (
              <Icon>
                <ArrowDown />
              </Icon>
            )}
          </span>
        </div>
      )
    }

    useResizeObserver(lineRef, () => setLine())
    onActivated(setLine)
    onPopupReopen(setLine)

    const renderLine = () => {
      if (props.type === 'line' && children.length && !props.multiple) {
        return <div ref={lineRef} class={bem('line')} style={state.lineStyle} />
      }
    }

    const resize = () => {
      setLine()

      nextTick(() => {
        scrollIntoView(true)
      })
    }
    watch(windowWidth, resize)
    watch(
      () => [
        props.activeColor,
        props.duration,
        props.lineWidth,
        props.lineHeight
      ],
      setLine
    )

    useExpose({ close, resize })
    linkChildren({ id, props, offset, updateOffset, updateActive })
    useClickAway(root, onClickAway)
    useEventListener('scroll', onScroll, {
      target: scrollParent,
      passive: true
    })

    return () => (
      <div ref={root} class={bem()}>
        {scrollableTool.value ? (
          <span
            class={[
              bem('nav-prev'),
              isBem('disabled', scrollableTool.value.prev)
            ]}
            onClick={() => {
              close()
              scrollPrev()
            }}
          >
            <Icon>
              <ArrowLeft />
            </Icon>
          </span>
        ) : null}

        {scrollableTool.value ? (
          <span
            class={[
              bem('nav-next'),
              isBem('disabled', scrollableTool.value.next)
            ]}
            onClick={() => {
              close()
              scrollNext()
            }}
          >
            <Icon>
              <ArrowRight />
            </Icon>
          </span>
        ) : null}

        <div
          ref={barRef}
          role="tabsMenulist"
          style={barStyle.value}
          class={bem('bar', {
            shrink: props.shrink,
            opened: opened.value,
            tool: scrollableTool.value,
            complete: scrollable.value
          })}
        >
          {children.map(renderTitle)}

          {renderLine()}
        </div>
        {slots.default?.()}
      </div>
    )
  }
})
