import { computed, defineComponent, h } from 'vue'
import { createNamespace, definePropType, isString } from '../utils'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export const sliderMarkerProps = {
  mark: {
    type: definePropType<string | { style: CSSProperties; label: any }>([
      String,
      Object
    ]),
    default: undefined
  }
} as const
export type SliderMarkerProps = ExtractPropTypes<typeof sliderMarkerProps>

export default defineComponent({
  name: 'RSliderMarker',
  props: sliderMarkerProps,
  setup(props) {
    const [, bem] = createNamespace('slider')
    const label = computed(() =>
      isString(props.mark) ? props.mark : props.mark!.label
    )
    const style = computed(() =>
      isString(props.mark) ? undefined : props.mark!.style
    )

    return () =>
      h('div', { class: bem('marks-text'), style: style.value }, label.value)
  }
})
