import {
  CircleCloseFilled,
  InfoFilled,
  SuccessFilled,
  WarningFilled
} from '@ryxon/icons'

import type { PropType, Component } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

export const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  danger: CircleCloseFilled,
  info: InfoFilled
}
