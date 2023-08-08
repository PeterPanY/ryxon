<template>
  <div
    :class="[
      ppNs(),
      drpNs(),
      {
        'has-sidebar': Boolean($slots.sidebar) || hasShortcuts
      }
    ]"
  >
    <div :class="ppNs('body-wrapper')">
      <slot name="sidebar" :class="ppNs('sidebar')" />
      <div v-if="hasShortcuts" :class="ppNs('sidebar')">
        <button
          v-for="(shortcut, key) in shortcuts"
          :key="key"
          type="button"
          :class="ppNs('shortcut')"
          @click="handleShortcutClick(shortcut)"
        >
          {{ shortcut.text }}
        </button>
      </div>

      <div :class="ppNs('body')">
        <div :class="[ppNs('content'), drpNs('content')]" class="is-left">
          <div :class="drpNs('header')">
            <button
              type="button"
              :class="ppNs('icon-btn')"
              class="d-arrow-left"
              @click="leftPrevYear"
            >
              <r-icon><d-arrow-left /></r-icon>
            </button>
            <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="[
                ppNs('icon-btn'),
                { [isBem('disabled')]: !enableYearArrow }
              ]"
              class="d-arrow-right"
              @click="leftNextYear"
            >
              <r-icon><d-arrow-right /></r-icon>
            </button>
            <div>{{ leftLabel }}</div>
          </div>
          <month-table
            selection-mode="range"
            :date="leftDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>

        <div :class="[ppNs('content'), drpNs('content')]" class="is-right">
          <div :class="drpNs('header')">
            <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="[ppNs('icon-btn'), { 'is-disabled': !enableYearArrow }]"
              class="d-arrow-left"
              @click="rightPrevYear"
            >
              <r-icon><d-arrow-left /></r-icon>
            </button>
            <button
              type="button"
              :class="ppNs('icon-btn')"
              class="d-arrow-right"
              @click="rightNextYear"
            >
              <r-icon><d-arrow-right /></r-icon>
            </button>
            <div>{{ rightLabel }}</div>
          </div>
          <month-table
            selection-mode="range"
            :date="rightDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { ref, toRef, inject, computed, defineComponent } from 'vue'
import dayjs from 'dayjs'
import { Icon } from '../../icon'
import { createNamespace } from '../../utils'
import { useCurrentLang } from '../../locale'
import { DArrowLeft, DArrowRight } from '@ryxon/icons'
import {
  panelMonthRangeEmits,
  panelMonthRangeProps
} from '../props/panel-month-range'
import { useMonthRangeHeader } from '../composables/use-month-range-header'
import { useRangePicker } from '../composables/use-range-picker'
import MonthTable from './basic-month-table.vue'
import type { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'RDatePickerMonthRange',
  components: {
    RIcon: Icon,
    DArrowLeft,
    DArrowRight,
    MonthTable
  },
  props: panelMonthRangeProps,
  emits: panelMonthRangeEmits,
  setup(props, { emit }) {
    const unit = 'year'
    const [, , isBem] = createNamespace('month-range')
    const lang = useCurrentLang()

    const pickerBase = inject('EP_PICKER_BASE') as any
    const { shortcuts, disabledDate, format } = pickerBase.props
    const defaultValue = toRef(pickerBase.props, 'defaultValue')
    const leftDate = ref(dayjs().locale(lang.value))
    const rightDate = ref(dayjs().locale(lang.value).add(1, unit))

    function onParsedValueChanged(
      minDate: Dayjs | undefined,
      maxDate: Dayjs | undefined
    ) {
      if (props.unlinkPanels && maxDate) {
        const minDateYear = minDate?.year() || 0
        const maxDateYear = maxDate.year()
        rightDate.value =
          minDateYear === maxDateYear ? maxDate.add(1, unit) : maxDate
      } else {
        rightDate.value = leftDate.value.add(1, unit)
      }
    }

    const {
      minDate,
      maxDate,
      rangeState,
      ppNs,
      drpNs,

      handleChangeRange,
      handleRangeConfirm,
      handleShortcutClick,
      onSelect
    } = useRangePicker(props, {
      defaultValue,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    })

    const hasShortcuts = computed(() => !!shortcuts.length)

    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useMonthRangeHeader({
      unlinkPanels: toRef(props, 'unlinkPanels'),
      leftDate,
      rightDate
    })

    const enableYearArrow = computed(
      () => props.unlinkPanels && rightYear.value > leftYear.value + 1
    )

    type RangePickValue = {
      minDate: Dayjs
      maxDate: Dayjs
    }

    const handleRangePick = (val: RangePickValue, close = true) => {
      // const defaultTime = props.defaultTime || []
      // const minDate_ = modifyWithTimeString(val.minDate, defaultTime[0])
      // const maxDate_ = modifyWithTimeString(val.maxDate, defaultTime[1])
      // todo
      const minDate_ = val.minDate
      const maxDate_ = val.maxDate
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return
      }
      maxDate.value = maxDate_
      minDate.value = minDate_

      if (!close) return
      handleRangeConfirm()
    }

    const formatToString = (days: Dayjs[]) =>
      days.map((day) => day.format(format))

    emit('set-picker-option', ['formatToString', formatToString])

    return {
      ppNs,
      drpNs,
      isBem,
      hasShortcuts,
      shortcuts,
      enableYearArrow,
      rangeState,
      disabledDate,
      leftLabel,
      rightLabel,
      leftDate,
      rightDate,
      leftPrevYear,
      rightPrevYear,
      leftNextYear,
      rightNextYear,
      maxDate,
      minDate,
      handleShortcutClick,
      handleChangeRange,
      handleRangePick,
      onSelect
    }
  }
})
</script>
