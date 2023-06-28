<template>
  <div :class="rootKls">
    <div ref="bar" :class="barKls" :style="barStyle" @click="handleClick" />
    <div ref="thumb" :class="thumbKls" :style="thumbStyle" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { alphaSliderProps } from '../props/alpha-slider'
import {
  useAlphaSlider,
  useAlphaSliderDOM
} from '../composables/use-alpha-slider'

export default defineComponent({
  name: 'RColorAlphaSlider',
  props: alphaSliderProps,
  setup(props) {
    const { bar, thumb, handleDrag, handleClick } = useAlphaSlider(props)

    const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } =
      useAlphaSliderDOM(props, {
        bar,
        thumb,
        handleDrag
      })

    return {
      rootKls,
      bar,
      barKls,
      barStyle,
      thumb,
      thumbKls,
      thumbStyle,
      handleClick,
      update
    }
  }
})
</script>

<style scoped></style>
