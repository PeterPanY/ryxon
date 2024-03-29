import { computed } from 'vue'
import { createNamespace } from '../../utils'
import type { Ref, ToRef } from 'vue'
import type { Dayjs } from 'dayjs'

export const useMonthRangeHeader = ({
  unlinkPanels,
  leftDate,
  rightDate
}: {
  unlinkPanels: ToRef<boolean>
  leftDate: Ref<Dayjs>
  rightDate: Ref<Dayjs>
}) => {
  const [, , t] = createNamespace('user-month')
  const leftPrevYear = () => {
    leftDate.value = leftDate.value.subtract(1, 'year')
    if (!unlinkPanels.value) {
      rightDate.value = rightDate.value.subtract(1, 'year')
    }
  }

  const rightNextYear = () => {
    if (!unlinkPanels.value) {
      leftDate.value = leftDate.value.add(1, 'year')
    }
    rightDate.value = rightDate.value.add(1, 'year')
  }

  const leftNextYear = () => {
    leftDate.value = leftDate.value.add(1, 'year')
  }

  const rightPrevYear = () => {
    rightDate.value = rightDate.value.subtract(1, 'year')
  }
  const leftLabel = computed(
    () => `${leftDate.value.year()} ${t('rDatepicker.year')}`
  )

  const rightLabel = computed(
    () => `${rightDate.value.year()} ${t('rDatepicker.year')}`
  )

  const leftYear = computed(() => leftDate.value.year())

  const rightYear = computed(() =>
    rightDate.value.year() === leftDate.value.year()
      ? leftDate.value.year() + 1
      : rightDate.value.year()
  )

  return {
    leftPrevYear,
    rightNextYear,
    leftNextYear,
    rightPrevYear,
    leftLabel,
    rightLabel,
    leftYear,
    rightYear
  }
}
