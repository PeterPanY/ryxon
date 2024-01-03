<template>
  <div
    ref="button"
    :class="[bem('button-wrapper'), { hover: hovering, dragging }]"
    :style="wrapperStyle"
    :tabindex="disabled ? -1 : 0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown="onKeyDown"
  >
    <r-tooltip
      ref="tooltip"
      :visible="tooltipVisible"
      :placement="placement"
      :fallback-placements="['top', 'bottom', 'right', 'left']"
      :stop-popper-mouse-event="false"
      :popper-class="tooltipClass"
      :disabled="!showTooltip"
      persistent
    >
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
      <slot>
        <div :class="[bem('button'), { hover: hovering, dragging }]" />
      </slot>
    </r-tooltip>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue'
import { Tooltip } from '../tooltip'
import { createNamespace } from '../utils'
import { sliderButtonEmits, sliderButtonProps } from './button-props'
import { useSliderButton } from './composables'
import type { SliderButtonInitData } from './button-props'

export default defineComponent({
  name: 'RSliderButton',
  components: {
    RTooltip: Tooltip
  },
  props: sliderButtonProps,
  emits: sliderButtonEmits,
  setup(props, { emit, expose }) {
    const [, bem] = createNamespace('slider')

    const initData = reactive<SliderButtonInitData>({
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue
    })

    const {
      disabled,
      button,
      tooltip,
      showTooltip,
      tooltipVisible,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition
    } = useSliderButton(props, initData, emit)

    const { hovering, dragging } = toRefs(initData)

    expose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging
    })

    return {
      bem,
      button,
      tooltip,
      hovering,
      dragging,
      disabled,
      wrapperStyle,
      tooltipVisible,
      showTooltip,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown
    }
  }
})
</script>
