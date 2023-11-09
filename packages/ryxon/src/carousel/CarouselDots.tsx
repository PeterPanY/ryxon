import {
  ref,
  onBeforeUpdate,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'
import { createNamespace } from '../utils'
import { indexMap } from './utils'
import { useCarouselContext } from './CarouselContext'

const carouselDotsProps = {
  total: { type: Number, default: 0 },
  currentIndex: { type: Number, default: 0 },
  dotType: {
    type: String as PropType<'dot' | 'line' | 'never'>,
    default: 'dot'
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  keyboard: Boolean
}

export type CarouselDotsProps = ExtractPropTypes<typeof carouselDotsProps>

const [, bem] = createNamespace('carousel')
const [name] = createNamespace('carousel-dots')

export default defineComponent({
  name,
  props: carouselDotsProps,
  setup(props) {
    const dotElsRef = ref<HTMLElement[]>([])
    const RCarousel = useCarouselContext()

    function focusDot(index: number): void {
      dotElsRef.value[index]?.focus()
    }

    function handleKeyboard(e: KeyboardEvent): void {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return
      }
      const nodeName = document.activeElement?.nodeName.toLowerCase()
      if (nodeName === 'input' || nodeName === 'textarea') {
        return
      }
      const { code: keycode } = e
      const isVerticalNext = keycode === 'PageUp' || keycode === 'ArrowUp'
      const isVerticalPrev = keycode === 'PageDown' || keycode === 'ArrowDown'
      const isHorizontalNext = keycode === 'PageUp' || keycode === 'ArrowRight'
      const isHorizontalPrev = keycode === 'PageDown' || keycode === 'ArrowLeft'
      const vertical = RCarousel.isVertical()
      const wantToNext = vertical ? isVerticalNext : isHorizontalNext
      const wantToPrev = vertical ? isVerticalPrev : isHorizontalPrev
      if (!wantToNext && !wantToPrev) {
        return
      }
      e.preventDefault()
      if (wantToNext && !RCarousel.isNextDisabled()) {
        RCarousel.next()
        focusDot(RCarousel.currentIndexRef.value)
      } else if (wantToPrev && !RCarousel.isPrevDisabled()) {
        RCarousel.prev()
        focusDot(RCarousel.currentIndexRef.value)
      }
    }

    function handleKeydown(e: KeyboardEvent, current: number): void {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          RCarousel.to(current)
          return
      }
      if (props.keyboard) {
        handleKeyboard(e)
      }
    }

    function handleMouseenter(current: number): void {
      if (props.trigger === 'hover') {
        RCarousel.to(current)
      }
    }

    // 指示点点击事件
    function handleClick(current: number): void {
      if (props.trigger === 'click') {
        RCarousel.to(current)
      }
    }

    onBeforeUpdate(() => (dotElsRef.value.length = 0))

    return {
      dotEls: dotElsRef,
      handleKeydown,
      handleMouseenter,
      handleClick
    }
  },
  render() {
    const { dotEls } = this
    return (
      <div class={bem('dots', [this.dotType])} role="tablist">
        {indexMap(this.total, (i) => {
          const selected = i === this.currentIndex
          return (
            <div
              aria-selected={selected}
              ref={(el) => dotEls.push(el as HTMLElement)}
              role="button"
              tabindex="0"
              class={bem('dot', {
                active: selected
              })}
              key={i}
              onClick={() => {
                this.handleClick(i)
              }}
              onMouseenter={() => {
                this.handleMouseenter(i)
              }}
              onKeydown={(e) => {
                this.handleKeydown(e, i)
              }}
            />
          )
        })}
      </div>
    )
  }
})
