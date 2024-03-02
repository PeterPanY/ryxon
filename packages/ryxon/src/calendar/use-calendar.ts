import { ref, unref, computed, type ComponentPublicInstance } from 'vue'
import type { Dayjs } from 'dayjs'
import { useCurrentLang } from '../locale'
import { isEqual, isArray } from '@ryxon/utils'
import {
  UserInput,
  DayOrDays,
  PickerOptions,
  SingleOrRange,
  DateModelType
} from '../time-picker-pc/common/props'
import { formatter, parseDate, valueEquals } from '../time-picker-pc/utils'

export const useCalendar = (props: any, { emit }: any) => {
  const lang = useCurrentLang()

  const pickerVisible = ref(false)
  const ignoreFocusEvent = ref(false)

  const userInput = ref<UserInput>(null)

  const pickerOptions = ref<Partial<PickerOptions>>({})

  const valueIsEmpty = computed(() => {
    const { modelValue } = props
    return (
      !modelValue || (isArray(modelValue) && !modelValue.filter(Boolean).length)
    )
  })

  const parsedValue = computed(() => {
    let dayOrDays: DayOrDays
    if (valueIsEmpty.value) {
      if (pickerOptions.value.getDefaultValue) {
        dayOrDays = pickerOptions.value.getDefaultValue()
      }
    } else if (isArray(props.modelValue)) {
      dayOrDays = props.modelValue.map((d: string | number | Date) =>
        parseDate(d, props.valueFormat, lang.value)
      ) as [Dayjs, Dayjs]
    } else {
      dayOrDays = parseDate(props.modelValue, props.valueFormat, lang.value)!
    }

    if (pickerOptions.value.getRangeAvailableTime) {
      const availableResult = pickerOptions.value.getRangeAvailableTime(
        dayOrDays!
      )
      if (!isEqual(availableResult, dayOrDays!)) {
        dayOrDays = availableResult
        emitInput(
          (isArray(dayOrDays)
            ? dayOrDays.map((_) => _.toDate())
            : dayOrDays.toDate()) as SingleOrRange<Date>
        )
      }
    }
    if (isArray(dayOrDays!) && dayOrDays.some((day) => !day)) {
      dayOrDays = [] as unknown as DayOrDays
    }
    return dayOrDays!
  })

  const emitInput = (input: SingleOrRange<DateModelType | Dayjs> | null) => {
    if (!valueEquals(props.modelValue, input)) {
      let formatted
      if (isArray(input)) {
        formatted = input.map((item) =>
          formatter(item, props.valueFormat, lang.value)
        )
      } else if (input) {
        formatted = formatter(input, props.valueFormat, lang.value)
      }
      emit('update:modelValue', input ? formatted : input, lang.value)
    }
  }

  const onPick = (date: any = '', visible = false) => {
    if (!visible) {
      ignoreFocusEvent.value = true
    }
    pickerVisible.value = visible
    let result
    if (isArray(date)) {
      result = date.map((_) => _.toDate())
    } else {
      // clear btn emit null
      result = date ? date.toDate() : date
    }
    userInput.value = null
    emitInput(result)
  }

  const isRangeInput = computed(() => props.type.includes('range'))
  const inputRef = ref<HTMLElement | ComponentPublicInstance>()

  const refInput = computed<HTMLInputElement[]>(() => {
    if (inputRef.value) {
      const _r = isRangeInput.value
        ? inputRef.value
        : (inputRef.value as any as ComponentPublicInstance).$el
      return Array.from<HTMLInputElement>(_r.querySelectorAll('input'))
    }
    return []
  })

  const setSelectionRange = (
    start: number,
    end: number,
    pos?: 'min' | 'max'
  ) => {
    const _inputs = refInput.value
    if (!_inputs.length) return
    if (!pos || pos === 'min') {
      _inputs[0].setSelectionRange(start, end)
      _inputs[0].focus()
    } else if (pos === 'max') {
      _inputs[1].setSelectionRange(start, end)
      _inputs[1].focus()
    }
  }

  const onSetPickerOption = <T extends keyof PickerOptions>(
    e: [T, PickerOptions[T]]
  ) => {
    pickerOptions.value[e[0]] = e[1]
    pickerOptions.value.panelReady = true
  }

  const onCalendarChange = (e: [Date, false | Date]) => {
    emit('calendar-change', e)
  }

  const onPanelChange = (
    value: [Dayjs, Dayjs],
    mode: 'month' | 'year',
    view: unknown
  ) => {
    emit('panel-change', value, mode, view)
  }

  const focus = (focusStartInput = true, isIgnoreFocusEvent = false) => {
    ignoreFocusEvent.value = isIgnoreFocusEvent
    const [leftInput, rightInput] = unref(refInput)
    let input = leftInput
    if (!focusStartInput && isRangeInput.value) {
      input = rightInput
    }
    if (input) {
      input.focus()
    }
  }

  const onKeydownPopperContent = (event: KeyboardEvent) => {
    if ((event as KeyboardEvent)?.key === 'Escape') {
      focus(true, true)
    }
  }

  return {
    parsedValue,
    pickerVisible,
    ignoreFocusEvent,
    valueIsEmpty,
    userInput,
    pickerOptions,
    isRangeInput,
    inputRef,
    refInput,
    emitInput,
    onPick,
    setSelectionRange,
    onSetPickerOption,
    onCalendarChange,
    onPanelChange,
    onKeydownPopperContent,
    focus
  }
}
