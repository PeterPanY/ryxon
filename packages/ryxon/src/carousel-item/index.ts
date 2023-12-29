import { withInstall } from '@ryxon/utils'
import _CarouselItem from './CarouselItem'

export const CarouselItem = withInstall(_CarouselItem)
export default CarouselItem

declare module 'vue' {
  export interface GlobalComponents {
    CarouselItem: typeof CarouselItem
  }
}
