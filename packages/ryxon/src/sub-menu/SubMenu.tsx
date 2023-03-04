// @ts-nocheck
import {
  h,
  ref,
  vShow,
  watch,
  inject,
  provide,
  reactive,
  Fragment,
  computed,
  onMounted,
  withDirectives,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  type CSSProperties,
  type ExtractPropTypes,
  type VNodeArrayChildren
} from 'vue'

import { isString, iconPropType, createNamespace } from '../utils'
import { useTimeoutFn } from '@vueuse/core'
import useMenu from '../menu/use-menu'
import { useMenuCssVar } from '../menu/use-menu-css-var'

import { CollapseTransition } from '../collapse-transition'
import { Tooltip } from '../tooltip'
import { Icon } from '../icon'
import { ArrowDown, ArrowRight } from '@ryxon/icons'

import type { MenuProvider, SubMenuProvider } from '../menu/types'

const [, nsMenu] = createNamespace('menu')
const [, nsSubMenu, , isBem] = createNamespace('sub-menu')

export const subMenuProps = {
  index: { type: String, required: true },
  showTimeout: { type: Number, default: 300 },
  hideTimeout: { type: Number, default: 300 },
  popperClass: String,
  disabled: Boolean,
  popperAppendToBody: { type: Boolean, default: undefined },
  popperOffset: { type: Array, default: [6, 0] },
  expandCloseIcon: { type: iconPropType },
  expandOpenIcon: { type: iconPropType },
  collapseCloseIcon: { type: iconPropType },
  collapseOpenIcon: { type: iconPropType }
}

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>

