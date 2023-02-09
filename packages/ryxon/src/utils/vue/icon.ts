import {
  CircleCloseFilled,
  InfoFilled,
  SuccessFilled,
  WarningFilled
} from '@ryxon/icons'
import { definePropType } from './props'

import type { Component } from 'vue'

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
