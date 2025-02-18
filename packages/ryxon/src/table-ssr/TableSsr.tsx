// @ts-nocheck
import {
  ref,
  watch,
  toRaw,
  computed,
  defineComponent,
  type PropType,
  type AriaAttributes,
  type ExtractPropTypes
} from 'vue'
import { useVModel } from '@vueuse/core'

// Utils
import {
  addUnit,
  truthProp,
  capitalize,
  makeArrayProp,
  makeStringProp,
  definePropType
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import {
  get,
  omit,
  defaultSort,
  accessor,
  getStringifiedSet,
  defaultComparator
} from './utils'

// Composables

// Components
import Scrollbar from '../scrollbar'
import Checkbox from '../checkbox'
import Progress from '../progress'
import Loading from '../loading'
import Empty from '../empty'
import Button from '../button'
import { Icon } from '../icon'
import { ArrowRight } from '@ryxon/icons'

import type { ButtonProps } from '../button'
import type { EmptyProps } from '../empty'
import type {
  Expanded,
  TableRow,
  TableColumn,
  TableSortMode,
  spanMethod
} from './types'

const [, bem, t] = createNamespace('table')
const [name, bemSsr] = createNamespace('table-ssr')

export const tableSsrProps = {
  rows: makeArrayProp<TableRow>(),
  columns: { type: Array as PropType<TableColumn[]>, default: null },
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  modelValue: { type: Array as PropType<TableRow[]>, default: null },
  singleSelect: Boolean,
  by: { type: [String, Function], default: () => defaultComparator },
  columnAttribute: { type: String, default: 'label' },
  sort: {
    type: Object as PropType<{ column: string; direction: 'asc' | 'desc' }>,
    default: () => ({})
  },
  sortMode: makeStringProp<TableSortMode>('auto'),
  expandButton: { type: definePropType<ButtonProps>(Object) },
  expand: {
    type: Object as PropType<Expanded<TableRow>>,
    default: () => null
  },
  multipleExpand: truthProp,
  loading: Boolean,
  loadingState: {
    type: Object as PropType<{ label: string } | null>,
    default: () => ({ label: '' })
  },
  emptyState: {
    type: definePropType<EmptyProps>(Object),
    default: () => ({ description: t('emptyText') })
  },
  caption: String,
  progress: truthProp,
  spanMethod: Function as PropType<spanMethod>
}

export type TableSsrProps = ExtractPropTypes<typeof tableSsrProps>

export default defineComponent({
  name,

  props: tableSsrProps,

  emits: [
    'update:modelValue',
    'update:sort',
    'update:expand',
    'select',
    'select-all',
    'selection-change',
    'cell-click',
    'cell-contextmenu',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick'
  ],

  setup(props, { slots, emit, attrs: $attrs }) {
    const attrs = computed(() => omit($attrs, ['class']))

    const sort = useVModel(props, 'sort', emit, {
      passive: true,
      defaultValue: props.sort || { column: null, direction: 'asc' }
    })

    const columns = computed(() => {
      const defaultColumns =
        props.columns ??
        (props.rows.length > 0
          ? (Object.keys(props.rows[0]).map((key) => ({
              prop: key,
              label: capitalize(key),
              sortable: false,
              class: undefined,
              sort: defaultSort
            })) as TableColumn[])
          : [])

      const hasColumnSelect = defaultColumns.find((v) => v.prop === 'select')

      if (hasColumnSelect || !props.modelValue) {
        return defaultColumns
      }

      return [
        {
          prop: 'select',
          sortable: false,
          class: undefined,
          sort: defaultSort
        },
        ...defaultColumns
      ]
    })

    const rows = computed(() => {
      // 手动排序
      if (!sort.value?.column || props.sortMode === 'manual') {
        return props.rows
      }

      const { column, direction } = sort.value

      return props.rows.slice().sort((a, b) => {
        const aValue = get(a, column)
        const bValue = get(b, column)

        const sort =
          columns.value.find((col) => col.prop === column)?.sort ?? defaultSort

        return sort(aValue, bValue, direction)
      })
    })

    // 表格标题
    const renderCaption = () =>
      slots.caption ? (
        slots.caption()
      ) : (
        <caption class={bemSsr('only')}>{props.caption}</caption>
      )

    // 单元格宽度
    const renderWidth = () => (
      <colgroup>
        {expand.value && <col width={48}></col>}
        {columns.value.map((column) => (
          <col
            key={column.prop}
            style={{
              width: addUnit(column.width),
              minWidth: addUnit(column.minWidth)
            }}
          />
        ))}
      </colgroup>
    )

    const expand = useVModel(props, 'expand', emit, {
      passive: true,
      defaultValue: props.expand || { openedRows: [], row: null }
    })

    function getAriaSort(column: TableColumn): AriaAttributes['aria-sort'] {
      if (!column.sortable) {
        return undefined
      }

      if (sort.value.column !== column.prop) {
        return 'none'
      }

      if (sort.value.direction === 'asc') {
        return 'ascending'
      }

      if (sort.value.direction === 'desc') {
        return 'descending'
      }

      return undefined
    }

    const selected = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
        emit('selection-change', value)
      }
    })

    const indeterminate = computed(() => {
      if (!selected.value || !props.rows) return false
      return (
        countCheckedRow.value > 0 && countCheckedRow.value < totalRows.value
      )
    })

    const totalRows = computed(() => props.rows.length)

    const countCheckedRow = computed(() => {
      const selectedData = getStringifiedSet(selected.value)
      const rowsData = getStringifiedSet(props.rows)

      return Array.from(selectedData).filter((item) => rowsData.has(item))
        .length
    })

    const isAllRowChecked = computed(
      () => countCheckedRow.value === totalRows.value
    )

    function compare(a: any, z: any) {
      if (typeof props.by === 'string') {
        const accesorFn = accessor(props.by)
        return accesorFn(a) === accesorFn(z)
      }
      return props.by(a, z)
    }

    function isSelected(row: TableRow) {
      if (!props.modelValue) {
        return false
      }

      return selected.value.some((item) => compare(toRaw(item), toRaw(row)))
    }

    function selectAllRows() {
      // Create a new array to ensure reactivity
      const newSelected = [...selected.value]

      // If the row is not already selected, add it to the newSelected array
      props.rows.forEach((row) => {
        if (!isSelected(row)) {
          newSelected.push(row)
        }
      })

      // Reassign the array to trigger Vue's reactivity
      selected.value = newSelected
    }

    function onChange(checked: boolean) {
      if (checked) {
        selectAllRows()
      } else {
        selected.value = []
      }
      emit('select-all', checked)
    }

    const savedSort = { column: sort.value.column, direction: null }

    function onSort(column: { prop: string; direction?: 'asc' | 'desc' }) {
      if (sort.value.column === column.prop) {
        const direction =
          !column.direction || column.direction === 'asc' ? 'desc' : 'asc'

        if (sort.value.direction === direction) {
          sort.value = savedSort || { column: null, direction: 'asc' }
        } else {
          sort.value = {
            column: sort.value.column,
            direction: sort.value.direction === 'asc' ? 'desc' : 'asc'
          }
        }
      } else {
        sort.value = {
          column: column.prop,
          direction: column.direction || 'asc'
        }
      }
    }

    const renderThContent = (column: TableColumn) => {
      // 判断是不是选择框
      if (!props.singleSelect && props.modelValue && column.prop === 'select') {
        if (slots['select-header']) {
          return slots['select-header']({
            indeterminate: indeterminate,
            checked: isAllRowChecked,
            change: onChange
          })
        }

        return (
          <Checkbox
            modelValue={isAllRowChecked.value}
            indeterminate={indeterminate.value}
            class="cell"
            aria-label="Select all"
            onChange={onChange}
          />
        )
      }

      if (slots[`${column.prop}-header`]) {
        return slots[`${column.prop}-header`]?.({
          column: column,
          sort: sort,
          onSort: onSort
        })
      }

      if (column.sortable) {
        return (
          <div
            class={['cell', getAriaSort(column)]}
            onClick={() => onSort(column)}
          >
            {column[props.columnAttribute]}
            <span class="caret-wrapper">
              <i class="sort-caret ascending"></i>
              <i class="sort-caret descending"></i>
            </span>
          </div>
        )
      }

      return <div class="cell">{column[props.columnAttribute]}</div>
    }

    const renderThead = () => (
      <thead class={[bem('header'), bemSsr('thead')]}>
        <tr>
          {expand.value && (
            <th scope="col" class={bem('cell')}>
              <span class={bemSsr('only')}>Expand</span>
            </th>
          )}
          {columns.value.map((column) => (
            <th
              key={column.prop}
              scope="col"
              class={[
                bem('cell'),
                column.align ? `is-${column.align}` : null,
                column.class
              ]}
              aria-sort={getAriaSort(column)}
            >
              {renderThContent(column)}
            </th>
          ))}
        </tr>
        {props.loading && props.progress && (
          <tr>
            <td colspan={0} class={bemSsr('progress')}>
              <Progress
                percentage={50}
                indeterminate={true}
                showText={false}
                strokeWidth={1}
              />
            </td>
          </tr>
        )}
      </thead>
    )

    function isExpanded(row: TableRow) {
      return expand.value?.openedRows
        ? expand.value.openedRows.some((openedRow) => compare(openedRow, row))
        : false
    }

    const getSpan = (
      row: TableRow,
      column: TableColumn,
      rowIndex: number,
      columnIndex: number
    ) => {
      let rowspan = 1
      let colspan = 1
      const fn = props.spanMethod
      if (typeof fn === 'function') {
        const result = fn({
          row,
          column,
          rowIndex,
          columnIndex
        })
        if (Array.isArray(result)) {
          rowspan = result[0]
          colspan = result[1]
        } else if (typeof result === 'object') {
          // eslint-disable-next-line prefer-destructuring
          rowspan = result.rowspan
          // eslint-disable-next-line prefer-destructuring
          colspan = result.colspan
        }
      }
      return { rowspan, colspan }
    }

    function onChangeCheckbox(checked: boolean, row: TableRow) {
      if (checked) {
        selected.value = props.singleSelect ? [row] : [...selected.value, row]
      } else {
        selected.value = selected.value.filter(
          (value) => !compare(toRaw(value), toRaw(row))
        )
      }

      emit('select', row)
    }

    const retriggerSlot = ref<Date>(new Date())
    watch(
      rows,
      () => {
        retriggerSlot.value = new Date()
      },
      { deep: true }
    )

    function getRowData(
      row: TableRow,
      rowKey: string | string[],
      defaultValue: any = ''
    ) {
      return get(row, rowKey, defaultValue)
    }

    const renderTbodyContent = (
      row: TableRow,
      column: TableColumn,
      index: number
    ) => {
      if (props.modelValue && column.prop === 'select') {
        if (slots['select-data']) {
          return slots['select-data']({
            checked: isSelected(row),
            change: (ev: boolean) => onChangeCheckbox(ev, row)
          })
        }

        return (
          <Checkbox
            modelValue={isSelected(row)}
            class="cell"
            aria-label="Select row"
            onChange={(event) => onChangeCheckbox(event, row)}
          />
        )
      }

      if (slots[`${column.prop}-data`]) {
        return (
          <div key={retriggerSlot.value.toString()} class="cell">
            {slots[`${column.prop}-data`]?.({
              column: column,
              row: row,
              index: index,
              getRowData: (defaultValue: any) =>
                getRowData(row, column.prop, defaultValue)
            })}
          </div>
        )
      }

      return (
        <div key={retriggerSlot.value.toString()} class="cell">
          {getRowData(row, column.prop)}
        </div>
      )
    }

    function toggleOpened(row: TableRow) {
      expand.value = {
        openedRows: isExpanded(row)
          ? expand.value.openedRows.filter((v) => !compare(v, row))
          : props.multipleExpand
            ? [...expand.value.openedRows, row]
            : [row],
        row
      }
    }

    const renderTbody = () => {
      if (props.loadingState && props.loading && !rows.value.length) {
        return (
          <tr>
            <td
              colspan={
                columns.value.length +
                (props.modelValue ? 1 : 0) +
                (expand.value ? 1 : 0)
              }
            >
              {slots['loading'] ? (
                slots['loading']()
              ) : (
                <div class={bemSsr('loading')}>
                  <Loading vertical aria-hidden="true">
                    {props.loadingState.label}
                  </Loading>
                </div>
              )}
            </td>
          </tr>
        )
      } else if (props.emptyState && !rows.value.length) {
        return (
          <tr>
            <td
              colspan={
                columns.value.length +
                (props.modelValue ? 1 : 0) +
                (expand.value ? 1 : 0)
              }
            >
              {slots['empty'] ? (
                slots['empty']()
              ) : (
                <div class={bem('empty-text')}>
                  <Empty {...props.emptyState} />
                </div>
              )}
            </td>
          </tr>
        )
      }

      return rows.value.map((row, index) => (
        <>
          <tr
            class={[
              bem('row'),
              { [bem('row', 'striped') as string]: index % 2 === 1 },
              row?.class
            ]}
            onClick={(event) => emit('row-click', row, event)}
            onDblclick={(event) => emit('row-dblclick', row, event)}
            onContextmenu={(event) => emit('row-contextmenu', row, event)}
          >
            {expand.value && (
              <td
                class={[bem('expand-column'), bem('cell')]}
                rowspan={1}
                colspan={1}
              >
                {slots['expand-action'] ? (
                  slots['expand-action']({
                    row: row,
                    isExpanded: isExpanded(row),
                    toggle: () => toggleOpened(row)
                  })
                ) : (
                  <Button
                    disabled={row.disabledExpand}
                    {...props.expandButton}
                    class={[
                      'cell',
                      bem('expand-icon', { expanded: isExpanded(row) })
                    ]}
                    link
                    onClick={() => toggleOpened(row)}
                  >
                    <Icon>
                      <ArrowRight />
                    </Icon>
                  </Button>
                )}
              </td>
            )}
            {columns.value.map((column, subIndex) => {
              const { rowspan, colspan } = getSpan(row, column, index, subIndex)
              if (!rowspan || !colspan) {
                return null
              }

              return (
                <td
                  key={subIndex}
                  class={[
                    bem('cell'),
                    column?.rowClass,
                    row[column.prop]?.class,
                    column.align ? `is-${column.align}` : null
                  ]}
                  rowspan={rowspan}
                  colspan={colspan}
                  onClick={(event) => emit('cell-click', row, column, event)}
                  onDblclick={(event) =>
                    emit('cell-dblclick', row, column, event)
                  }
                  onContextmenu={(event) =>
                    emit('cell-contextmenu', row, column, event)
                  }
                >
                  {renderTbodyContent(row, column, index)}
                </td>
              )
            })}
          </tr>
          {isExpanded(row) && (
            <tr>
              <td
                colspan={
                  columns.value.length +
                  (props.modelValue ? 1 : 0) +
                  (expand.value ? 1 : 0)
                }
              >
                {slots.expand?.({ row: row, index: index })}
              </td>
            </tr>
          )}
        </>
      ))
    }

    return () => (
      <div
        class={[
          {
            [bem('striped') as string]: props.stripe,
            [bem('border') as string]: props.border
          },
          bem(),
          bem('enable-row-hover'),
          bemSsr()
        ]}
        {...attrs.value}
      >
        <Scrollbar height={props.height} maxHeight={props.maxHeight}>
          <table class={bemSsr('table')}>
            {[
              (slots.caption || props.caption) && renderCaption(),
              renderWidth(),
              renderThead(),
              <tbody class={bem('body')}>{renderTbody()}</tbody>
            ]}
          </table>
        </Scrollbar>
      </div>
    )
  }
})
