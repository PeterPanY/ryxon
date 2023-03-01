import {
  toRef,
  inject,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  type ExtractPropTypes
} from 'vue'

import { isString, definePropType, createNamespace } from '../utils'
import useMenu from '../menu/use-menu'

import { Tooltip } from '../tooltip'

import type { RouteLocationRaw } from 'vue-router'
import type {
  MenuProvider,
  SubMenuProvider,
  MenuItemRegistered
} from '../menu/types'

const [, nsMenu] = createNamespace('menu')
const [, nsMenuItem, , isBem] = createNamespace('menu-item')

export const menuItemProps = {
  index: {
    type: definePropType<string | null>([String, null]),
    default: null
  },
  route: {
    type: definePropType<RouteLocationRaw>([String, Object])
  },
  disabled: Boolean
}

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && Array.isArray(item.indexPath)
}
export type MenuItemEmits = typeof menuItemEmits

const COMPONENT_NAME = 'RMenuItem'
export default defineComponent({
  name: COMPONENT_NAME,
  props: menuItemProps,
  emits: menuItemEmits,
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance()!
    const rootMenu = inject<MenuProvider>('rootMenu')

    const { parentMenu, indexPath } = useMenu(instance, toRef(props, 'index'))
    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value.uid}`)

    const active = computed(() => props.index === rootMenu.activeIndex)
    const item: MenuItemRegistered = reactive({
      index: props.index,
      indexPath,
      active
    })

    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        })
        emit('click', item)
      }
    }

    onMounted(() => {
      subMenu.addSubMenu(item)
      rootMenu.addMenuItem(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeMenuItem(item)
    })

    const tooltipSlots = {
      content: () => <>{slots.title?.()}</>,
      default: () => (
        <div class={nsMenu('tooltip-trigger')}>{slots.default?.()}</div>
      )
    }

    return () => (
      <li
        class={[
          nsMenuItem(),
          isBem('active', active.value),
          isBem('disabled', props.disabled)
        ]}
        role="menuitem"
        tabindex="-1"
        onClick={handleClick}
      >
        {parentMenu.value.type.name === 'RMenu' &&
        rootMenu.props.collapse &&
        slots.title ? (
          <Tooltip
            effect={rootMenu.props.popperEffect}
            placement="right"
            fallback-placements={['left']}
            persistent
            v-slots={tooltipSlots}
          ></Tooltip>
        ) : (
          <>
            {slots.default?.()}
            {slots.title?.()}
          </>
        )}
      </li>
    )
  }
})
