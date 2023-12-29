import { createModelToggleComposable } from '../composables/use-model-toggle'
import { unref } from 'vue'
import { Arrayable } from '@ryxon/utils'
import type { Ref } from 'vue'
import type { TooltipTrigger } from './types'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable('visible' as const)

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close'
]

export const isTriggerType = (
  trigger: Arrayable<TooltipTrigger>,
  type: TooltipTrigger
) => {
  if (Array.isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}

export const whenTrigger =
  (
    trigger: Ref<Arrayable<TooltipTrigger>>,
    type: TooltipTrigger,
    handler: (e: Event) => void
  ) =>
  (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
