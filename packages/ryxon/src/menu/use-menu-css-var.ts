import { computed } from 'vue'
import { cssVarBlock } from '../utils'
import useMenuColor from './use-menu-color'

import type { MenuProps } from './Menu'

export const useMenuCssVar = (props: MenuProps, level: number) =>
  computed(() =>
    cssVarBlock('menu', {
      'text-color': props.textColor || '',
      'hover-text-color': props.textColor || '',
      'bg-color': props.backgroundColor || '',
      'hover-bg-color': useMenuColor(props).value || '',
      'active-color': props.activeTextColor || '',
      level: `${level}`
    })
  )
