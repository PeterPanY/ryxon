// @ts-nocheck
import {
  ref,
  provide,
  InjectionKey,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Utils
import { extend, createNamespace, type ComponentInstance } from '../utils'
import { getPanel } from './panel-utils'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import { useCustomInputValue } from '@ryxon/use'

// Components
import CommonPicker from '../time-picker-pc/common/picker.vue'
import {
  timePickerPcProps,
  DEFAULT_FORMATS_DATE,
  DEFAULT_FORMATS_DATEPICKER
} from '../time-picker-pc'

import type { DatePickerPcProvide } from './type'

import { datePickerProps } from './props/date-picker'

const [name, bem] = createNamespace('picker-panel')

export const datePickerPcProps = extend({}, timePickerPcProps, datePickerProps)

export type DatePickerPcProps = ExtractPropTypes<typeof datePickerPcProps>

dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(dayOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const ROOT_PICKER_INJECTION_KEY: InjectionKey<DatePickerPcProvide> =
  Symbol(name)

export default defineComponent({
  name: 'RDatePickerPc',
  props: datePickerPcProps,
  emits: ['update:modelValue'],
  setup(props, { expose, emit, slots }) {
    provide(ROOT_PICKER_INJECTION_KEY, {
      slots,
      pickerNs: bem
    })

    const commonPicker = ref<ComponentInstance>()
    const refProps = {
      focus: (focusStartInput = true) => {
        commonPicker.value?.focus(focusStartInput)
      },
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      handleClose: () => {
        commonPicker.value?.handleClose()
      }
    }

    expose(refProps)

    const onModelValueUpdated = (val: any) => {
      emit('update:modelValue', val)
    }

    // 由于props上始终有所有定义的键，因此｛format，…props｝将始终覆盖format
    // 选择props.format或在展开前在此处提供默认值
    const format =
      props.format ??
      (DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE)

    const Component = getPanel(props.type)

    useCustomInputValue(() => props.modelValue)

    return () => (
      <CommonPicker
        {...props}
        class="r-date-picker-pc"
        format={format}
        type={props.type}
        ref={commonPicker}
        onUpdate:modelValue={onModelValueUpdated}
      >
        {{
          default: (scopedProps: any) => <Component {...scopedProps} />,
          'range-separator': slots['range-separator']
        }}
      </CommonPicker>
    )
  }
})
