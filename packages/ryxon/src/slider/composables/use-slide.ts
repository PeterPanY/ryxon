// @ts-nocheck
import { computed, nextTick, ref, shallowRef } from 'vue'
import type { CSSProperties, Ref, SetupContext } from 'vue'
import type { Arrayable } from '../../utils'
import type { SliderEmits, SliderInitData } from '../types'
import type { SliderProps } from '../Slider'
import type { ButtonRefs, SliderButtonInstance } from '../button-props'

export const useSlide = (
  props: SliderProps,
  initData: SliderInitData,
  emit: SetupContext<SliderEmits>['emit']
) => {
  const slider = shallowRef<HTMLElement>()

  const firstButton = ref<SliderButtonInstance>()

  const secondButton = ref<SliderButtonInstance>()

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton
  }

  const sliderDisabled = computed(() => props.disabled || false)

  const minValue = computed(() =>
    Math.min(initData.firstValue, initData.secondValue)
  )

  const maxValue = computed(() =>
    Math.max(initData.firstValue, initData.secondValue)
  )

  const barSize = computed(() =>
    props.range
      ? `${
          (100 * (maxValue.value - minValue.value)) / (props.max - props.min)
        }%`
      : `${
          (100 * (initData.firstValue - props.min)) / (props.max - props.min)
        }%`
  )

  const barStart = computed(() =>
    props.range
      ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%`
      : '0%'
  )

  const runwayStyle = computed<CSSProperties>(() =>
    props.vertical ? { height: props.height } : {}
  )

  const barStyle = computed<CSSProperties>(() =>
    props.vertical
      ? {
          height: barSize.value,
          bottom: barStart.value
        }
      : {
          width: barSize.value,
          left: barStart.value
        }
  )

  const resetSize = () => {
    if (slider.value) {
      initData.sliderSize =
        slider.value[`client${props.vertical ? 'Height' : 'Width'}`]
    }
  }

  const getButtonRefByPercent = (
    percent: number
  ): Ref<SliderButtonInstance | undefined> => {
    const targetValue = props.min + (percent * (props.max - props.min)) / 100
    if (!props.range) {
      return firstButton
    }
    let buttonRefName: 'firstButton' | 'secondButton'
    if (
      Math.abs(minValue.value - targetValue) <
      Math.abs(maxValue.value - targetValue)
    ) {
      buttonRefName =
        initData.firstValue < initData.secondValue
          ? 'firstButton'
          : 'secondButton'
    } else {
      buttonRefName =
        initData.firstValue > initData.secondValue
          ? 'firstButton'
          : 'secondButton'
    }
    return buttonRefs[buttonRefName]
  }

  const setPosition = (
    percent: number
  ): Ref<SliderButtonInstance | undefined> => {
    const buttonRef = getButtonRefByPercent(percent)
    buttonRef.value!.setPosition(percent)
    return buttonRef
  }

  const _emit = (val: Arrayable<number>) => {
    emit('update:modelValue', val)
    emit('input', val)
  }

  const setFirstValue = (firstValue: number | undefined) => {
    initData.firstValue = firstValue!
    _emit(props.range ? [minValue.value, maxValue.value] : firstValue!)
  }

  const setSecondValue = (secondValue: number) => {
    initData.secondValue = secondValue

    if (props.range) {
      _emit([minValue.value, maxValue.value])
    }
  }

  const emitChange = async () => {
    await nextTick()
    emit(
      'change',
      props.range ? [minValue.value, maxValue.value] : props.modelValue
    )
  }

  const handleSliderPointerEvent = (
    event: MouseEvent | TouchEvent
  ): Ref<SliderButtonInstance | undefined> | undefined => {
    if (sliderDisabled.value || initData.dragging) return
    resetSize()
    let newPercent = 0
    if (props.vertical) {
      const clientY =
        (event as TouchEvent).touches?.item(0)?.clientY ??
        (event as MouseEvent).clientY
      const sliderOffsetBottom = slider.value!.getBoundingClientRect().bottom
      newPercent = ((sliderOffsetBottom - clientY) / initData.sliderSize) * 100
    } else {
      const clientX =
        (event as TouchEvent).touches?.item(0)?.clientX ??
        (event as MouseEvent).clientX
      const sliderOffsetLeft = slider.value!.getBoundingClientRect().left
      newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize) * 100
    }
    if (newPercent < 0 || newPercent > 100) return
    return setPosition(newPercent)
  }

  const onSliderWrapperPrevent = (event: TouchEvent) => {
    if (
      buttonRefs.firstButton.value?.dragging ||
      buttonRefs.secondButton.value?.dragging
    ) {
      event.preventDefault()
    }
  }

  const onSliderDown = async (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      await nextTick()
      buttonRef.value!.onButtonDown(event)
    }
  }

  const onSliderClick = (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      emitChange()
    }
  }

  return {
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    setFirstValue,
    setSecondValue
  }
}
