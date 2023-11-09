// @ts-nocheck
import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

export interface CarouselContextValue {
  loop: boolean
  lazyRender: boolean
  slidesPerView: number | 'auto'
  slidesPerBlocks: number
  currentIndexRef: ComputedRef<number>
  to: (index: number) => void
  prev: () => void
  next: () => void
  isVertical: () => boolean
  isHorizontal: () => boolean
  isPrev: (slideOrIndex: HTMLElement | number) => boolean
  isNext: (slideOrIndex: HTMLElement | number) => boolean
  isActive: (slideOrIndex: HTMLElement | number) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getSlideIndex: (slideOrIndex?: HTMLElement | number) => number
  getSlideStyle: (
    slideOrIndex: HTMLElement | number
  ) => string | Record<string, string | number> | undefined
  addSlide: (slide?: HTMLElement) => void
  removeSlide: (slide?: HTMLElement) => void
  onCarouselItemClick: (index: number, event: MouseEvent) => void
  onSlideResize: () => void
}

const carouselMethodsInjectionKey: InjectionKey<CarouselContextValue> =
  Symbol('r-carousel-methods')

export const provideCarouselContext = (
  contextValue: CarouselContextValue
): void => {
  provide(carouselMethodsInjectionKey, contextValue)
}

export const useCarouselContext = (
  location = 'unknown'
): CarouselContextValue => {
  const CarouselContext = inject(carouselMethodsInjectionKey)
  if (!CarouselContext) {
    console.error(location, `\`${location}\` 必须放在里面 \`r-carousel\`.`)
  }
  return CarouselContext
}
