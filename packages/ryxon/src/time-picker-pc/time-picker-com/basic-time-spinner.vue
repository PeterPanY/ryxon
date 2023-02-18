<template>
  <div :class="[bem(), { 'has-seconds': showSeconds }]">
    <template v-if="!arrowControl">
      <r-scrollbar
        v-for="item in spinnerItems"
        :key="item"
        :ref="(scrollbar: unknown) => setRef(scrollbar as any, item)"
        :class="bem('wrapper')"
        :wrap-style="{ maxHeight: 'inherit' }"
        :view-class="bem('list')"
        noresize
        tag="ul"
        @mouseenter="emitSelectRange(item)"
        @mousemove="adjustCurrentSpinner(item)"
      >
        <li
          v-for="(disabled, key) in timeList[item]"
          :key="key"
          :class="[
            bem('item'),
            isBem('active', key === timePartials[item]),
            isBem('disabled', disabled)
          ]"
          @click="handleClick(item, { value: key, disabled })"
        >
          <template v-if="item === 'hours'">
            {{ ('0' + (amPmMode ? key % 12 || 12 : key)).slice(-2)
            }}{{ getAmPmFlag(key) }}
          </template>
          <template v-else>
            {{ ('0' + key).slice(-2) }}
          </template>
        </li>
      </r-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        v-for="item in spinnerItems"
        :key="item"
        :class="[bem('wrapper'), isBem('arrow')]"
        @mouseenter="emitSelectRange(item)"
      >
        <r-icon
          v-repeat-click="onDecrement"
          :class="['arrow-up', bem('arrow')]"
        >
          <arrow-up />
        </r-icon>
        <r-icon
          v-repeat-click="onIncrement"
          :class="['arrow-down', bem('arrow')]"
        >
          <arrow-down />
        </r-icon>

        <ul :class="bem('list')">
          <li
            v-for="(time, key) in arrowControlTimeList[item]"
            :key="key"
            :class="[
              bem('item'),
              isBem('active', time === timePartials[item]),
              isBem('disabled', timeList[item][time!]),
            ]"
          >
            <template v-if="typeof time === 'number'">
              <template v-if="item === 'hours'">
                {{ ('0' + (amPmMode ? time % 12 || 12 : time)).slice(-2)
                }}{{ getAmPmFlag(time) }}
              </template>
              <template v-else>
                {{ ('0' + time).slice(-2) }}
              </template>
            </template>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {
  ref,
  unref,
  watch,
  computed,
  nextTick,
  onMounted,
  defineComponent
} from 'vue'
import { debounce } from 'lodash-unified'
import { createNamespace } from '../../utils'
import { useRepeatClick as RepeatClick } from '../../composables/use-repeat-click'
import { basicTimeSpinnerProps } from '../props/basic-time-spinner'
import { getTimeLists } from '../composables/use-time-picker'
import { timeUnits } from '../constants'
import { buildTimeList } from '../utils'
import type { Ref } from 'vue'
import type { ComponentInstance } from '../../utils'
import type { TimeUnit } from '../constants'
import type { TimeList } from '../utils'
import type { ScrollbarProps } from '../../scrollbar'
import { Icon } from '../../icon'
import { Scrollbar } from '../../scrollbar'
import { ArrowDown, ArrowUp } from '@ryxon/icons'

