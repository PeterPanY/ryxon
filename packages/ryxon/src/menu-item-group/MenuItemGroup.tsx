import { defineComponent, type ExtractPropTypes } from 'vue'

import { createNamespace } from '../utils'

const [, bem] = createNamespace('menu-item-group')

export const menuItemGroupProps = {
  title: String
}

export type MenuItemGroupProps = ExtractPropTypes<typeof menuItemGroupProps>

export default defineComponent({
  name: 'RMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    return () => (
      <li class={bem()}>
        <div class={bem('title')}>
          {slots.title ? slots.title() : props.title}
        </div>
        <ul>{slots.default?.()}</ul>
      </li>
    )
  }
})
