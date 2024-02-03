import { isArray, isNumber, Arrayable } from '@ryxon/utils'
import type { ComputedRef, InjectionKey, Ref, ToRefs } from 'vue'
import type { SliderProps } from './Slider'

export interface SliderInitData {
  firstValue: number
  secondValue: number
  oldValue?: Arrayable<number>
  dragging: boolean
  sliderSize: number
}

const isValidValue = (value: Arrayable<number>) =>
  isNumber(value) || (isArray(value) && value.every(isNumber))

export const sliderEmits = {
  'update:modelValue': isValidValue,
  input: isValidValue,
  change: isValidValue
}

export type SliderEmits = typeof sliderEmits

export interface SliderContext extends ToRefs<SliderProps> {
  precision: ComputedRef<number>
  sliderSize: Ref<number>
  emitChange: () => void
  resetSize: () => void
  updateDragging: (val: boolean) => void
}

export const sliderContextKey: InjectionKey<SliderContext> =
  Symbol('sliderContextKey')

export type SliderThemeVars = {
  sliderHeight?: string
  sliderMainBgColor?: string
  sliderRunwayBgColor?: string
  sliderRunwayHeight?: string
  sliderStopBgColor?: string
  sliderDisabledColor?: string
  sliderBorderRadius?: string
  sliderButtonSize?: string
  sliderButtonWrapperSize?: string
  sliderButtonWrapperOffset?: string
}