export default defineComponent({
  components: {
    RIcon: Icon,
    RScrollbar: Scrollbar,
    ArrowDown,
    ArrowUp
  },
  directives: { RepeatClick },
  props: basicTimeSpinnerProps,
  emits: ['change', 'select-range', 'set-option'],
  setup(props, { emit }) {
    const [, bem, , isBem] = createNamespace('time-spinner')

    const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(
      props.disabledHours,
      props.disabledMinutes,
      props.disabledSeconds
    )

    // data
    let isScrolling = false

    const currentScrollbar = ref<TimeUnit>()
    const listHoursRef = ref<ComponentInstance>()
    const listMinutesRef = ref<ComponentInstance>()
    const listSecondsRef = ref<ComponentInstance>()
    const listRefsMap: Record<TimeUnit, Ref<ComponentInstance | undefined>> = {
      hours: listHoursRef,
      minutes: listMinutesRef,
      seconds: listSecondsRef
    }

    // computed
    const spinnerItems = computed(() =>
      props.showSeconds ? timeUnits : timeUnits.slice(0, 2)
    )

    const timePartials = computed<Record<TimeUnit, number>>(() => {
      const { spinnerDate } = props

      const hours = spinnerDate && spinnerDate.hour && spinnerDate.hour()
      const minutes = spinnerDate && spinnerDate.minute && spinnerDate.minute()
      const seconds = spinnerDate && spinnerDate.second && spinnerDate.second()
      return { hours, minutes, seconds }
    })

    const timeList = computed(() => {
      const { hours, minutes } = unref(timePartials)
      return {
        hours: getHoursList(props.role),
        minutes: getMinutesList(hours, props.role),
        seconds: getSecondsList(hours, minutes, props.role)
      }
    })

    const arrowControlTimeList = computed<Record<TimeUnit, TimeList>>(() => {
      const { hours, minutes, seconds } = unref(timePartials)

      return {
        hours: buildTimeList(hours, 23),
        minutes: buildTimeList(minutes, 59),
        seconds: buildTimeList(seconds, 59)
      }
    })

    const getScrollbarElement = (el: HTMLElement) =>
      el.querySelector(`.r-scrollbar__wrap`) as HTMLElement

    const typeItemHeight = (type: TimeUnit): number => {
      const scrollbar = unref(listRefsMap[type])
      return scrollbar?.$el.querySelector('li').offsetHeight || 0
    }

    const adjustSpinner = (type: TimeUnit, value: number) => {
      if (props.arrowControl) return
      const scrollbar = unref(listRefsMap[type])
      if (scrollbar && scrollbar.$el) {
        getScrollbarElement(scrollbar.$el).scrollTop = Math.max(
          0,
          value * typeItemHeight(type)
        )
      }
    }

    const adjustCurrentSpinner = (type: TimeUnit) => {
      adjustSpinner(type, unref(timePartials)[type])
    }

    const debouncedResetScroll = debounce((type) => {
      isScrolling = false
      adjustCurrentSpinner(type)
    }, 200)

    const getAmPmFlag = (hour: number) => {
      const shouldShowAmPm = !!props.amPmMode
      if (!shouldShowAmPm) return ''
      const isCapital = props.amPmMode === 'A'
      // todo locale
      let content = hour < 12 ? ' am' : ' pm'
      if (isCapital) content = content.toUpperCase()
      return content
    }

    const emitSelectRange = (type: TimeUnit) => {
      let range

      switch (type) {
        case 'hours':
          range = [0, 2]
          break
        case 'minutes':
          range = [3, 5]
          break
        case 'seconds':
          range = [6, 8]
          break
      }
      const [left, right] = range

      emit('select-range', left, right)
      currentScrollbar.value = type
    }

    const adjustSpinners = () => {
      adjustCurrentSpinner('hours')
      adjustCurrentSpinner('minutes')
      adjustCurrentSpinner('seconds')
    }

    const modifyDateField = (type: TimeUnit, value: number) => {
      const list = unref(timeList)[type]
      const isDisabled = list[value]
      if (isDisabled) return

      const { hours, minutes, seconds } = unref(timePartials)

      let changeTo
      switch (type) {
        case 'hours':
          changeTo = props.spinnerDate
            .hour(value)
            .minute(minutes)
            .second(seconds)
          break
        case 'minutes':
          changeTo = props.spinnerDate.hour(hours).minute(value).second(seconds)
          break
        case 'seconds':
          changeTo = props.spinnerDate.hour(hours).minute(minutes).second(value)
          break
      }
      emit('change', changeTo)
    }

    const findNextUnDisabled = (
      type: TimeUnit,
      now: number,
      step: number,
      total: number
    ) => {
      let next = (now + step + total) % total
      const list = unref(timeList)[type]
      while (list[next] && next !== now) {
        next = (next + step + total) % total
      }
      return next
    }

    const scrollDown = (step: number) => {
      if (!currentScrollbar.value) {
        emitSelectRange('hours')
      }

      const label = currentScrollbar.value!
      const now = unref(timePartials)[label]
      const total = currentScrollbar.value === 'hours' ? 24 : 60
      const next = findNextUnDisabled(label, now, step, total)

      modifyDateField(label, next)
      adjustSpinner(label, next)
      nextTick(() => emitSelectRange(label))
    }

    const onIncrement = () => {
      scrollDown(1)
    }

    const onDecrement = () => {
      scrollDown(-1)
    }

    const handleClick = (
      type: TimeUnit,
      { value, disabled }: { value: number; disabled: boolean }
    ) => {
      if (!disabled) {
        modifyDateField(type, value)
        emitSelectRange(type)
        adjustSpinner(type, value)
      }
    }

    const scrollBarHeight = (type: TimeUnit) =>
      unref(listRefsMap[type])!.$el.offsetHeight

    const handleScroll = (type: TimeUnit) => {
      isScrolling = true
      debouncedResetScroll(type)
      const value = Math.min(
        Math.round(
          (getScrollbarElement(unref(listRefsMap[type])!.$el).scrollTop -
            (scrollBarHeight(type) * 0.5 - 10) / typeItemHeight(type) +
            3) /
            typeItemHeight(type)
        ),
        type === 'hours' ? 23 : 59
      )
      modifyDateField(type, value)
    }

    const bindScrollEvent = () => {
      const bindFunction = (type: TimeUnit) => {
        const scrollbar = unref(listRefsMap[type])
        if (scrollbar && scrollbar.$el) {
          getScrollbarElement(scrollbar.$el).onscroll = () => {
            // TODO: scroll is emitted when set scrollTop programmatically
            // should find better solutions in the future!
            handleScroll(type)
          }
        }
      }
      bindFunction('hours')
      bindFunction('minutes')
      bindFunction('seconds')
    }

    onMounted(() => {
      nextTick(() => {
        !props.arrowControl && bindScrollEvent()
        adjustSpinners()
        // set selection on the first hour part
        if (props.role === 'start') emitSelectRange('hours')
      })
    })

    const setRef = (scrollbar: ScrollbarProps, type: TimeUnit) => {
      listRefsMap[type].value = scrollbar
    }

    emit('set-option', [`${props.role}_scrollDown`, scrollDown])
    emit('set-option', [`${props.role}_emitSelectRange`, emitSelectRange])

    watch(
      () => props.spinnerDate,
      () => {
        if (isScrolling) return
        adjustSpinners()
      }
    )

    return {
      bem,
      isBem,
      spinnerItems,
      setRef,
      emitSelectRange,
      adjustCurrentSpinner,
      timeList,
      timePartials,
      arrowControlTimeList,
      handleClick,
      getAmPmFlag,
      onDecrement,
      onIncrement
    }
  }
})
</script>
