<template>
  <div
    ref="tableWrapper"
    :class="[
      {
        [bem('fit')]: fit,
        [bem('striped')]: stripe,
        [bem('border')]: border || isGroup,
        [bem('hidden')]: isHidden,
        [bem('group')]: isGroup,
        [bem('fluid-height')]: maxHeight,
        [bem('scrollable-x')]: layout.scrollX.value,
        [bem('scrollable-y')]: layout.scrollY.value,
        [bem('enable-row-hover')]: !store.states.isComplex.value,
        [bem('enable-row-transition')]:
          (store.states.data.value || []).length !== 0 &&
          (store.states.data.value || []).length < 100,
        'has-footer': showSummary
      },
      bem(tableSize),
      className,
      bem(),
      bem(`layout-${tableLayout}`)
    ]"
    :style="style"
    data-prefix="r"
    @mouseleave="handleMouseLeave()"
  >
    <div :class="bem('inner-wrapper')" :style="tableInnerStyle">
      <div ref="hiddenColumns" class="hidden-columns">
        <slot />
      </div>
      <div
        v-if="showHeader && tableLayout === 'fixed'"
        ref="headerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        :class="bem('header-wrapper')"
      >
        <table
          ref="tableHeader"
          :class="bem('header')"
          :style="tableBodyStyles"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <hColgroup
            :columns="store.states.columns.value"
            :table-layout="tableLayout"
          />
          <table-header
            ref="tableHeaderRef"
            :border="border"
            :default-sort="defaultSort"
            :store="store"
            @set-drag-visible="setDragVisible"
          />
        </table>
      </div>
      <div ref="bodyWrapper" :class="bem('body-wrapper')">
        <r-scrollbar
          ref="scrollBarRef"
          :view-style="scrollbarViewStyle"
          :wrap-style="scrollbarStyle"
          :always="scrollbarAlwaysOn"
        >
          <table
            ref="tableBody"
            :class="bem('body')"
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{
              width: bodyWidth,
              tableLayout
            }"
          >
            <hColgroup
              :columns="store.states.columns.value"
              :table-layout="tableLayout"
            />

            <table-header
              v-if="showHeader && tableLayout === 'auto'"
              ref="tableHeaderRef"
              :border="border"
              :default-sort="defaultSort"
              :store="store"
              @set-drag-visible="setDragVisible"
            />

            <table-body
              :context="context"
              :highlight="highlightCurrentRow"
              :row-class-name="rowClassName"
              :tooltip-effect="tooltipEffect"
              :tooltip-options="tooltipOptions"
              :row-style="rowStyle"
              :store="store"
              :stripe="stripe"
            />
          </table>
          <div
            v-if="isEmpty"
            ref="emptyBlock"
            :style="emptyBlockStyle"
            :class="bem('empty-block')"
          >
            <span :class="bem('empty-text')">
              <slot name="empty">{{ computedEmptyText }}</slot>
            </span>
          </div>

          <div
            v-if="$slots.append"
            ref="appendWrapper"
            :class="bem('append-wrapper')"
          >
            <slot name="append" />
          </div>
        </r-scrollbar>
      </div>

      <div
        v-if="showSummary"
        v-show="!isEmpty"
        ref="footerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        :class="bem('footer-wrapper')"
      >
        <table-footer
          :border="border"
          :default-sort="defaultSort"
          :store="store"
          :style="tableBodyStyles"
          :sum-text="computedSumText"
          :summary-method="summaryMethod"
        />
      </div>
      <div v-if="border || isGroup" :class="bem('border-left-patch')" />
    </div>
    <div
      v-show="resizeProxyVisible"
      ref="resizeProxy"
      :class="bem('column-resize-proxy')"
    ></div>
  </div>
</template>

<script lang="ts">
import { provide, computed, defineComponent, getCurrentInstance } from 'vue'
import { debounce } from 'lodash-unified'
import Mousewheel from '../composables/use-mousewheel'
import { createNamespace } from '../utils'
import TableLayout from './table-layout'
import defaultProps from './table/defaults'
import { hColgroup } from './h-helper'
import TableHeader from './table-header'
import TableBody from './table-body'
import TableFooter from './table-footer'
import { Scrollbar } from '../scrollbar'
import { createStore } from './store/helper'
import { TABLE_INJECTION_KEY } from './tokens'
import useUtils from './table/utils-helper'
import useStyle from './table/style-helper'
import { useScrollbar } from './composables/use-scrollbar'
import type { Table } from './table/defaults'

let tableIdSeed = 1
export default defineComponent({
  name: 'RTable',
  directives: {
    Mousewheel
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    RScrollbar: Scrollbar,
    hColgroup
  },
  props: defaultProps,
  emits: [
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-contextmenu',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change'
  ],
  setup(props) {
    const [, bem, t] = createNamespace('table')

    type Row = typeof props.data[number]

    const table = getCurrentInstance() as Table<Row>
    provide(TABLE_INJECTION_KEY, table)
    const store = createStore<Row>(table, props)
    table.store = store
    const layout = new TableLayout<Row>({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader
    })
    table.layout = layout

    const isEmpty = computed(() => (store.states.data.value || []).length === 0)

    /**
     * open functions
     */
    const {
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      sort
    } = useUtils<Row>(store)

    const {
      isHidden,
      renderExpanded,
      setDragVisible,
      isGroup,
      handleMouseLeave,
      handleHeaderFooterMousewheel,
      tableSize,
      emptyBlockStyle,
      handleFixedMousewheel,
      resizeProxyVisible,
      bodyWidth,
      resizeState,
      doLayout,
      tableBodyStyles,
      tableLayout,
      scrollbarViewStyle,
      tableInnerStyle,
      scrollbarStyle
    } = useStyle<Row>(props, layout, store, table)

    const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } =
      useScrollbar()

    const debouncedUpdateLayout = debounce(doLayout, 50)

    const tableId = `r-table_${tableIdSeed++}`
    table.tableId = tableId
    table.state = {
      isGroup,
      resizeState,
      doLayout,
      debouncedUpdateLayout
    }

    // 显示摘要行第一列的文本
    const computedSumText = computed(() => props.sumText || t('sumText'))

    // 空数据时显示的文本内容
    const computedEmptyText = computed(() => props.emptyText || t('emptyText'))

    return {
      bem,
      layout,
      store,
      handleHeaderFooterMousewheel,
      handleMouseLeave,
      tableId,
      tableSize,
      isHidden,
      isEmpty,
      renderExpanded,
      resizeProxyVisible,
      resizeState,
      isGroup,
      bodyWidth,
      tableBodyStyles,
      emptyBlockStyle,
      debouncedUpdateLayout,
      handleFixedMousewheel,
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      doLayout,
      sort,
      t,
      setDragVisible,
      context: table,
      computedSumText,
      computedEmptyText,
      tableLayout,
      scrollbarViewStyle,
      tableInnerStyle,
      scrollbarStyle,
      scrollBarRef,
      scrollTo,
      setScrollLeft,
      setScrollTop
    }
  }
})
</script>

<style scoped></style>
