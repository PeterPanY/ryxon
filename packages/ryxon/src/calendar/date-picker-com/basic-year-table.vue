<template>
  <table
    role="grid"
    :aria-label="t('rDatepicker.yearTablePrompt')"
    :class="bem()"
    @click="handleYearTableClick"
  >
    <tbody ref="tbodyRef">
      <tr v-for="(_, i) in 3" :key="i">
        <template v-for="(__, j) in 4">
          <td
            v-if="i * 4 + j < 10"
            :key="i + '_' + j"
            :ref="
              (el) =>
                isSelectedCell(startYear + i * 4 + j) && (currentCellRef = el)
            "
            class="available"
            :class="getCellKls(startYear + i * 4 + j)"
            :aria-selected="`${isSelectedCell(startYear + i * 4 + j)}`"
            :tabindex="isSelectedCell(startYear + i * 4 + j) ? 0 : -1"
            @keydown.space.prevent.stop="handleYearTableClick"
            @keydown.enter.prevent.stop="handleYearTableClick"
          >
            <span class="cell">{{ startYear + i * 4 + j }}</span>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
// @ts-nocheck
import { ref, watch, computed, nextTick, defineComponent } from 'vue'
import dayjs from 'dayjs'
import { hasClass, newCastArray } from '@ryxon/utils'
import { createNamespace } from '../../utils'
import { useCurrentLang } from '../../locale'
import { basicYearTableProps } from '../props/basic-year-table'
import { rangeArr } from '../../time-picker-pc'
import { useExpose } from '../../composables/use-expose'

export default defineComponent({
  props: basicYearTableProps,
  emits: ['pick'],
  setup(props, { emit }) {
    const [, bem, t] = createNamespace('year-table')
    const lang = useCurrentLang()

    const datesInYear = (year: number, lang: string) => {
      const firstDay = dayjs(String(year)).locale(lang).startOf('year')
      const lastDay = firstDay.endOf('year')
      const numOfDays = lastDay.dayOfYear()
      return rangeArr(numOfDays).map((n) => firstDay.add(n, 'day').toDate())
    }

    const tbodyRef = ref<HTMLElement>()
    const currentCellRef = ref<HTMLElement>()
    const startYear = computed(() => Math.floor(props.date.year() / 10) * 10)

    const focus = () => {
      currentCellRef.value?.focus()
    }

    const getCellKls = (year: number) => {
      const kls: Record<string, boolean> = {}
      const today = dayjs().locale(lang.value)

      kls.disabled = props.disabledDate
        ? datesInYear(year, lang.value).every(props.disabledDate)
        : false

      kls.current =
        newCastArray(props.parsedValue).findIndex((d) => d!.year() === year) >=
        0

      kls.today = today.year() === year

      return kls
    }

    const isSelectedCell = (year: number) =>
      (year === startYear.value &&
        props.date.year() < startYear.value &&
        props.date.year() > startYear.value + 9) ||
      newCastArray(props.date).findIndex((date) => date.year() === year) >= 0

    const handleYearTableClick = (event: MouseEvent | KeyboardEvent) => {
      const clickTarget = event.target as HTMLDivElement
      const target = clickTarget.closest('td')
      if (target && target.textContent) {
        if (hasClass(target, 'disabled')) return
        const year = target.textContent || target.innerText
        emit('pick', Number(year))
      }
    }

    watch(
      () => props.date,
      async () => {
        if (tbodyRef.value?.contains(document.activeElement)) {
          await nextTick()
          currentCellRef.value?.focus()
        }
      }
    )

    useExpose({
      focus // 当前单元格获得焦点
    })

    return {
      t,
      bem,
      tbodyRef,
      currentCellRef,
      startYear,
      isSelectedCell,
      getCellKls,
      handleYearTableClick
    }
  }
})
</script>
