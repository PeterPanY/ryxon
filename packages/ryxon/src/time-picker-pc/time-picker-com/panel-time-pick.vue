<template>
  <transition :name="transitionName">
    <div v-if="actualVisible || visible" :class="bem()">
      <div :class="[bem('content'), { 'has-seconds': showSeconds }]">
        <time-spinner
          ref="spinner"
          :role="datetimeRole || 'start'"
          :arrow-control="arrowControl"
          :show-seconds="showSeconds"
          :am-pm-mode="amPmMode"
          :spinner-date="parsedValue"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          @change="handleChange"
          @set-option="onSetOption"
          @select-range="setSelectionRange"
        ></time-spinner>
      </div>
      <div :class="bem('footer')">
        <button
          type="button"
          :class="[bem('btn'), 'cancel']"
          @click="handleCancel"
        >
          {{ t('rDatepicker.cancel') }}
        </button>
        <button
          type="button"
          :class="[bem('btn'), 'confirm']"
          @click="handleConfirm()"
        >
          {{ t('rDatepicker.confirm') }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, inject, defineComponent } from 'vue'
import dayjs from 'dayjs'
import { isUndefined, createNamespace } from '../../utils'
import { useCurrentLang } from '../../locale'
import { panelTimePickerProps } from '../props/panel-time-picker'
import { useTimePanel } from '../composables/use-time-panel'
import {
  buildAvailableTimeSlotGetter,
  useOldValue
} from '../composables/use-time-picker'
import type { Dayjs } from 'dayjs'
import TimeSpinner from './basic-time-spinner.vue'

export default defineComponent({
  components: { TimeSpinner },
  props: panelTimePickerProps,
  emits: ['pick', 'select-range', 'set-picker-option'],
  setup(props, { emit }) {
    const [, bem, t] = createNamespace('time-panel')
    const lang = useCurrentLang()

    // Injections
    const pickerBase = inject('EP_PICKER_BASE') as any
    const {
      arrowControl,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      defaultValue
    } = pickerBase.props
    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } =
      buildAvailableTimeSlotGetter(
        disabledHours,
        disabledMinutes,
        disabledSeconds
      )

    // data
    const selectionRange = ref([0, 2])
    const oldValue = useOldValue(props)

    const transitionName = computed(() =>
      isUndefined(props.actualVisible) ? `r-zoom-in-top` : ''
    )

    const showSeconds = computed(() => props.format.includes('ss'))
    const amPmMode = computed(() => {
      if (props.format.includes('A')) return 'A'
      if (props.format.includes('a')) return 'a'
      return ''
    })
    // method
    const { timePickerOptions, onSetOption, getAvailableTime } = useTimePanel({
      getAvailableHours,
      getAvailableMinutes,
      getAvailableSeconds
    })

    const getRangeAvailableTime = (date: Dayjs) =>
      getAvailableTime(date, props.datetimeRole || '', true)

    const isValidValue = (_date: Dayjs) => {
      const parsedDate = dayjs(_date).locale(lang.value)
      const result = getRangeAvailableTime(parsedDate)
      return parsedDate.isSame(result)
    }
    const handleCancel = () => {
      emit('pick', oldValue.value, false)
    }
    const handleConfirm = (visible = false, first = false) => {
      if (first) return
      emit('pick', props.parsedValue, visible)
    }
    const handleChange = (_date: Dayjs) => {
      // visible avoids edge cases, when use scrolls during panel closing animation
      if (!props.visible) {
        return
      }
      const result = getRangeAvailableTime(_date).millisecond(0)
      emit('pick', result, true)
    }

    const setSelectionRange = (start: number, end: number) => {
      emit('select-range', start, end)
      selectionRange.value = [start, end]
    }

    const changeSelectionRange = (step: number) => {
      const list = [0, 3].concat(showSeconds.value ? [6] : [])
      const mapping = ['hours', 'minutes'].concat(
        showSeconds.value ? ['seconds'] : []
      )
      const index = list.indexOf(selectionRange.value[0])
      const next = (index + step + list.length) % list.length
      timePickerOptions.start_emitSelectRange(mapping[next])
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
        timePickerOptions.start_scrollDown(step)
        event.preventDefault()
      }
    }

    const parseUserInput = (value: Dayjs) => {
      if (!value) return null
      return dayjs(value, props.format).locale(lang.value)
    }

    const formatToString = (value: Dayjs) => {
      if (!value) return null
      return value.format(props.format)
    }

    const getDefaultValue = () => dayjs(defaultValue).locale(lang.value)

    emit('set-picker-option', ['isValidValue', isValidValue])
    emit('set-picker-option', ['formatToString', formatToString])
    emit('set-picker-option', ['parseUserInput', parseUserInput])
    emit('set-picker-option', ['handleKeydownInput', handleKeydown])
    emit('set-picker-option', ['getRangeAvailableTime', getRangeAvailableTime])
    emit('set-picker-option', ['getDefaultValue', getDefaultValue])

    return {
      t,
      bem,
      transitionName,
      showSeconds,
      arrowControl,
      amPmMode,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      handleChange,
      onSetOption,
      setSelectionRange,
      handleCancel,
      handleConfirm
    }
  }
})
</script>
