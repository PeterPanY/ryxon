import { defineComponent } from 'vue'
import { useCarouselContext } from './CarouselContext'
import { createNamespace } from '../utils'
import { Icon } from '../icon'
import { ArrowLeft, ArrowRight } from '@ryxon/icons'

const [, bem] = createNamespace('carousel')
const [name] = createNamespace('carousel-item')

export default defineComponent({
  name,
  setup() {
    const { isVertical, isPrevDisabled, isNextDisabled, prev, next } =
      useCarouselContext()

    return {
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    }
  },
  render() {
    return (
      <div class={bem('arrow-group')}>
        <div
          class={bem('arrow', {
            disabled: this.isPrevDisabled()
          })}
          role="button"
          onClick={this.prev}
        >
          <Icon>
            <ArrowLeft></ArrowLeft>
          </Icon>
        </div>
        <div
          class={bem('arrow', {
            disabled: this.isNextDisabled()
          })}
          role="button"
          onClick={this.next}
        >
          <Icon>
            <ArrowRight></ArrowRight>
          </Icon>
        </div>
      </div>
    )
  }
})
