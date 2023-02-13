import { ref, defineComponent, type ExtractPropTypes } from 'vue'

import { GAP } from './util'
import { useExpose } from '../composables/use-expose'

import Thumb from './thumb'

export const scrollbarBarProps = {
  always: { type: Boolean, default: true },
  width: String,
  height: String,
  ratioX: { type: Number, default: 1 },
  ratioY: { type: Number, default: 1 }
}

export type ScrollbarBarProps = ExtractPropTypes<typeof scrollbarBarProps>

export default defineComponent({
  name: 'RScrollbar',
  props: scrollbarBarProps,
  setup(props) {
    const moveX = ref(0)
    const moveY = ref(0)

    const handleScroll = (wrap: HTMLDivElement) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP
        const offsetWidth = wrap.offsetWidth - GAP

        moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioY
        moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioX
      }
    }

    useExpose({ handleScroll })

    return () => (
      <>
        <Thumb
          move={moveX.value}
          ratio={props.ratioX}
          size={props.width}
          always={props.always}
        ></Thumb>
        <Thumb
          move={moveY.value}
          ratio={props.ratioY}
          size={props.height}
          vertical
          always={props.always}
        ></Thumb>
      </>
    )
  }
})
