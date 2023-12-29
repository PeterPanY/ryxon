import { ref, watch, onMounted, defineComponent } from 'vue'
import { flatten, numericProp, makeRequiredProp } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { Carousel, CarouselInstance } from '../carousel'
import { useExpose } from '../composables/use-expose'

const [name, bem] = createNamespace('tabs')

export default defineComponent({
  name,

  props: {
    count: makeRequiredProp(Number),
    inited: Boolean,
    animated: Boolean,
    duration: makeRequiredProp(numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: makeRequiredProp(Number)
  },

  emits: ['change'],

  setup(props, { emit, slots }) {
    const swipeRef = ref<CarouselInstance>()

    const onChange = (index: number) => emit('change', index)

    const renderChildren = () => {
      const Content = slots.default?.()

      const children = (slots.default && flatten(slots.default())) || []

      if (props.animated || props.swipeable) {
        return (
          <Carousel
            ref={swipeRef}
            loop={false}
            class={bem('track')}
            transitionStyle={{
              transitionDuration: +props.duration + 's'
            }}
            draggable={props.swipeable}
            showDots={false}
            onChange={onChange}
          >
            {children.map((item) => item)}
          </Carousel>
        )
      }

      return Content
    }

    const swipeToCurrentTab = (index: number) => {
      const swipe = swipeRef.value
      swipe?.to(index)
    }

    watch(() => props.currentIndex, swipeToCurrentTab)

    onMounted(() => {
      swipeToCurrentTab(props.currentIndex)
    })

    useExpose({ swipeRef })

    return () => (
      <div
        class={bem('content', {
          animated: props.animated || props.swipeable
        })}
      >
        {renderChildren()}
      </div>
    )
  }
})
