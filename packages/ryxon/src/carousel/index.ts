import { withInstall } from '@ryxon/utils'
import _Carousel from './Carousel'

export const Carousel = withInstall(_Carousel)
export default Carousel

export { carouselProps } from './Carousel'
export type { CarouselProps } from './Carousel'
export type {
  CarouselEffect,
  CarouselInstance,
  CarouselThemeVars
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RCarousel: typeof Carousel
  }
}
