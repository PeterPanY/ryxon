// @ts-nocheck
import {
  toRefs,
  provide,
  reactive,
  computed,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  makeStringProp,
  definePropType,
  createNamespace,
  makeNumericProp
} from '../utils'
import { sliderEmits, sliderContextKey } from './types'
import SliderButton from './button.vue'
import SliderMarker from './marker'
import { TooltipPlacement } from '../tooltip'
import { InputNumber } from '../input-number'

// Composables
import { useExpose } from '../composables/use-expose'
import {
  useLifecycle,
  useSlide,
  useStops,
  useMarks,
  useWatch
} from './composables'
import { useCustomInputValue } from '@ryxon/use'
import type { SliderInitData } from './types'
import type { SliderMarkerProps } from './marker'

const [name, bem, t, isBem] = createNamespace('slider')

type NumberRange = [number, number]

type SliderValue = number | NumberRange

type SliderMarks = Record<number, string | SliderMarkerProps['mark']>

export const sliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: 0
  },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  showStops: Boolean,
  showTooltip: { type: Boolean, default: true },
  showInput: Boolean,
  inputButtonSize: makeNumericProp(32),
  formatTooltip: {
    type: definePropType<(val: number) => number | string>(Function),
    default: undefined
  },
  disabled: Boolean,
  range: Boolean,
  vertical: Boolean,
  height: String,
  label: { type: String, default: undefined },
  rangeStartLabel: { type: String, default: undefined },
  rangeEndLabel: { type: String, default: undefined },
  formatValueText: {
    type: definePropType<(val: number) => string>(Function),
    default: undefined
  },
  tooltipClass: { type: String, default: undefined },
  placement: makeStringProp<TooltipPlacement>('top'),
  marks: {
    type: definePropType<SliderMarks>(Object)
  }
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>

export default defineComponent({
  name,
  props: sliderProps,
  emits: sliderEmits,
  setup(props, { emit, slots }) {
    const initData = reactive<SliderInitData>({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1
    })

    const {
      slider,
      firstButton,
      secondButton,
      sliderDisabled,
      minValue,
      maxValue,
      runwayStyle,
      barStyle,
      resetSize,
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      setFirstValue,
      setSecondValue
    } = useSlide(props, initData, emit)

    const { stops, getStopStyle } = useStops(
      props,
      initData,
      minValue,
      maxValue
    )

    const { sliderWrapper } = useLifecycle(props, initData, resetSize)

    const sliderKls = computed(() => [
      bem(),
      isBem('vertical', props.vertical),
      { [bem('with-input') as string]: props.showInput }
    ])

    const markList = useMarks(props)

    const { firstValue, secondValue, sliderSize } = toRefs(initData)

    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimal = `${item}`.split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    })

    const updateDragging = (val: boolean) => {
      initData.dragging = val
    }

    const groupLabel = computed<string>(
      () => props.label || t('defaultLabel', props.min, props.max)
    )

    const firstButtonLabel = computed<string>(() => {
      if (props.range) {
        return props.rangeStartLabel || t('defaultRangeStartLabel')
      }
      return groupLabel.value
    })

    const firstValueText = computed<string>(() =>
      props.formatValueText
        ? props.formatValueText(firstValue.value)
        : `${firstValue.value}`
    )

    const secondButtonLabel = computed<string>(
      () => props.rangeEndLabel || t('defaultRangeEndLabel')
    )

    const secondValueText = computed<string>(() =>
      props.formatValueText
        ? props.formatValueText(secondValue.value)
        : `${secondValue.value}`
    )

    useWatch(props, initData, minValue, maxValue, emit)

    provide(sliderContextKey, {
      // eslint-disable-next-line no-restricted-syntax
      ...toRefs(props),
      sliderSize,
      disabled: sliderDisabled,
      precision,
      emitChange,
      resetSize,
      updateDragging
    })

    useCustomInputValue(() => props.modelValue)

    useExpose({
      onSliderClick
    })

    return () => (
      <div
        id={props.range ? '' : undefined}
        ref={sliderWrapper}
        class={sliderKls.value}
        role={props.range ? 'group' : undefined}
        onTouchstart={onSliderWrapperPrevent}
        onTouchmove={onSliderWrapperPrevent}
      >
        <div
          ref={slider}
          class={[
            bem('runway'),
            { 'show-input': props.showInput && !props.range },
            isBem('disabled', sliderDisabled.value)
          ]}
          style={runwayStyle.value}
          onMousedown={onSliderDown}
          onTouchstart={onSliderDown}
        >
          <div class={bem('bar')} style={barStyle.value}></div>
          <SliderButton
            v-slots={{ default: slots.button }}
            id={props.range ? '' : undefined}
            ref={firstButton}
            model-value={firstValue.value}
            vertical={props.vertical}
            tooltip-class={props.tooltipClass}
            placement={props.placement}
            role="slider"
            aria-label={props.range ? firstButtonLabel.value : undefined}
            aria-valuemin={props.min}
            aria-valuemax={props.range ? secondValue.value : props.max}
            aria-valuenow={firstValue.value}
            aria-valuetext={firstValueText.value}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            aria-disabled={sliderDisabled.value}
            onUpdate:modelValue={setFirstValue}
          ></SliderButton>
          {props.range && (
            <SliderButton
              ref={secondButton}
              model-value={secondValue.value}
              vertical={props.vertical}
              tooltip-class={props.tooltipClass}
              placement={props.placement}
              role="slider"
              aria-label={secondButtonLabel.value}
              aria-valuemin={firstValue.value}
              aria-valuemax={props.max}
              aria-valuenow={secondValue.value}
              aria-valuetext={secondValueText.value}
              aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
              aria-disabled={sliderDisabled.value}
              onUpdate:modelValue={setSecondValue}
            ></SliderButton>
          )}
          {props.showStops &&
            stops.value.map((item, index) => (
              <div
                key={index}
                class={bem('stop')}
                style={getStopStyle(item)}
              ></div>
            ))}

          {markList.value.length > 0 && (
            <>
              <div>
                {markList.value.map((item, index) => (
                  <div
                    key={index}
                    style={getStopStyle(item.position)}
                    class={[bem('stop'), bem('marks-stop')]}
                  ></div>
                ))}
              </div>
              <div class={bem('marks')}>
                {markList.value.map((item, index) => (
                  <SliderMarker
                    key={index}
                    mark={item.mark}
                    style={getStopStyle(item.position)}
                  ></SliderMarker>
                ))}
              </div>
            </>
          )}
        </div>
        {props.showInput && !props.range && (
          <InputNumber
            model-value={firstValue.value}
            class={bem('input')}
            step={props.step}
            disabled={sliderDisabled.value}
            min={props.min}
            max={props.max}
            buttonSize={props.inputButtonSize}
            onUpdate:modelValue={setFirstValue}
            onChange={emitChange}
          ></InputNumber>
        )}
      </div>
    )
  }
})
