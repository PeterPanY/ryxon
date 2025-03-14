import {
  ref,
  watch,
  computed,
  reactive,
  nextTick,
  onActivated,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
  type ComponentPublicInstance
} from 'vue'
import { useResizeObserver } from '@vueuse/core'

// Utils
import {
  pick,
  isDef,
  addUnit,
  isHidden,
  unitToPx,
  truthProp,
  capitalize,
  numericProp,
  windowWidth,
  getElementTop,
  makeStringProp,
  callInterceptor,
  makeNumericProp,
  setRootScrollTop,
  type Numeric,
  type Interceptor,
  type ComponentInstance
} from '@ryxon/utils'
import { createNamespace, BORDER_TOP_BOTTOM } from '../utils'
import { scrollLeftTo, scrollTopTo } from '../tabs/utils'
import { EVENT_CODE } from '../constants'

// Composables
import {
  useRect,
  useScrollParent,
  useEventListener,
  onMountedOrActivated
} from '@ryxon/use'
import { useId } from '../composables/use-id'
import { route, RouteProps } from '../composables/use-route'
import { useRefs } from '../composables/use-refs'
import { useExpose } from '../composables/use-expose'
import { onPopupReopen } from '../composables/on-popup-reopen'
import { useVisibilityChange } from '../composables/use-visibility-change'

// Components
import { Sticky } from '../sticky'
import { Icon } from '../icon'
import { Plus, ArrowLeft, ArrowRight } from '@ryxon/icons'
import TabsTitle from '../tabs/TabsTitle'
import TabsContent from '../tabs/TabsContent'
import TabSsr from './TabSsr'

import type { TabsType, TabPosition, TabsScrollable } from '../tabs/types'
import type { TabItem } from './types'

const [name] = createNamespace('tabs-ssr')
const [, bem, , isBem] = createNamespace('tabs')

export const tabsSsrProps = {
  items: {
    type: Array as PropType<TabItem[]>,
    default: () => []
  },
  content: { type: Boolean, default: true },
  active: makeNumericProp(0),
  type: makeStringProp<TabsType>('line'),
  tabPosition: makeStringProp<TabPosition>('top'),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function as PropType<Interceptor>,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String,
  closable: Boolean,
  addable: Boolean,
  editable: Boolean
}

export type TabsSsrProps = ExtractPropTypes<typeof tabsSsrProps>

