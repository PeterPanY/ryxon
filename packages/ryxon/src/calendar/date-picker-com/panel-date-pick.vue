<template>
  <div
    :class="[
      bemPicker(),
      bemDate(),
      {
        'has-sidebar': $slots.sidebar || hasShortcuts,
        'has-time': showTime
      }
    ]"
  >
    <div :class="bemPicker('body-wrapper')">
      <slot name="sidebar" :class="bemPicker('sidebar')" />
      <div v-if="hasShortcuts" :class="bemPicker('sidebar')">
        <button
          v-for="(shortcut, key) in shortcuts"
          :key="key"
          type="button"
          :class="bemPicker('shortcut')"
          @click="handleShortcutClick(shortcut)"
        >
          {{ shortcut.text }}
        </button>
      </div>
      <div :class="bemPicker('body')">
        <div v-if="showTime" :class="bemDate('time-header')">
          <span :class="bemDate('editor-wrap')">
            <r-input
              :placeholder="t('rDatepicker.selectDate')"
              :model-value="visibleDate"
              size="small"
              :validate-event="false"
              @input="(val) => (userInputDate = val)"
              @change="handleVisibleDateChange"
            />
          </span>
          <span
            v-click-outside="handleTimePickClose"
            :class="bemDate('editor-wrap')"
          >
            <r-input
              :placeholder="t('rDatepicker.selectTime')"
              :model-value="visibleTime"
              size="small"
              :validate-event="false"
              @focus="onTimePickerInputFocus"
              @input="(val) => (userInputTime = val)"
              @change="handleVisibleTimeChange"
            />
            <time-pick-panel
              :visible="timePickerVisible"
              :format="timeFormat"
              :time-arrow-control="arrowControl"
              :parsed-value="innerDate"
              @pick="handleTimePick"
            />
          </span>
        </div>
        <div
          v-show="currentView !== 'time'"
          :class="[
            bemDate('header'),
            (currentView === 'year' || currentView === 'month') &&
              bemDate('header--bordered')
          ]"
        >
          <!-- 头部左箭头 -->
          <span :class="bemDate('prev-btn')">
            <button
              type="button"
              :aria-label="t(`rDatepicker.prevYear`)"
              class="d-arrow-left"
              :class="bemPicker('icon-btn')"
              @click="moveByYear(false)"
            >
              <r-icon><d-arrow-left /></r-icon>
            </button>
            <button
              v-show="currentView === 'date'"
              type="button"
              :aria-label="t(`rDatepicker.prevMonth`)"
              :class="bemPicker('icon-btn')"
              class="arrow-left"
              @click="moveByMonth(false)"
            >
              <r-icon><arrow-left /></r-icon>
            </button>
          </span>
          <!-- 头部年展示 -->
          <span
            role="button"
            :class="bemDate('header-label')"
            aria-live="polite"
            tabindex="0"
            @keydown.enter="showPicker('year')"
            @click="showPicker('year')"
            >{{ yearLabel }}</span
          >
          <!-- 头部月展示 -->
          <span
            v-show="currentView === 'date'"
            role="button"
            aria-live="polite"
            tabindex="0"
            :class="[
              bemDate('header-label'),
              { active: currentView === 'month' }
            ]"
            @keydown.enter="showPicker('month')"
            @click="showPicker('month')"
          >
            {{ t(`rDatepicker.month${month + 1}`) }}</span
          >
          <!-- 头部右箭头 -->
          <span :class="bemDate('next-btn')">
            <button
              v-show="currentView === 'date'"
              type="button"
              :aria-label="t(`rDatepicker.nextMonth`)"
              :class="bemPicker('icon-btn')"
              class="arrow-right"
              @click="moveByMonth(true)"
            >
              <r-icon><arrow-right /></r-icon>
            </button>
            <button
              type="button"
              :aria-label="t(`rDatepicker.nextYear`)"
              :class="bemPicker('icon-btn')"
              class="d-arrow-right"
              @click="moveByYear(true)"
            >
              <r-icon><d-arrow-right /></r-icon>
            </button>
          </span>
        </div>
        <div :class="bemPicker('content')" @keydown="handleKeydownTable">
          <date-table
            v-if="currentView === 'date'"
            ref="currentViewRef"
            :selection-mode="selectionMode"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            :cell-class-name="cellClassName"
            @pick="handleDatePick"
            @table-rows="handleTableRows"
          />
          <year-table
            v-if="currentView === 'year'"
            ref="currentViewRef"
            :date="innerDate"
            :disabled-date="disabledDate"
            :parsed-value="parsedValue"
            @pick="handleYearPick"
          />
          <month-table
            v-if="currentView === 'month'"
            ref="currentViewRef"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            @pick="handleMonthPick"
          />
        </div>
      </div>
    </div>
    <div
      v-show="footerVisible && currentView === 'date'"
      :class="bemPicker('footer')"
    >
      <r-button
        v-show="selectionMode !== 'dates'"
        text
        size="small"
        :class="bemPicker('link-btn')"
        @click="changeToNow"
      >
        {{ t('rDatepicker.now') }}
      </r-button>
      <r-button
        plain
        size="small"
        :class="bemPicker('link-btn')"
        @click="onConfirm"
      >
        {{ t('rDatepicker.confirm') }}
      </r-button>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {
  ref,
  toRef,
  watch,
  inject,
  computed,
  nextTick,
  defineComponent
} from 'vue'
import dayjs from 'dayjs'
import { Button } from '../../button'
import { Input } from '../../input'
import { Icon } from '../../icon'
import { ArrowLeft, ArrowRight, DArrowLeft, DArrowRight } from '@ryxon/icons'
import DateTable from './basic-date-table.vue'
import MonthTable from './basic-month-table.vue'
import YearTable from './basic-year-table.vue'
import ClickOutside from '../../composables/use-click-outside'
import { isArray, isFunction } from '@ryxon/utils'
import { createNamespace } from '../../utils'
import { useCurrentLang } from '../../locale'
import { TOOLTIP_INJECTION_KEY } from '../../tooltip'
import { EVENT_CODE } from '../../constants'
import { extractDateFormat, extractTimeFormat } from '../../time-picker-pc'
import TimePickPanel from '../../time-picker-pc/time-picker-com/panel-time-pick.vue'
import { panelDatePickProps } from '../props/panel-date-pick'
import type { SetupContext } from 'vue'
import type { ConfigType, Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import type { PanelDatePickProps } from '../props/panel-date-pick'
import type {
  DateTableEmits,
  DatesPickerEmits,
  WeekPickerEmits
} from '../props/basic-date-table'
import type { DateCell } from '../type'

export default defineComponent({
  components: {
    RButton: Button,
    RInput: Input,
    RIcon: Icon,
    ArrowLeft,
    ArrowRight,
    DArrowLeft,
    DArrowRight,
    DateTable,
    MonthTable,
    YearTable,
    TimePickPanel
  },
  directives: { ClickOutside },
  props: panelDatePickProps,
  emits: ['pick', 'set-picker-option', 'panel-change', 'current-rows'],
  setup(props, ctx) {
    const [, bemPicker, t] = createNamespace('picker-panel')
    const [, bemDate] = createNamespace('date-picker')
    const lang = useCurrentLang()

    const pickerBase = inject('EP_PICKER_BASE') as any

    const {
      shortcuts,
      disabledDate,
      cellClassName,
      defaultTime,
      arrowControl
    } = pickerBase.props

    const defaultValue = toRef(pickerBase.props, 'defaultValue')

    const currentViewRef = ref<{ focus: () => void }>()

    const innerDate = ref(dayjs().locale(lang.value))

    const isChangeToNow = ref(false)

    const defaultTimeD = computed(() => dayjs(defaultTime).locale(lang.value))

    const month = computed(() => innerDate.value.month())

    const year = computed(() => innerDate.value.year())

    const selectableRange = ref([])
    const userInputDate = ref<string | null>(null)
    const userInputTime = ref<string | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeWithinRange = (_: ConfigType, __: any, ___: string) => true
    // todo update to disableHour
    const checkDateWithinRange = (date: ConfigType) =>
      selectableRange.value.length > 0
        ? timeWithinRange(
            date,
            selectableRange.value,
            props.format || 'HH:mm:ss'
          )
        : true

    const timeFormat = computed(() => extractTimeFormat(props.format))

    const visibleTime = computed(() => {
      if (userInputTime.value) return userInputTime.value
      if (!props.parsedValue && !defaultValue.value) return
      return ((props.parsedValue || innerDate.value) as Dayjs).format(
        timeFormat.value
      )
    })

    const showTime = computed(
      () => props.type === 'datetime' || props.type === 'datetimerange'
    )

    const formatEmit = (emitDayjs: Dayjs) => {
      if (defaultTime && !visibleTime.value && !isChangeToNow.value) {
        return defaultTimeD.value
          .year(emitDayjs.year())
          .month(emitDayjs.month())
          .date(emitDayjs.date())
      }
      if (showTime.value) return emitDayjs.millisecond(0)
      return emitDayjs.startOf('day')
    }
    const emit = (value: Dayjs | Dayjs[], ...args: any[]) => {
      if (!value) {
        ctx.emit('pick', value, ...args)
      } else if (isArray(value)) {
        const dates = value.map(formatEmit)
        ctx.emit('pick', dates, ...args)
      } else {
        ctx.emit('pick', formatEmit(value), ...args)
      }
      userInputDate.value = null
      userInputTime.value = null
      isChangeToNow.value = false
    }

    type DatePickType = PanelDatePickProps['type']
    const selectionMode = computed<DatePickType>(() => {
      const { type } = props
      if (['week', 'month', 'year', 'dates'].includes(type)) return type
      return 'date' as DatePickType
    })

    const handleDatePick = (value: DateTableEmits, keepOpen?: boolean) => {
      if (selectionMode.value === 'date') {
        value = value as Dayjs
        let newDate = props.parsedValue
          ? (props.parsedValue as Dayjs)
              .year(value.year())
              .month(value.month())
              .date(value.date())
          : value
        // change default time while out of selectableRange
        if (!checkDateWithinRange(newDate)) {
          newDate = (selectableRange.value[0][0] as Dayjs)
            .year(value.year())
            .month(value.month())
            .date(value.date())
        }
        innerDate.value = newDate
        emit(newDate, showTime.value || keepOpen)
      } else if (selectionMode.value === 'week') {
        emit((value as WeekPickerEmits).date)
      } else if (selectionMode.value === 'dates') {
        emit(value as DatesPickerEmits, true) // set true to keep panel open
      }
    }

    const handleTableRows = (type: string, list: DateCell[][]) => {
      if (type === 'date') {
        const flatList = list.flat()
        const startRow = flatList.find((item) => item.type === 'normal')
        const endIndex = flatList.findIndex(
          (item) => item.type === 'next-month'
        )

        const endRow =
          endIndex === -1
            ? flatList[flatList.length - 1]
            : flatList[endIndex - 1]

        ctx.emit('current-rows', startRow, endRow)
      }
    }

    const currentView = ref('date')

    const handlePanelChange = (mode: 'month' | 'year') => {
      ctx.emit(
        'panel-change',
        innerDate.value.toDate(),
        mode,
        currentView.value
      )
    }

    const moveByMonth = (forward: boolean) => {
      const action = forward ? 'add' : 'subtract'
      innerDate.value = innerDate.value[action](1, 'month')
      handlePanelChange('month')
    }

    const moveByYear = (forward: boolean) => {
      const currentDate = innerDate.value
      const action = forward ? 'add' : 'subtract'

      innerDate.value =
        currentView.value === 'year'
          ? currentDate[action](10, 'year')
          : currentDate[action](1, 'year')

      handlePanelChange('year')
    }

    const yearLabel = computed(() => {
      const yearTranslation = t('rDatepicker.year')
      if (currentView.value === 'year') {
        const startYear = Math.floor(year.value / 10) * 10
        if (yearTranslation) {
          return `${startYear} ${yearTranslation} - ${
            startYear + 9
          } ${yearTranslation}`
        }
        return `${startYear} - ${startYear + 9}`
      }
      return `${year.value} ${yearTranslation}`
    })

    type Shortcut = {
      value: (() => Dayjs) | Dayjs
      onClick?: (ctx: Omit<SetupContext, 'expose'>) => void
    }

    const handleShortcutClick = (shortcut: Shortcut) => {
      const shortcutValue = isFunction(shortcut.value)
        ? shortcut.value()
        : shortcut.value
      if (shortcutValue) {
        emit(dayjs(shortcutValue).locale(lang.value))
        return
      }
      if (shortcut.onClick) {
        shortcut.onClick({
          attrs: ctx.attrs,
          slots: ctx.slots,
          emit: ctx.emit as SetupContext['emit']
        })
      }
    }

    const keyboardMode = computed<string>(() =>
      selectionMode.value === 'date' ? currentView.value : selectionMode.value
    )

    const hasShortcuts = computed(() => !!shortcuts.length)

    const handleKeyControl = (code: string) => {
      type KeyControlMappingCallableOffset = (
        date: Date,
        step?: number
      ) => number
      type KeyControl = {
        [key: string]:
          | number
          | KeyControlMappingCallableOffset
          | ((date: Date, step: number) => any)
        offset: (date: Date, step: number) => any
      }
      interface KeyControlMapping {
        [key: string]: KeyControl
      }

      const { up, down, left, right, home, end, pageUp, pageDown } = EVENT_CODE
      const mapping: KeyControlMapping = {
        year: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date: Date, step: number) =>
            date.setFullYear(date.getFullYear() + step)
        },
        month: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date: Date, step: number) =>
            date.setMonth(date.getMonth() + step)
        },
        week: {
          [up]: -1,
          [down]: 1,
          [left]: -1,
          [right]: 1,
          offset: (date: Date, step: number) =>
            date.setDate(date.getDate() + step * 7)
        },
        date: {
          [up]: -7,
          [down]: 7,
          [left]: -1,
          [right]: 1,
          [home]: (date: Date) => -date.getDay(),
          [end]: (date: Date) => -date.getDay() + 6,
          [pageUp]: (date: Date) =>
            -new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
          [pageDown]: (date: Date) =>
            new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
          offset: (date: Date, step: number) =>
            date.setDate(date.getDate() + step)
        }
      }

      const newDate = innerDate.value.toDate()
      // eslint-disable-next-line no-unreachable-loop
      while (Math.abs(innerDate.value.diff(newDate, 'year', true)) < 1) {
        const map = mapping[keyboardMode.value]
        if (!map) return
        map.offset(
          newDate,
          isFunction(map[code])
            ? (map[code] as unknown as KeyControlMappingCallableOffset)(newDate)
            : (map[code] as number) ?? 0
        )
        if (disabledDate && disabledDate(newDate)) {
          break
        }
        const result = dayjs(newDate).locale(lang.value)
        innerDate.value = result
        ctx.emit('pick', result, true)
        break
      }
    }

    const handleFocusPicker = async () => {
      if (['week', 'month', 'year', 'date'].includes(selectionMode.value)) {
        currentViewRef.value?.focus()
        if (selectionMode.value === 'week') {
          handleKeyControl(EVENT_CODE.down)
        }
      }
    }

    const handleMonthPick = async (month: number) => {
      innerDate.value = innerDate.value.startOf('month').month(month)
      if (selectionMode.value === 'month') {
        emit(innerDate.value, false)
      } else {
        currentView.value = 'date'
        if (['month', 'year', 'date', 'week'].includes(selectionMode.value)) {
          emit(innerDate.value, true)
          await nextTick()
          handleFocusPicker()
        }
      }
      handlePanelChange('month')
    }

    const handleYearPick = async (year: number) => {
      if (selectionMode.value === 'year') {
        innerDate.value = innerDate.value.startOf('year').year(year)
        emit(innerDate.value, false)
      } else {
        innerDate.value = innerDate.value.year(year)
        currentView.value = 'month'
        if (['month', 'year', 'date', 'week'].includes(selectionMode.value)) {
          emit(innerDate.value, true)
          await nextTick()
          handleFocusPicker()
        }
      }
      handlePanelChange('year')
    }

    const showPicker = async (view: 'month' | 'year') => {
      currentView.value = view
      await nextTick()
      handleFocusPicker()
    }

    const footerVisible = computed(
      () => showTime.value || selectionMode.value === 'dates'
    )

    const getDefaultValue = () => {
      const parseDate = dayjs(defaultValue.value).locale(lang.value)
      if (!defaultValue.value) {
        const defaultTimeDValue = defaultTimeD.value
        return dayjs()
          .hour(defaultTimeDValue.hour())
          .minute(defaultTimeDValue.minute())
          .second(defaultTimeDValue.second())
          .locale(lang.value)
      }
      return parseDate
    }

    const onConfirm = () => {
      if (selectionMode.value === 'dates') {
        emit(props.parsedValue as Dayjs[])
      } else {
        // deal with the scenario where: user opens the date time picker, then confirm without doing anything
        let result = props.parsedValue as Dayjs
        if (!result) {
          const defaultTimeD = dayjs(defaultTime).locale(lang.value)
          const defaultValueD = getDefaultValue()
          result = defaultTimeD
            .year(defaultValueD.year())
            .month(defaultValueD.month())
            .date(defaultValueD.date())
        }
        innerDate.value = result
        emit(result)
      }
    }

    const changeToNow = () => {
      // NOTE: not a permanent solution
      //       consider disable "now" button in the future
      const now = dayjs().locale(lang.value)
      const nowDate = now.toDate()
      isChangeToNow.value = true
      if (
        (!disabledDate || !disabledDate(nowDate)) &&
        checkDateWithinRange(nowDate)
      ) {
        innerDate.value = dayjs().locale(lang.value)
        emit(innerDate.value)
      }
    }

    const dateFormat = computed(() => extractDateFormat(props.format))

    const visibleDate = computed(() => {
      if (userInputDate.value) return userInputDate.value
      if (!props.parsedValue && !defaultValue.value) return
      return ((props.parsedValue || innerDate.value) as Dayjs).format(
        dateFormat.value
      )
    })

    const timePickerVisible = ref(false)
    const onTimePickerInputFocus = () => {
      timePickerVisible.value = true
    }
    const handleTimePickClose = () => {
      timePickerVisible.value = false
    }

    const getUnits = (date: Dayjs) => ({
      hour: date.hour(),
      minute: date.minute(),
      second: date.second(),
      year: date.year(),
      month: date.month(),
      date: date.date()
    })

    const handleTimePick = (value: Dayjs, visible: boolean, first: boolean) => {
      const { hour, minute, second } = getUnits(value)
      const newDate = props.parsedValue
        ? (props.parsedValue as Dayjs).hour(hour).minute(minute).second(second)
        : value
      innerDate.value = newDate
      emit(innerDate.value, true)
      if (!first) {
        timePickerVisible.value = visible
      }
    }

    const handleVisibleTimeChange = (value: string) => {
      const newDate = dayjs(value, timeFormat.value).locale(lang.value)
      if (newDate.isValid() && checkDateWithinRange(newDate)) {
        const { year, month, date } = getUnits(innerDate.value)
        innerDate.value = newDate.year(year).month(month).date(date)
        userInputTime.value = null
        timePickerVisible.value = false
        emit(innerDate.value, true)
      }
    }

    const handleVisibleDateChange = (value: string) => {
      const newDate = dayjs(value, dateFormat.value).locale(lang.value)
      if (newDate.isValid()) {
        if (disabledDate && disabledDate(newDate.toDate())) {
          return
        }
        const { hour, minute, second } = getUnits(innerDate.value)
        innerDate.value = newDate.hour(hour).minute(minute).second(second)
        userInputDate.value = null
        emit(innerDate.value, true)
      }
    }

    const isValidValue = (date: unknown) =>
      dayjs.isDayjs(date) &&
      date.isValid() &&
      (disabledDate ? !disabledDate(date.toDate()) : true)

    const formatToString = (value: Dayjs | Dayjs[]) => {
      if (selectionMode.value === 'dates') {
        return (value as Dayjs[]).map((_) => _.format(props.format))
      }
      return (value as Dayjs).format(props.format)
    }

    const parseUserInput = (value: Dayjs) =>
      dayjs(value, props.format).locale(lang.value)

    const handleKeydownTable = (event: KeyboardEvent) => {
      const { code } = event
      const validCode = [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ]
      if (validCode.includes(code)) {
        handleKeyControl(code)
        event.stopPropagation()
        event.preventDefault()
      }
      if (
        [EVENT_CODE.enter, EVENT_CODE.space].includes(code) &&
        userInputDate.value === null &&
        userInputTime.value === null
      ) {
        event.preventDefault()
        emit(innerDate.value, false)
      }
    }

    watch(
      () => selectionMode.value,
      (val) => {
        if (['month', 'year'].includes(val)) {
          currentView.value = val
          return
        }
        currentView.value = 'date'
      },
      { immediate: true }
    )

    // 判断是不是弹窗
    if (props.isTooltip) {
      const popper = inject(TOOLTIP_INJECTION_KEY)

      watch(
        () => currentView.value,
        () => {
          popper?.updatePopper()
        }
      )
    }

    watch(
      () => defaultValue.value,
      (val) => {
        if (val) {
          innerDate.value = getDefaultValue()
        }
      },
      { immediate: true }
    )

    watch(
      () => props.parsedValue,
      (val) => {
        if (val) {
          if (selectionMode.value === 'dates') return
          if (Array.isArray(val)) return
          innerDate.value = val
        } else {
          innerDate.value = getDefaultValue()
        }
      },
      { immediate: true }
    )

    ctx.emit('set-picker-option', ['isValidValue', isValidValue])
    ctx.emit('set-picker-option', ['formatToString', formatToString])
    ctx.emit('set-picker-option', ['parseUserInput', parseUserInput])
    ctx.emit('set-picker-option', ['handleFocusPicker', handleFocusPicker])

    return {
      t,
      bemPicker,
      bemDate,
      userInputDate,
      userInputTime,
      currentViewRef,
      hasShortcuts,
      showTime,
      currentView,
      footerVisible,
      selectionMode,
      yearLabel,
      month,
      innerDate,
      disabledDate,
      cellClassName,
      arrowControl,
      shortcuts,
      visibleDate,
      visibleTime,
      timePickerVisible,
      timeFormat,
      onConfirm,
      onTimePickerInputFocus,
      changeToNow,
      handleKeydownTable,
      moveByYear,
      moveByMonth,
      showPicker,
      handleYearPick,
      handleMonthPick,
      handleDatePick,
      handleShortcutClick,
      handleVisibleDateChange,
      handleTimePickClose,
      handleVisibleTimeChange,
      handleTimePick,
      handleTableRows
    }
  }
})
</script>
