<template>
  <r-tooltip
    ref="popper"
    :visible="showPicker"
    :show-arrow="false"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :offset="[0, 0]"
    :gpu-acceleration="false"
    :popper-class="[bem('panel'), bem('dropdown'), popperClass]"
    :stop-popper-mouse-event="false"
    theme="light"
    trigger="click"
    transition="z-zoom-in-top"
    persistent
  >
    <template #content>
      <div v-click-outside="hide">
        <div :class="bem('main-wrapper')">
          <hue-slider ref="hue" class="hue-slider" :color="color" vertical />
          <sv-panel ref="svPanel" :color="color" />
        </div>
        <alpha-slider v-if="showAlpha" ref="alpha" :color="color" />
        <predefine
          v-if="predefine"
          ref="predefine"
          :color="color"
          :colors="predefine"
        />

        <div :class="bem('btns')">
          <span :class="bem('value')">
            <r-input
              v-model="customInput"
              @keyup.enter="handleConfirm"
              @blur="handleConfirm"
            />
          </span>
          <r-button :class="bem('link-btn')" text size="small" @click="clear">
            {{ t('clear') }}
          </r-button>
          <r-button
            plain
            size="small"
            :class="bem('btn')"
            @click="confirmValue"
          >
            {{ t('confirm') }}
          </r-button>
        </div>
      </div>
    </template>
    <template #default>
      <div
        :id="buttonId"
        :class="btnKls"
        :tabindex="tabindex"
        :aria-description="t('description', modelValue || '')"
        role="button"
        @keydown.enter="handleTrigger"
      >
        <div v-if="colorDisabled" :class="bem('mask')" />
        <div :class="bem('trigger')" @click="handleTrigger">
          <span :class="[bem('color'), isBem('alpha', showAlpha)]">
            <span
              :class="bem('color-inner')"
              :style="{
                backgroundColor: displayedColor
              }"
            >
              <r-icon
                v-show="modelValue || showPanelColor"
                :class="[bem('icon'), isBem('icon-arrow-down')]"
              >
                <arrow-down />
              </r-icon>
              <r-icon
                v-if="!modelValue && !showPanelColor"
                :class="[bem('empty'), isBem('icon-close')]"
              >
                <close />
              </r-icon>
            </span>
          </span>
        </div>
      </div>
    </template>
  </r-tooltip>
</template>

<script lang="ts">
// @ts-nocheck
import {
  ref,
  watch,
  provide,
  reactive,
  computed,
  nextTick,
  onMounted,
  defineComponent
} from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { ArrowDown, Close } from '@ryxon/icons'
import { useParent, useCustomInputValue } from '@ryxon/use'
import { Input } from '../input'
import { Button } from '../button'
import { Icon } from '../icon'
import { Tooltip } from '../tooltip'
import { FORM_KEY, createNamespace } from '../utils'
import AlphaSlider from './components/alpha-slider.vue'
import HueSlider from './components/hue-slider.vue'
import Predefine from './components/predefine.vue'
import SvPanel from './components/sv-panel.vue'
import ClickOutside from '../composables/use-click-outside'
import Color from './utils/color'
import { useId } from '../composables/use-id'
import {
  colorPickerProps,
  colorPickerEmits,
  colorPickerContextKey
} from './props'

const [name, bem, t, isBem] = createNamespace('color-picker')