export default defineComponent({
  name,

  props: tabsSsrProps,

  emits: [
    'change',
    'scroll',
    'rendered',
    'clickTab',
    'update:active',
    'edit',
    'tabAdd',
    'tabRemove'
  ],

  setup(props, { emit, slots }) {
    let tabHeight: number
    let lockScroll: boolean
    let stickyFixed: boolean

    const root = ref<HTMLElement>()
    const navRef = ref<HTMLElement>()
    const wrapRef = ref<HTMLElement>()
    const contentRef = ref<ComponentInstance>()

    const id = useId()
    const scroller = useScrollParent(root)
    const [titleRefs, setTitleRefs] = useRefs<ComponentInstance>()
    const [tabRefs, setTabRefs] = useRefs<ComponentInstance>()

    const children = ref(props.items)
    watch(
      () => props.items,
      (val) => {
        children.value = val
      }
    )

    const state = reactive({
      inited: false,
      position: '',
      lineStyle: {} as CSSProperties,
      currentIndex: -1
    })

    const scrollableTool = ref<false | TabsScrollable>(false)

    // 导航是否可滚动
    const scrollable = computed(
      () =>
        children.value.length > +props.swipeThreshold ||
        !props.ellipsis ||
        props.shrink
    )

    const navStyle = computed(() => ({
      borderColor: props.color,
      background: props.background
    }))

    const getTabName = (tab: TabItem, index: number): Numeric =>
      tab.name ?? index

    const currentName = computed(() => {
      const activeTab = children.value[state.currentIndex]

      if (activeTab) {
        return getTabName(activeTab, state.currentIndex)
      }
    })

    const offsetTopPx = computed(() => unitToPx(props.offsetTop))

    const scrollOffset = computed(() => {
      if (props.sticky) {
        return offsetTopPx.value + tabHeight
      }
      return 0
    })

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(props.tabPosition) ? 'width' : 'height'
    )

    const navOffset = ref(0)

    // 计算真实内容大小
    const navSize = computed(() => {
      const titles = titleRefs.value
      let totalNumber = 0
      for (let index = 0; index < titles.length; index++) {
        // 在动态增减标签页时，存在为null的情况
        const sizeNumber = titles[index]
          ? useRect(titles[index].$el)[sizeName.value]
          : 0

        totalNumber += sizeNumber
      }
      return totalNumber
    })

    // 当前选中项位置偏移
    const currentOffset = computed(() => (index: number) => {
      const nav = navRef.value

      if (nav) {
        const titles = titleRefs.value
        const title = titles[index].$el
        return title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2
      }

      return 0
    })

    // 将活动选项卡滚动到视图中
    const scrollIntoView = (
      immediate?: boolean,
      type?: string,
      clickTo?: number
    ) => {
      const nav = navRef.value
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

    // 更新导航栏样式
    const setLine = () => {
      const shouldAnimate = state.inited

      nextTick(() => {
        const titles = titleRefs.value

        if (
          !titles ||
          !titles[state.currentIndex] ||
          props.type !== 'line' ||
          isHidden(root.value!)
        ) {
          return
        }

        const title = titles[state.currentIndex].$el
        const { lineWidth, lineHeight } = props

        let lineStyle: CSSProperties = {}

        if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
          const left = title.offsetLeft + title.offsetWidth / 2

          lineStyle = {
            width: addUnit(lineWidth),
            backgroundColor: props.color,
            transform: `translateX(${left}px) translateX(-50%)`
          }
        } else {
          const top = title.offsetTop + title.offsetHeight / 2

          lineStyle = {
            width: addUnit(lineHeight),
            backgroundColor: props.color,
            transform: `translateY(${top}px) translateY(-50%)`
          }
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

    const findAvailableTab = (index: number) => {
      const diff = index < state.currentIndex ? -1 : 1

      while (index >= 0 && index < children.value.length) {
        if (!children.value[index].disabled) {
          return index
        }

        index += diff
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

      const newTab = children.value[newIndex]
      const newName = getTabName(newTab, newIndex)
      const shouldEmitChange = state.currentIndex !== null

      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex

        if (!skipScrollIntoView) {
          scrollIntoView()
        }
        setLine()
      }

      if (newName !== props.active) {
        emit('update:active', newName)

        if (shouldEmitChange) {
          emit('change', newName, newTab.title)
        }
      }

      // 滚动到正确位置
      if (stickyFixed && !props.scrollspy) {
        setRootScrollTop(
          Math.ceil(getElementTop(root.value!) - offsetTopPx.value)
        )
      }
    }

    // 更正活动选项卡的索引
    const setCurrentIndexByName = (
      name: Numeric,
      skipScrollIntoView?: boolean
    ) => {
      const matched = children.value.find(
        (tab, index) => getTabName(tab, index) === name
      )

      const index = matched ? children.value.indexOf(matched) : 0
      setCurrentIndex(index, skipScrollIntoView)
    }

    // 滚动导航  滚动内容
    const scrollToCurrentContent = (immediate = false) => {
      if (props.scrollspy) {
        const target = tabRefs.value[state.currentIndex].$el

        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value

          lockScroll = true
          scrollTopTo(
            scroller.value,
            to,
            immediate ? 0 : +props.duration,
            () => {
              lockScroll = false
            }
          )
        }
      }
    }

    // 单击时发出事件
    const onClickTab = (item: TabItem, index: number, event: MouseEvent) => {
      const { title, disabled } = children.value[index]
      const name = getTabName(children.value[index], index)

      if (!disabled) {
        callInterceptor(props.beforeChange, {
          args: [name],
          done: () => {
            setCurrentIndex(index)
            // 针对scrollspy 滚动导航有效
            scrollToCurrentContent()
          }
        })

        route(item as unknown as ComponentPublicInstance<RouteProps>)
      }

      emit('clickTab', {
        name,
        title,
        event,
        disabled
      })
    }

    const onStickyScroll = (params: {
      isFixed: boolean
      scrollTop: number
    }) => {
      stickyFixed = params.isFixed
      emit('scroll', params)
    }

    const scrollTo = (name: Numeric) => {
      nextTick(() => {
        setCurrentIndexByName(name)
        scrollToCurrentContent(true)
      })
    }

    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.value.length; index++) {
        const { top } = useRect(tabRefs.value[index].$el)

        if (top > scrollOffset.value) {
          return index === 0 ? 0 : index - 1
        }
      }

      return children.value.length - 1
    }

    const onScroll = () => {
      if (props.scrollspy && !lockScroll) {
        const index = getCurrentIndexOnScroll()
        setCurrentIndex(index)
      }
    }

    // 点击 tab 移除按钮时触发
    const handleTabRemove = (item: any, index: number, ev: Event) => {
      if (item.disable) return

      ev.stopPropagation()
      const name = item.name || index
      emit('edit', name, 'remove')
      emit('tabRemove', name)
    }

    const renderNav = () =>
      children.value.map((item, index) => (
        <TabsTitle
          key={item.id}
          v-slots={
            slots.title
              ? {
                  title: () =>
                    slots.title?.({
                      item,
                      index,
                      active: currentName.value
                    })
                }
              : null
          }
          id={`${id}-${index}`}
          ref={setTitleRefs(index)}
          type={props.type}
          color={props.color}
          style={item.titleStyle}
          class={item.titleClass}
          shrink={props.shrink}
          isActive={index === state.currentIndex}
          controls={item.id}
          scrollable={scrollable.value}
          activeColor={props.titleActiveColor}
          inactiveColor={props.titleInactiveColor}
          tabPosition={props.tabPosition}
          parentClosable={props.closable}
          parentEditable={props.editable}
          onClick={(event: MouseEvent) => onClickTab(item, index, event)}
          onTabRemove={(ev) => handleTabRemove(item, index, ev)}
          {...pick(item, [
            'dot',
            'badge',
            'title',
            'disabled',
            'closable',
            'showZeroBadge'
          ])}
        />
      ))

    const barRef = ref<HTMLDivElement>()

    useResizeObserver(barRef, () => setLine())

    const renderLine = () => {
      if (props.type === 'line' && children.value.length) {
        return <div ref={barRef} class={bem('line')} style={state.lineStyle} />
      }
    }

    // 上一页滚动
    const scrollPrev = () => {
      if (!navRef.value || (scrollableTool.value && scrollableTool.value.prev))
        return

      const nav = navRef.value
      const containerSize = nav[`offset${capitalize(sizeName.value)}`]
      const startOffset = currentOffset.value(0)

      const newOffset =
        navOffset.value - containerSize > startOffset
          ? navOffset.value - containerSize
          : startOffset

      scrollIntoView(false, 'hand', newOffset)
    }

    // 下一页滚动
    const scrollNext = () => {
      if (!navRef.value || (scrollableTool.value && scrollableTool.value.next))
        return
      const nav = navRef.value
      const containerSize = nav[`offset${capitalize(sizeName.value)}`]
      const { length } = titleRefs.value
      const endOffset = currentOffset.value(length - 1)

      const newOffset =
        containerSize + navOffset.value < endOffset
          ? containerSize + navOffset.value
          : endOffset

      scrollIntoView(false, 'hand', newOffset)
    }

    // 点击 tab 新增按钮时触发
    const handleTabAdd = () => {
      emit('edit', undefined, 'add')
      emit('tabAdd')
    }

    const renderHeader = () => {
      const { type, border, sticky } = props

      const Header = [
        <>
          {props.editable || props.addable ? (
            <span
              class={bem('new-tab')}
              tabindex="0"
              onClick={handleTabAdd}
              onKeydown={(ev: KeyboardEvent) => {
                if (ev.code === EVENT_CODE.enter) handleTabAdd()
              }}
            >
              <Icon class={isBem('icon-plus')}>
                <Plus />
              </Icon>
            </span>
          ) : null}
        </>,
        <div
          ref={sticky ? undefined : wrapRef}
          class={[
            bem('wrap'),
            { [BORDER_TOP_BOTTOM]: type === 'line' && border },
            isBem(props.tabPosition)
          ]}
        >
          {scrollableTool.value ? (
            <span
              class={[
                bem('nav-prev'),
                isBem('disabled', scrollableTool.value.prev)
              ]}
              onClick={scrollPrev}
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
              onClick={scrollNext}
            >
              <Icon>
                <ArrowRight />
              </Icon>
            </span>
          ) : null}
          <div
            ref={navRef}
            role="tablist"
            class={bem('nav', [
              type,
              {
                shrink: props.shrink,
                complete: scrollable.value,
                tool: scrollableTool.value
              }
            ])}
            style={navStyle.value}
            aria-orientation="horizontal"
          >
            {slots['nav-left']?.()}
            {renderNav()}
            {renderLine()}
            {slots['nav-right']?.()}
          </div>
        </div>,
        slots['nav-bottom']?.()
      ]

      if (sticky) {
        return <div ref={wrapRef}>{Header}</div>
      }
      return Header
    }

    const resize = () => {
      setLine()

      nextTick(() => {
        scrollIntoView(true)
        contentRef.value?.swipeRef.value?.resize()
      })
    }

    watch(
      () => [props.color, props.duration, props.lineWidth, props.lineHeight],
      setLine
    )
    watch(windowWidth, resize)

    watch(
      () => props.active,
      (value) => {
        if (value !== currentName.value) {
          setCurrentIndexByName(value)
        }
      }
    )

    watch(
      () => children.value.length,
      () => {
        if (state.inited) {
          setCurrentIndexByName(props.active)
          setLine()
          nextTick(() => {
            scrollIntoView(true)
          })
        }
      }
    )

    const init = () => {
      setCurrentIndexByName(props.active, true)
      nextTick(() => {
        state.inited = true
        if (wrapRef.value) {
          tabHeight = useRect(wrapRef.value).height
        }
        scrollIntoView(true)
      })
    }

    const onRendered = (name: Numeric, title?: string) =>
      emit('rendered', name, title)

    useExpose({
      resize,
      scrollTo
    })

    onActivated(setLine)
    onPopupReopen(setLine)
    onMountedOrActivated(init)
    useVisibilityChange(root, setLine)
    useEventListener('scroll', onScroll, {
      target: scroller,
      passive: true
    })

    const header = () => (
      <div class={[bem('header'), isBem(props.tabPosition)]}>
        {props.sticky ? (
          <Sticky
            container={root.value}
            offsetTop={offsetTopPx.value}
            onScroll={onStickyScroll}
          >
            {renderHeader()}
          </Sticky>
        ) : (
          renderHeader()
        )}
      </div>
    )

    const panels = () =>
      props.content && (
        <TabsContent
          ref={contentRef}
          count={children.value.length}
          inited={state.inited}
          animated={props.animated}
          duration={props.duration}
          swipeable={props.swipeable}
          lazyRender={props.lazyRender}
          currentIndex={state.currentIndex}
          onChange={setCurrentIndex}
        >
          {children.value.map((item, index) => (
            <TabSsr
              ref={setTabRefs(index)}
              id={id}
              index={index}
              name={item.name ?? index}
              lazyRender={props.lazyRender}
              currentName={currentName.value}
              animated={props.animated}
              swipeable={props.swipeable}
              scrollspy={props.scrollspy}
              onRendered={() => onRendered(getTabName(item, index), item.title)}
            >
              {item.slot
                ? slots[item.slot]?.({ item, index, active: currentName.value })
                : slots.item
                  ? slots.item({ item, index, active: currentName.value })
                  : item.content}
            </TabSsr>
          ))}
        </TabsContent>
      )

    return () => (
      <div ref={root} class={bem([props.type, props.tabPosition])}>
        {...props.tabPosition !== 'bottom'
          ? [header(), panels()]
          : [panels(), header()]}
      </div>
    )
  }
})
