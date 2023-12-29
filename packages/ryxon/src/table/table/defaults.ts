// @ts-nocheck
import type {
  CSSProperties,
  ComponentInternalInstance,
  PropType,
  Ref,
  VNode
} from 'vue'
import type { Nullable } from '@ryxon/utils'
import type { Store } from '../store'
import type { TableColumnCtx } from '../../table-column/defaults'
import type TableLayout from '../table-layout'
import type { TableOverflowTooltipOptions } from '../util'

export type DefaultRow = any

interface TableRefs {
  tableWrapper: HTMLElement
  headerWrapper: HTMLElement
  footerWrapper: HTMLElement
  fixedBodyWrapper: HTMLElement
  rightFixedBodyWrapper: HTMLElement
  bodyWrapper: HTMLElement
  [key: string]: any
}

interface TableState {
  isGroup: Ref<boolean>
  resizeState: Ref<{
    width: any
    height: any
  }>
  doLayout: () => void
  debouncedUpdateLayout: () => void
}

type HoverState<T> = Nullable<{
  cell: HTMLElement
  column: TableColumnCtx<T>
  row: T
}>

type RIS<T> = { row: T; $index: number; store: Store<T>; expanded: boolean }

type RenderExpanded<T> = ({
  row,
  $index,
  store,
  expanded: boolean
}: RIS<T>) => VNode

type TableSummaryMethod<T> = (data: {
  columns: TableColumnCtx<T>[]
  data: T[]
}) => string[]

interface Table<T> extends ComponentInternalInstance {
  $ready: boolean
  hoverState?: HoverState<T>
  renderExpanded: RenderExpanded<T>
  store: Store<T>
  layout: TableLayout<T>
  refs: TableRefs
  tableId: string
  state: TableState
}

type TableColumnCls<T> =
  | string
  | ((data: { row: T; rowIndex: number }) => string)
type TableColumnStyle<T> =
  | CSSProperties
  | ((data: { row: T; rowIndex: number }) => CSSProperties)
type TableCellCls<T> =
  | string
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => string)
type TableCellStyle<T> =
  | CSSProperties
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => CSSProperties)
type Layout = 'fixed' | 'auto'
interface TableProps<T> {
  data: T[]
  size?: string
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string | ((row: T) => string)
  context?: Table<T>
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: TableSummaryMethod<T>
  rowClassName?: TableColumnCls<T>
  rowStyle?: TableColumnStyle<T>
  cellClassName?: TableCellCls<T>
  cellStyle?: TableCellStyle<T>
  headerRowClassName?: TableColumnCls<T>
  headerRowStyle?: TableColumnStyle<T>
  headerCellClassName?: TableCellCls<T>
  headerCellStyle?: TableCellStyle<T>
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  // eslint-disable-next-line no-use-before-define
  defaultSort?: TableSort
  tooltipEffect?: string
  tooltipOptions?: TableOverflowTooltipOptions
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) =>
    | number[]
    | {
        rowspan: number
        colspan: number
      }
    | undefined
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  // eslint-disable-next-line no-use-before-define
  load?: (row: T, treeNode: TableTreeNode, resolve: (data: T[]) => void) => void
  className?: string
  style?: CSSProperties
  tableLayout?: Layout
  scrollbarAlwaysOn?: boolean
  flexible?: boolean
}

interface TableSort {
  prop: string
  order: 'ascending' | 'descending'
  init?: any
  silent?: any
}

interface TableFilter<T> {
  column: TableColumnCtx<T>
  values: string[]
  silent: any
}

interface TableTreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}

interface TableRenderRowData<T> {
  store: Store<T>
  _self: Table<T>
  column: TableColumnCtx<T>
  row: T
  $index: number
  treeNode?: TableTreeNode
  expanded: boolean
}

export default {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => []
  },
  size: String,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function as PropType<TableProps<DefaultRow>['summaryMethod']>,
  rowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['rowClassName']
  >,
  rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>['rowStyle']>,
  cellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['cellClassName']
  >,
  cellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['cellStyle']
  >,
  headerRowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerRowClassName']
  >,
  headerRowStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerRowStyle']
  >,
  headerCellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerCellClassName']
  >,
  headerCellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerCellStyle']
  >,
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
  defaultExpandAll: Boolean,
  defaultSort: Object as PropType<TableProps<DefaultRow>['defaultSort']>,
  tooltipEffect: String,
  tooltipOptions: Object as PropType<TableProps<DefaultRow>['tooltipOptions']>,
  spanMethod: Function as PropType<TableProps<DefaultRow>['spanMethod']>,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object as PropType<TableProps<DefaultRow>['treeProps']>,
    default: () => ({
      hasChildren: 'hasChildren',
      children: 'children'
    })
  },
  lazy: Boolean,
  load: Function as PropType<TableProps<DefaultRow>['load']>,
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  className: {
    type: String,
    default: ''
  },
  tableLayout: {
    type: String as PropType<Layout>,
    default: 'fixed'
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false
  },
  flexible: Boolean
}

type TableThemeVars = {
  tableBorderColor?: string
  tableBorder?: string
  tableTextColor?: string
  tableHeaderTextColor?: string
  tableRowHoverBgColor?: string
  tableCurrentRowBgColor?: string
  tableHeaderBgColor?: string
  tableFixedBoxShadow?: string
  tableBgColor?: string
  tableTrBgColor?: string
  tableExpandedCellBgColor?: string
  tableFixedLeftColumn?: string
  tableFixedRightColumn?: string
  tableDarkTextColor?: string
  tableDarkBackground?: string
}

export type {
  TableSummaryMethod,
  Table,
  TableProps,
  TableRefs,
  TableColumnCls,
  TableColumnStyle,
  TableCellCls,
  TableCellStyle,
  TableTreeNode,
  TableRenderRowData,
  TableSort,
  TableFilter,
  TableColumnCtx,
  TableThemeVars
}
