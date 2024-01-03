<template>
  <div :class="bem()">
    <div :class="bem('colors')">
      <div
        v-for="(item, index) in rgbaColors"
        :key="colors[index]"
        :class="[
          bem('color-selector'),
          isBem('alpha', item._alpha < 100),
          { selected: item.selected }
        ]"
        @click="handleSelect(index)"
      >
        <div :style="{ backgroundColor: item.value }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  watch,
  inject,
  watchEffect,
  defineComponent,
  type Ref,
  type PropType
} from 'vue'
import { createNamespace } from '../../utils'
import { colorPickerContextKey } from '../props'
import Color from '../utils/color'

export default defineComponent({
  props: {
    colors: {
      type: Array as PropType<string[]>,
      required: true
    },
    color: {
      type: Object as PropType<Color>,
      required: true
    }
  },
  setup(props) {
    const [, bem, , isBem] = createNamespace('color-predefine')
    const { currentColor } = inject(colorPickerContextKey)!

    function parseColors(colors: string[], color: Color) {
      return colors.map((value) => {
        const c = new Color()
        c.enableAlpha = true
        c.format = 'rgba'
        c.fromString(value)
        c.selected = c.value === color.value
        return c
      })
    }

    const rgbaColors = ref(parseColors(props.colors, props.color)) as Ref<
      Color[]
    >

    watch(
      () => currentColor.value,
      (val) => {
        const color = new Color()
        color.fromString(val)

        rgbaColors.value.forEach((item) => {
          item.selected = color.compare(item)
        })
      }
    )

    watchEffect(() => {
      rgbaColors.value = parseColors(props.colors, props.color)
    })

    function handleSelect(index: number) {
      props.color.fromString(props.colors[index])
    }

    return {
      bem,
      isBem,
      rgbaColors,
      handleSelect
    }
  }
})
</script>