export default defineComponent({
  name,
  components: {
    RTooltip: Tooltip,
    RInput: Input,
    RIcon: Icon,
    RButton: Button,
    AlphaSlider,
    HueSlider,
    Predefine,
    SvPanel,
    ArrowDown,
    Close
  },
  directives: { ClickOutside },
  props: colorPickerProps,
  emits: colorPickerEmits,
  setup(props, { emit }) {
    // 获取父级组件form
    const { parent: form } = useParent(FORM_KEY)
    const colorDisabled = computed(() => props.disabled || form?.props.disabled)

    const hue = ref<InstanceType<typeof HueSlider>>()
    const sv = ref<InstanceType<typeof SvPanel>>()
    const alpha = ref<InstanceType<typeof AlphaSlider>>()
    const popper = ref<InstanceType<typeof Tooltip> | null>()

    // active-change is used to prevent modelValue changes from triggering.
    let shouldActiveChange = true

    const color = reactive(
      new Color({
        enableAlpha: props.showAlpha,
        format: props.colorFormat || '',
        value: props.modelValue
      })
    ) as Color

    const showPicker = ref(false)
    const showPanelColor = ref(false)
    const customInput = ref('')

    const id = useId()
    const buttonId = computed(() => props.id || id)
    const btnKls = computed(() => [
      bem(),
      isBem('disabled', colorDisabled.value),
      bem(props.size)
    ])

    function displayedRgb(color: Color, showAlpha: boolean) {
      if (!(color instanceof Color)) {
        throw new TypeError('color should be instance of _color Class')
      }

      const { r, g, b } = color.toRgb()
      return showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
        : `rgb(${r}, ${g}, ${b})`
    }

    const displayedColor = computed(() => {
      if (!props.modelValue && !showPanelColor.value) {
        return 'transparent'
      }
      return displayedRgb(color, props.showAlpha)
    })

    function setShowPicker(value: boolean) {
      showPicker.value = value
    }

    const debounceSetShowPicker = useDebounceFn(setShowPicker, 100)

    function show() {
      if (colorDisabled.value) return
      setShowPicker(true)
    }

    function resetColor() {
      nextTick(() => {
        if (props.modelValue) {
          color.fromString(props.modelValue)
        } else {
          color.value = ''
          nextTick(() => {
            showPanelColor.value = false
          })
        }
      })
    }

    function hide() {
      debounceSetShowPicker(false)
      resetColor()
    }

    function handleTrigger() {
      if (colorDisabled.value) return
      debounceSetShowPicker(!showPicker.value)
    }

    function handleConfirm() {
      color.fromString(customInput.value)
    }

    function confirmValue() {
      const { value } = color
      emit('update:modelValue', value)
      emit('change', value)
      debounceSetShowPicker(false)
      // check if modelValue change, if not change, then reset color.
      nextTick(() => {
        const newColor = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat || '',
          value: props.modelValue
        })
        if (!color.compare(newColor)) {
          resetColor()
        }
      })
    }

    function clear() {
      debounceSetShowPicker(false)
      emit('update:modelValue', null)
      emit('change', null)
      resetColor()
    }

    const currentColor = computed(() =>
      !props.modelValue && !showPanelColor.value ? '' : color.value
    )

    onMounted(() => {
      if (props.modelValue) {
        customInput.value = currentColor.value
      }
    })

    watch(
      () => props.modelValue,
      (newVal) => {
        if (!newVal) {
          showPanelColor.value = false
        } else if (newVal && newVal !== color.value) {
          shouldActiveChange = false
          color.fromString(newVal)
        }
      }
    )
    useCustomInputValue(() => props.modelValue)

    watch(
      () => currentColor.value,
      (val) => {
        customInput.value = val
        shouldActiveChange && emit('activeChange', val)
        shouldActiveChange = true
      }
    )

    watch(
      () => color.value,
      () => {
        if (!props.modelValue && !showPanelColor.value) {
          showPanelColor.value = true
        }
      }
    )

    watch(
      () => showPicker.value,
      () => {
        nextTick(() => {
          hue.value?.update()
          sv.value?.update()
          alpha.value?.update()
        })
      }
    )

    provide(colorPickerContextKey, {
      currentColor
    })

    return {
      t,
      bem,
      isBem,
      hue,
      sv,
      alpha,
      popper,
      showPicker,
      btnKls,
      buttonId,
      displayedColor,
      colorDisabled,
      showPanelColor,
      customInput,
      confirmValue,
      handleTrigger,
      handleConfirm,
      clear,
      color,
      show,
      hide
    }
  }
})
</script>
