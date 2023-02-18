import { ref, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { extend, type ComponentInstance } from '../utils'
import { DEFAULT_FORMATS_TIME } from './constants'

// Components
import Picker from './common/picker.vue'
import TimePickPanel from './time-picker-com/panel-time-pick.vue'
import TimeRangePanel from './time-picker-com/panel-time-range.vue'

// const [name] = createNamespace('time-picker-pc')
import { timePickerDefaultProps } from './common/props'

export const timePickerPcProps = extend({}, timePickerDefaultProps, {
  isRange: { type: Boolean, default: false }
})

export type TimePickerPcProps = ExtractPropTypes<typeof timePickerPcProps>

dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'RTimePickerPc',
  install: null,
  props: timePickerPcProps,
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const commonPicker = ref<ComponentInstance>()

    const [type, Panel] = props.isRange
      ? ['timerange', TimeRangePanel]
      : ['time', TimePickPanel]

    const modelUpdater = (value: any) => emit('update:modelValue', value)

    expose({
      focus: (e: FocusEvent | undefined) => {
        commonPicker.value?.handleFocusInput(e)
      },
      blur: (e: FocusEvent | undefined) => {
        commonPicker.value?.handleBlurInput(e)
      },
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      handleClose: () => {
        commonPicker.value?.handleClose()
      }
    })

    return () => {
      const format = props.format ?? DEFAULT_FORMATS_TIME

      return (
        <Picker
          {...props}
          ref={commonPicker}
          type={type}
          format={format}
          onUpdate:modelValue={modelUpdater}
        >
          {{
            default: (props: any) => <Panel {...props} />
          }}
        </Picker>
      )
    }
  }
})