export default defineComponent({
  name: 'RSubMenu',
  props: subMenuProps,
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance()!
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => props.index)
    )

    const rootMenu = inject<MenuProvider>('rootMenu')
    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value!.uid}`)

    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    let timeout: (() => void) | undefined
    const mouseInChild = ref(false)
    const verticalTitleRef = ref<HTMLDivElement>()
    const vPopper = ref<InstanceType<typeof Tooltip> | null>(null)

    // computed
    const isFirstLevel = computed(() => subMenu.level === 0)
    const mode = computed(() => rootMenu.props.mode)
    const opened = computed(() => rootMenu.openedMenus.includes(props.index))

    const currentPlacement = computed(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? 'bottom-start'
        : 'right-start'
    )
    const subMenuTitleIcon = computed(() =>
      (mode.value === 'horizontal' && isFirstLevel.value) ||
      (mode.value === 'vertical' && !rootMenu.props.collapse)
        ? props.expandCloseIcon && props.expandOpenIcon
          ? opened.value
            ? props.expandOpenIcon
            : props.expandCloseIcon
          : ArrowDown
        : props.collapseCloseIcon && props.collapseOpenIcon
        ? opened.value
          ? props.collapseOpenIcon
          : props.collapseCloseIcon
        : ArrowRight
    )

    const appendToBody = computed(() =>
      props.popperAppendToBody === undefined
        ? isFirstLevel.value
        : Boolean(props.popperAppendToBody)
    )
    const menuTransitionName = computed(() =>
      rootMenu.props.collapse ? `r-zoom-in-left` : `r-zoom-in-top`
    )
    const fallbackPlacements = computed(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? [
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end',
            'right-start',
            'left-start'
          ]
        : [
            'right-start',
            'left-start',
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end'
          ]
    )
    const active = computed(() => {
      let isActive = false

      // sub-menu可以点击跳转
      if (rootMenu.props.isSubSelect && props.index === rootMenu.activeIndex) {
        return true
      }

      Object.values(items.value).forEach((item) => {
        if (item.active) {
          isActive = true
        }
      })

      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active) {
          isActive = true
        }
      })

      return isActive
    })

    const backgroundColor = computed(() => rootMenu.props.backgroundColor || '')
    const activeTextColor = computed(() => rootMenu.props.activeTextColor || '')
    const textColor = computed(() => rootMenu.props.textColor || '')

    const item = reactive({
      index: props.index,
      indexPath,
      active
    })

    const titleStyle = computed<CSSProperties>(() => {
      if (mode.value !== 'horizontal') {
        return {
          color: textColor.value
        }
      }
      return {
        borderBottomColor: active.value
          ? rootMenu.props.activeTextColor
            ? activeTextColor.value
            : ''
          : 'transparent',
        color: active.value ? activeTextColor.value : textColor.value
      }
    })

    // methods
    const doDestroy = () =>
      vPopper.value?.popperRef?.popperInstanceRef?.destroy()

    const handleCollapseToggle = (value: boolean) => {
      if (!value) {
        doDestroy()
      }
    }

    const handleClick = () => {
      // sub-menu可以点击跳转
      if (rootMenu.props.isSubSelect) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        })
      }

      if (
        (rootMenu.props.menuTrigger === 'hover' &&
          rootMenu.props.mode === 'horizontal') ||
        (rootMenu.props.collapse && rootMenu.props.mode === 'vertical') ||
        props.disabled
      )
        return

      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      })
    }

    const handleMouseenter = (
      event: MouseEvent | FocusEvent,
      showTimeout = props.showTimeout
    ) => {
      if (event.type === 'focus') {
        return
      }
      if (
        (rootMenu.props.menuTrigger === 'click' &&
          rootMenu.props.mode === 'horizontal') ||
        (!rootMenu.props.collapse && rootMenu.props.mode === 'vertical') ||
        props.disabled
      ) {
        return
      }
      subMenu.mouseInChild.value = true

      timeout?.()
      ;({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value)
      }, showTimeout))

      if (appendToBody.value) {
        parentMenu.value.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'))
      }
    }

    const handleMouseleave = (deepDispatch = false) => {
      if (
        (rootMenu.props.menuTrigger === 'click' &&
          rootMenu.props.mode === 'horizontal') ||
        (!rootMenu.props.collapse && rootMenu.props.mode === 'vertical')
      ) {
        return
      }
      timeout?.()
      subMenu.mouseInChild.value = false
      ;({ stop: timeout } = useTimeoutFn(
        () =>
          !mouseInChild.value &&
          rootMenu.closeMenu(props.index, indexPath.value),
        props.hideTimeout
      ))

      if (appendToBody.value && deepDispatch) {
        if (instance.parent?.type.name === 'ElSubMenu') {
          subMenu.handleMouseleave?.(true)
        }
      }
    }

    watch(
      () => rootMenu.props.collapse,
      (value) => handleCollapseToggle(Boolean(value))
    )

    // provide
    {
      const addSubMenu: SubMenuProvider['addSubMenu'] = (item) => {
        subMenus.value[item.index] = item
      }
      const removeSubMenu: SubMenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.value[item.index]
      }
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      })
    }

    // expose
    expose({
      opened
    })

    // lifecycle
    onMounted(() => {
      rootMenu.addSubMenu(item)
      subMenu.addSubMenu(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeSubMenu(item)
    })

    return () => {
      const titleTag: VNodeArrayChildren = [
        slots.title?.(),
        h(
          Icon,
          {
            class: nsSubMenu('icon-arrow'),
            style: {
              transform: opened.value
                ? (props.expandCloseIcon && props.expandOpenIcon) ||
                  (props.collapseCloseIcon &&
                    props.collapseOpenIcon &&
                    rootMenu.props.collapse)
                  ? 'none'
                  : 'rotateZ(180deg)'
                : 'none'
            }
          },
          {
            default: () =>
              isString(subMenuTitleIcon.value)
                ? h(instance.appContext.components[subMenuTitleIcon.value])
                : h(subMenuTitleIcon.value)
          }
        )
      ]

      const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1)

      // this render function is only used for bypass `Vue`'s compiler caused patching issue.
      // temporarily mark ElPopper as any due to type inconsistency.
      const child = rootMenu.isMenuPopup
        ? h(
            // TODO: correct popper's type.
            Tooltip as any,
            {
              ref: vPopper,
              visible: opened.value,
              theme: 'light',
              pure: true,
              offset: props.popperOffset,
              showArrow: false,
              persistent: true,
              popperClass: props.popperClass,
              placement: currentPlacement.value,
              teleported: appendToBody.value,
              fallbackPlacements: fallbackPlacements.value,
              transition: menuTransitionName.value,
              gpuAcceleration: false,
              lazyRender: false,
              class: nsMenu('tooltip')
            },
            {
              content: () =>
                h(
                  'div',
                  {
                    class: [
                      nsMenu(mode.value),
                      nsMenu('popup-container'),
                      props.popperClass
                    ],
                    onMouseenter: (evt: MouseEvent) =>
                      handleMouseenter(evt, 100),
                    onMouseleave: () => handleMouseleave(true),
                    onFocus: (evt: FocusEvent) => handleMouseenter(evt, 100)
                  },
                  [
                    h(
                      'ul',
                      {
                        class: [
                          nsMenu(),
                          nsMenu('popup'),
                          nsMenu(`popup-${currentPlacement.value}`)
                        ],
                        style: ulStyle.value
                      },
                      [slots.default?.()]
                    )
                  ]
                ),
              default: () =>
                h(
                  'div',
                  {
                    class: nsSubMenu('title'),
                    style: [
                      titleStyle.value,
                      { backgroundColor: backgroundColor.value }
                    ],
                    onClick: handleClick
                  },
                  titleTag
                )
            }
          )
        : h(Fragment, {}, [
            h(
              'div',
              {
                class: nsSubMenu('title'),
                style: [
                  titleStyle.value,
                  { backgroundColor: backgroundColor.value }
                ],
                ref: verticalTitleRef,
                onClick: handleClick
              },
              titleTag
            ),
            h(
              CollapseTransition,
              {},
              {
                default: () =>
                  withDirectives(
                    h(
                      'ul',
                      {
                        role: 'menu',
                        class: [nsMenu(), nsMenu('inline')],
                        style: ulStyle.value
                      },
                      [slots.default?.()]
                    ),
                    [[vShow, opened.value]]
                  )
              }
            )
          ])

      return h(
        'li',
        {
          class: [
            nsSubMenu(),
            isBem('active', active.value),
            isBem('opened', opened.value),
            isBem('disabled', props.disabled)
          ],
          role: 'menuitem',
          ariaHaspopup: true,
          ariaExpanded: opened.value,
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(true),
          onFocus: handleMouseenter
        },
        [child]
      )
    }
  }
})
