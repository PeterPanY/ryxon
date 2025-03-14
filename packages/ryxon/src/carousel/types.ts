import type { ComponentPublicInstance } from 'vue'
import type { CarouselProps } from './Carousel'
import type { CarouselContextValue } from './CarouselContext'

export type CarouselTrigger = 'click' | 'hover'
export type CarouselEffect =
  | 'slide'
  | 'slide-alone'
  | 'fade'
  | 'card'
  | 'custom'
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselDotType = 'dot' | 'line'
export type CarouselDotPlacement = 'top' | 'bottom' | 'left' | 'right'
export type CarouselCardType = '3d' | '2d'

export interface CarouselInst {
  getCurrentIndex: () => number
  to: (index: number) => void
  prev: () => void
  next: () => void
  stopAutoplay: () => void
  resetAutoplay: () => void
}

export interface ArrowScopedSlotProps
  extends Pick<
    CarouselContextValue,
    'to' | 'prev' | 'next' | 'isPrevDisabled' | 'isNextDisabled'
  > {
  total: number
  currentIndex: number
}

export interface DotScopedSlotProps extends Pick<CarouselContextValue, 'to'> {
  total: number
  currentIndex: number
}

export interface Size {
  width: number
  height: number
}

export type CarouselInstance = ComponentPublicInstance<
  CarouselProps,
  CarouselInst
>

export type CarouselThemeVars = {
  carouselBezier?: string
  carouselDotColor?: string
  carouselDotColorFocus?: string
  carouselDotColorActive?: string
  carouselDotSize?: string
  carouselDotLineWidth?: string
  carouselDotLineWidthActive?: string
  carouselArrowColor?: string
  carouselArrowSize?: string
  carouselArrowFontSize?: string
  carouselArrowBackground?: string
  carouselArrowHoverBackground?: string
  carouselArrowDisabledColor?: string
}
