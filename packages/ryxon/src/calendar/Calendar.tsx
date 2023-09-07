// @ts-nocheck
import { provide, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { extend, createNamespace } from '../utils'
import { getPanel } from './panel-utils'
import { useCalendar } from './use-calendar'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

// Components
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER } from './constants'
import { timePickerPcProps } from '../time-picker-pc'
import { ROOT_PICKER_INJECTION_KEY } from './type'
import { datePickerProps } from './props/date-picker'

const [name, bem] = createNamespace('calendar')

export const calendarPcProps = extend({}, timePickerPcProps, datePickerProps)

export type CalendarProps = ExtractPropTypes<typeof calendarPcProps>

dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(dayOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default defineComponent({
  name,
  props: calendarPcProps,
  emits: [
    'update:modelValue',
    'change',
    'focus',
    'blur',
    'calendar-change',
    'panel-change',
    'visible-change',
    'keydown',
    'current-rows'
  ],
  setup(props, ctx) {
    const { slots, emit } = ctx
    provide(ROOT_PICKER_INJECTION_KEY, { slots })

    // 由于props上始终有所有定义的键，因此｛format，…props｝将始终覆盖format
    // 选择props.format或在展开前在此处提供默认值
    const format =
      props.format ??
      (DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE)

    const Component = getPanel(props.type)

    provide('EP_PICKER_BASE', { props })

    const {
      parsedValue,
      onPick,
      onPanelChange,
      onCalendarChange,
      setSelectionRange
    } = useCalendar(props, ctx)

    return () => (
      <Component
        class={bem()}
        parsedValue={parsedValue.value}
        format={format}
        unlinkPanels={props.unlinkPanels}
        type={props.type}
        defaultValue={props.defaultValue}
        onPick={onPick}
        onSelectRange={setSelectionRange}
        onCalendarChange={onCalendarChange}
        onPanelChange={onPanelChange}
        onCurrentRows={(start, end) => emit('current-rows', start, end)}
      />
    )
  }
})
