import {
  CircleCloseFilled,
  InfoFilled,
  SuccessFilled,
  WarningFilled
} from '@ryxon/icons'
import { definePropType } from '@ryxon/utils'

import type { Component } from 'vue'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

// 图标
export const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  danger: CircleCloseFilled,
  info: InfoFilled
}

// 解析图标
export const typeComp = (type: string) => {
  if (
    type === 'success' ||
    type === 'warning' ||
    type === 'info' ||
    type === 'danger'
  ) {
    return TypeComponentsMap[type]
  }
  return ''
}
