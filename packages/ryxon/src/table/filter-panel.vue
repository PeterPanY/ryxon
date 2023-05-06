<template>
  <r-tooltip
    ref="tooltip"
    :visible="tooltipVisible"
    :offset="[0, 0]"
    :placement="placement"
    :show-arrow="false"
    :stop-popper-mouse-event="false"
    theme="light"
    pure
    :popper-class="bem()"
    persistent
  >
    <template #content>
      <div v-if="multiple">
        <div :class="bem('content')">
          <r-scrollbar :wrap-class="bem('wrap')">
            <r-checkbox-group
              v-model="filteredValue"
              :class="bem('checkbox-group')"
            >
              <r-checkbox
                v-for="filter in filters"
                :key="filter.value"
                :name="filter.value"
              >
                {{ filter.text }}
              </r-checkbox>
            </r-checkbox-group>
          </r-scrollbar>
        </div>
        <div :class="bem('bottom')">
          <button
            :class="{ [isBem('disabled')]: filteredValue.length === 0 }"
            :disabled="filteredValue.length === 0"
            type="button"
            @click="handleConfirm"
          >
            {{ t('rTable.confirmFilter') }}
          </button>
          <button type="button" @click="handleReset">
            {{ t('rTable.resetFilter') }}
          </button>
        </div>
      </div>
      <ul v-else :class="bem('list')">
        <li
          :class="[
            bem('list-item'),
            {
              [isBem('active')]:
                filterValue === undefined || filterValue === null
            }
          ]"
          @click="handleSelect(null)"
        >
          {{ t('rTable.clearFilter') }}
        </li>
        <li
          v-for="filter in filters"
          :key="filter.value"
          :class="[bem('list-item'), isBem('active', isActive(filter))]"
          :label="filter.value"
          @click="handleSelect(filter.value)"
        >
          {{ filter.text }}
        </li>
      </ul>
    </template>
    <template #default>
      <span
        v-click-outside:[popperRef]="hideFilterPanel"
        :class="[`r-table__column-filter-trigger`, `r-none-outline`]"
        @click="showFilterPanel"
      >
        <r-icon>
          <arrow-up v-if="column.filterOpened" />
          <arrow-down v-else />
        </r-icon>
      </span>
    </template>
  </r-tooltip>
</template>

<script lang="ts">
// @ts-nocheck
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { Icon } from '../icon'
import { ArrowDown, ArrowUp } from '@ryxon/icons'
import ClickOutside from '../composables/use-click-outside'
import { createNamespace } from '../utils'
import { Tooltip } from '../tooltip'
import { Scrollbar } from '../scrollbar'
import type { PopoverPlacement } from '../popper'

import type { PropType, WritableComputedRef } from 'vue'
import type { TableColumnCtx } from './table-column/defaults'
import type { TableHeader } from './table-header'
import type { Store } from './store'

export default defineComponent({
  name: 'RTableFilterPanel',
  components: {
    RCheckbox: Checkbox,
    RCheckboxGroup: CheckboxGroup,
    RScrollbar: Scrollbar,
    RTooltip: Tooltip,
    RIcon: Icon,
    ArrowDown,
    ArrowUp
  },
  directives: { ClickOutside },
  props: {
    placement: {
      type: String as PropType<PopoverPlacement>,
      default: 'bottom-start'
    },
    store: { type: Object as PropType<Store<unknown>> },
    column: { type: Object as PropType<TableColumnCtx<unknown>> },
    upDataColumn: { type: Function }
  },
  setup(props) {
    const instance = getCurrentInstance()
    const [, bem, t, isBem] = createNamespace('table-filter')

    const parent = instance?.parent as TableHeader
    if (!parent.filterPanels.value[props.column.id]) {
      parent.filterPanels.value[props.column.id] = instance
    }
    const tooltipVisible = ref(false)

    const tooltip = ref<InstanceType | null>(null)

    const filters = computed(() => props.column && props.column.filters)

    const filteredValue: WritableComputedRef<unknown[]> = computed({
      get() {
        if (props.column) {
          return props.column.filteredValue || []
        }
        return []
      },
      set(value: unknown[]) {
        if (props.column) {
          props.upDataColumn('filteredValue', value)
        }
      }
    })

    const filterValue = computed({
      get: () => (props.column?.filteredValue || [])[0],
      set: (value: string) => {
        if (filteredValue.value) {
          if (typeof value !== 'undefined' && value !== null) {
            filteredValue.value.splice(0, 1, value)
          } else {
            filteredValue.value.splice(0, 1)
          }
        }
      }
    })

    const multiple = computed(() => {
      if (props.column) {
        return props.column.filterMultiple
      }
      return true
    })
    const isActive = (filter) => filter.value === filterValue.value
    const hidden = () => {
      tooltipVisible.value = false
    }
    const showFilterPanel = (e: MouseEvent) => {
      e.stopPropagation()
      tooltipVisible.value = !tooltipVisible.value
    }
    const hideFilterPanel = () => {
      tooltipVisible.value = false
    }

    const confirmFilter = (filteredValue: unknown[]) => {
      props.store.commit('filterChange', {
        column: props.column,
        values: filteredValue
      })
      props.store.updateAllSelected()
    }

    const handleConfirm = () => {
      confirmFilter(filteredValue.value)
      hidden()
    }
    const handleReset = () => {
      filteredValue.value = []
      confirmFilter(filteredValue.value)
      hidden()
    }

    const handleSelect = (_filterValue?: string) => {
      filterValue.value = _filterValue
      if (typeof _filterValue !== 'undefined' && _filterValue !== null) {
        confirmFilter(filteredValue.value)
      } else {
        confirmFilter([])
      }
      hidden()
    }

    watch(
      tooltipVisible,
      (value) => {
        // todo
        if (props.column) {
          props.upDataColumn('filterOpened', value)
        }
      },
      {
        immediate: true
      }
    )

    const popperRef = computed(
      () => tooltip.value?.contentRef.value?.popupRef.value
    )

    return {
      tooltipVisible,
      multiple,
      filteredValue,
      filterValue,
      filters,
      handleConfirm,
      handleReset,
      handleSelect,
      isActive,
      t,
      bem,
      isBem,
      showFilterPanel,
      hideFilterPanel,
      popperRef,
      tooltip
    }
  }
})
</script>
