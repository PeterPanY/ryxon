<template>
  <div v-if="actualVisible" :class="[bemPicker(), 'r-picker-panel']">
    <div :class="bemPicker('content')">
      <div :class="bemPicker('cell')">
        <div :class="bemPicker('header')">
          {{ t('rDatepicker.startTime') }}
        </div>
        <div
          :class="[
            bemPicker('body'),
            bemTime('content'),
            isBem('arrow', arrowControl),
            { 'has-seconds': showSeconds }
          ]"
        >
          <time-spinner
            ref="minSpinner"
            role="start"
            :show-seconds="showSeconds"
            :am-pm-mode="amPmMode"
            :arrow-control="arrowControl"
            :spinner-date="startTime"
            :disabled-hours="disabledHours_"
            :disabled-minutes="disabledMinutes_"
            :disabled-seconds="disabledSeconds_"
            @change="handleMinChange"
            @set-option="onSetOption"
            @select-range="setMinSelectionRange"
          />
        </div>
      </div>
      <div :class="bemPicker('cell')">
        <div :class="bemPicker('header')">
          {{ t('rDatepicker.endTime') }}
        </div>
        <div
          :class="[
            bemPicker('body'),
            bemTime('content'),
            isBem('arrow', arrowControl),
            { 'has-seconds': showSeconds }
          ]"
        >
          <time-spinner
            ref="maxSpinner"
            role="end"
            :show-seconds="showSeconds"
            :am-pm-mode="amPmMode"
            :arrow-control="arrowControl"
            :spinner-date="endTime"
            :disabled-hours="disabledHours_"
            :disabled-minutes="disabledMinutes_"
            :disabled-seconds="disabledSeconds_"
            @change="handleMaxChange"
            @set-option="onSetOption"
            @select-range="setMaxSelectionRange"
          />
        </div>
      </div>
    </div>
    <div :class="bemTime('footer')">
      <button
        type="button"
        :class="[bemTime('btn'), 'cancel']"
        @click="handleCancel()"
      >
        {{ t('rDatepicker.cancel') }}
      </button>
      <button
        type="button"
        :class="[bemTime('btn'), 'confirm']"
        :disabled="btnConfirmDisabled"
        @click="handleConfirm()"
      >
        {{ t('rDatepicker.confirm') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, unref, inject, computed, defineComponent } from 'vue'
import dayjs from 'dayjs'
import { union } from 'lodash-unified'
import { isArray, createNamespace } from '../../utils'
import { useCurrentLang } from '../../locale'
import { panelTimeRangeProps } from '../props/panel-time-range'
import { useTimePanel } from '../composables/use-time-panel'
import {
  buildAvailableTimeSlotGetter,
  useOldValue
} from '../composables/use-time-picker'
import TimeSpinner from './basic-time-spinner.vue'
import type { Dayjs } from 'dayjs'

export default defineComponent({
  components: {
    TimeSpinner
  },
  props: panelTimeRangeProps,
  emits: ['pick', 'select-range', 'set-picker-option'],
  setup(props, { emit }) {
    const [, bemPicker, t, isBem] = createNamespace('time-range-picker')
    const [, bemTime] = createNamespace('time-panel')
    const lang = useCurrentLang()

    const makeSelectRange = (start: number, end: number) => {
      const result: number[] = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    }

    const pickerBase = inject('EP_PICKER_BASE') as any
    const {
      arrowControl,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      defaultValue
    } = pickerBase.props

    const startTime = computed(() => props.parsedValue![0])
    const endTime = computed(() => props.parsedValue![1])
    const oldValue = useOldValue(props)
    const handleCancel = () => {
      emit('pick', oldValue.value, false)
    }
    const showSeconds = computed(() => props.format.includes('ss'))
    const amPmMode = computed(() => {
      if (props.format.includes('A')) return 'A'
      if (props.format.includes('a')) return 'a'
      return ''
    })

    const handleConfirm = (visible = false) => {
      emit('pick', [startTime.value, endTime.value], visible)
    }

    const handleChange = (start: Dayjs, end: Dayjs) => {
      // todo getRangeAvailableTime(_date).millisecond(0)
      emit('pick', [start, end], true)
    }

    const handleMinChange = (date: Dayjs) => {
      handleChange(date.millisecond(0), endTime.value)
    }
    const handleMaxChange = (date: Dayjs) => {
      handleChange(startTime.value, date.millisecond(0))
    }

    const disabledHours_ = (role: string, compare?: Dayjs) => {
      const defaultDisable = disabledHours ? disabledHours(role) : []
      const isStart = role === 'start'
      const compareDate = compare || (isStart ? endTime.value : startTime.value)
      const compareHour = compareDate.hour()
      const nextDisable = isStart
        ? makeSelectRange(compareHour + 1, 23)
        : makeSelectRange(0, compareHour - 1)
      return union(defaultDisable, nextDisable)
    }
    const disabledMinutes_ = (hour: number, role: string, compare?: Dayjs) => {
      const defaultDisable = disabledMinutes ? disabledMinutes(hour, role) : []
      const isStart = role === 'start'
      const compareDate = compare || (isStart ? endTime.value : startTime.value)
      const compareHour = compareDate.hour()
      if (hour !== compareHour) {
        return defaultDisable
      }
      const compareMinute = compareDate.minute()
      const nextDisable = isStart
        ? makeSelectRange(compareMinute + 1, 59)
        : makeSelectRange(0, compareMinute - 1)
      return union(defaultDisable, nextDisable)
    }
    const disabledSeconds_ = (
      hour: number,
      minute: number,
      role: string,
      compare?: Dayjs
    ) => {
      const defaultDisable = disabledSeconds
        ? disabledSeconds(hour, minute, role)
        : []
      const isStart = role === 'start'
      const compareDate = compare || (isStart ? endTime.value : startTime.value)
      const compareHour = compareDate.hour()
      const compareMinute = compareDate.minute()
      if (hour !== compareHour || minute !== compareMinute) {
        return defaultDisable
      }
      const compareSecond = compareDate.second()
      const nextDisable = isStart
        ? makeSelectRange(compareSecond + 1, 59)
        : makeSelectRange(0, compareSecond - 1)
      return union(defaultDisable, nextDisable)
    }

    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } =
      buildAvailableTimeSlotGetter(
        disabledHours_,
        disabledMinutes_,
        disabledSeconds_
      )

    const {
      timePickerOptions,

      getAvailableTime,
      onSetOption
    } = useTimePanel({
      getAvailableHours,
      getAvailableMinutes,
      getAvailableSeconds
    })

    const getRangeAvailableTime = ([start, end]: Array<Dayjs>) =>
      [
        getAvailableTime(start, 'start', true, end),
        getAvailableTime(end, 'end', false, start)
      ] as const

    const isValidValue = (_date: Dayjs[]) => {
      const parsedDate = _date.map((_) => dayjs(_).locale(lang.value))
      const result = getRangeAvailableTime(parsedDate)
      return parsedDate[0].isSame(result[0]) && parsedDate[1].isSame(result[1])
    }

    const btnConfirmDisabled = computed(() => startTime.value > endTime.value)

    const selectionRange = ref([0, 2])
    const setMinSelectionRange = (start: number, end: number) => {
      emit('select-range', start, end, 'min')
      selectionRange.value = [start, end]
    }

    const offset = computed(() => (showSeconds.value ? 11 : 8))
    const setMaxSelectionRange = (start: number, end: number) => {
      emit('select-range', start, end, 'max')
      const _offset = unref(offset)
      selectionRange.value = [start + _offset, end + _offset]
    }

    const changeSelectionRange = (step: number) => {
      const list = showSeconds.value ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11]
      const mapping = ['hours', 'minutes'].concat(
        showSeconds.value ? ['seconds'] : []
      )
      const index = list.indexOf(selectionRange.value[0])
      const next = (index + step + list.length) % list.length
      const half = list.length / 2
      if (next < half) {
        timePickerOptions.start_emitSelectRange(mapping[next])
      } else {
        timePickerOptions.end_emitSelectRange(mapping[next - half])
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const { code } = event

      if (['ArrowLeft', 'ArrowRight'].includes(code)) {
        const step = code === 'ArrowLeft' ? -1 : 1
        changeSelectionRange(step)
        event.preventDefault()
        return
      }

      if (['ArrowUp', 'ArrowDown'].includes(code)) {
        const step = code === 'ArrowUp' ? -1 : 1
        const role = selectionRange.value[0] < offset.value ? 'start' : 'end'
        timePickerOptions[`${role}_scrollDown`](step)
        event.preventDefault()
      }
    }

    const parseUserInput = (days: Dayjs[] | Dayjs) => {
      if (!days) return null
      if (isArray(days)) {
        return days.map((d) => dayjs(d, props.format).locale(lang.value))
      }
      return dayjs(days, props.format).locale(lang.value)
    }

    const formatToString = (days: Dayjs[] | Dayjs) => {
      if (!days) return null
      if (isArray(days)) {
        return days.map((d) => d.format(props.format))
      }
      return days.format(props.format)
    }

    const getDefaultValue = () => {
      if (isArray(defaultValue)) {
        return defaultValue.map((d: Date) => dayjs(d).locale(lang.value))
      }
      const defaultDay = dayjs(defaultValue).locale(lang.value)
      return [defaultDay, defaultDay.add(60, 'm')]
    }

    emit('set-picker-option', ['formatToString', formatToString])
    emit('set-picker-option', ['parseUserInput', parseUserInput])
    emit('set-picker-option', ['isValidValue', isValidValue])
    emit('set-picker-option', ['handleKeydownInput', handleKeydown])
    emit('set-picker-option', ['getDefaultValue', getDefaultValue])
    emit('set-picker-option', ['getRangeAvailableTime', getRangeAvailableTime])

    return {
      t,
      bemPicker,
      bemTime,
      isBem,
      btnConfirmDisabled,
      showSeconds,
      arrowControl,
      amPmMode,
      startTime,
      endTime,
      disabledHours_,
      disabledMinutes_,
      disabledSeconds_,
      handleCancel,
      handleConfirm,
      handleMinChange,
      handleMaxChange,
      onSetOption,
      setMinSelectionRange,
      setMaxSelectionRange
    }
  }
})
</script>
