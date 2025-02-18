export type TableSortMode = 'manual' | 'auto'

export interface TableRow {
  [key: string]: any
}

export interface TableColumn {
  prop: string
  label?: string | number
  align?: string
  width?: string | number
  minWidth?: string | number
  sortable?: boolean
  sort?: (a: any, b: any, direction: 'asc' | 'desc') => number
  direction?: 'asc' | 'desc'
  class?: string
  rowClass?: string
  [key: string]: any
}

export interface Expanded<T> {
  openedRows: T[]
  row: T | null
}

export type spanMethod = (data: {
  row: TableRow
  rowIndex: number
  column: TableColumn
  columnIndex: number
}) =>
  | number[]
  | {
      rowspan: number
      colspan: number
    }
  | undefined
