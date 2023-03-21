// @ts-nocheck
import { h } from 'vue'
import { Checkbox } from '../checkbox'
import { Icon } from '../icon'
import { ArrowRight, Loading } from '@ryxon/icons'
import { getProp } from '../utils'

import type { VNode } from 'vue'
import type { TableColumnCtx } from './defaults'
import type { Store } from './table/store'
import type { TreeNode } from '../table/table/defaults'

const defaultClassNames = {
  selection: 'table-column--selection',
  expand: 'table__expand-column'
}

export const cellStarts = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
}

export const getDefaultClassName = (type) => defaultClassNames[type] || ''

// 这些选项不应该被覆盖
export const cellForced = {
  selection: {
    renderHeader<T>({ store }: { store: Store<T> }) {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0
      }
      return h(Checkbox, {
        disabled: isDisabled(),
        size: store.states.tableSize.value,
        indeterminate:
          store.states.selection.value.length > 0 &&
          !store.states.isAllSelected.value,
        'onUpdate:modelValue': store.toggleAllSelection,
        modelValue: store.states.isAllSelected.value
      })
    },
    renderCell<T>({
      row,
      column,
      store,
      $index
    }: {
      row: T
      column: TableColumnCtx<T>
      store: Store<T>
      $index: string
    }) {
      return h(Checkbox, {
        disabled: column.selectable
          ? !column.selectable.call(null, row, $index)
          : false,
        size: store.states.tableSize.value,
        onChange: () => {
          store.commit('rowSelectedChanged', row)
        },
        onClick: (event: Event) => event.stopPropagation(),
        modelValue: store.isSelected(row)
      })
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || '#'
    },
    renderCell<T>({
      column,
      $index
    }: {
      column: TableColumnCtx<T>
      $index: number
    }) {
      let i = $index + 1
      const { index } = column

      if (typeof index === 'number') {
        i = $index + index
      } else if (typeof index === 'function') {
        i = index($index)
      }
      return h('div', {}, [i])
    },
    sortable: false
  },
  expand: {
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || ''
    },
    renderCell<T>({
      row,
      store,
      expanded
    }: {
      row: T
      store: Store<T>
      expanded: boolean
    }) {
      const { bem } = store
      const classes = [bem('expand-icon')]
      if (expanded) {
        classes.push(bem('expand-icon', 'expanded'))
      }
      const callback = function (e: Event) {
        e.stopPropagation()
        store.toggleRowExpansion(row)
      }
      return h(
        'div',
        {
          class: classes,
          onClick: callback
        },
        {
          default: () => [
            h(Icon, null, {
              default: () => [h(ArrowRight)]
            })
          ]
        }
      )
    },
    sortable: false,
    resizable: false
  }
}

export function defaultRenderCell<T>({
  row,
  column,
  $index
}: {
  row: T
  column: TableColumnCtx<T>
  $index: number
}) {
  const { property } = column
  const value = property && getProp(row, property).value
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index)
  }
  return value?.toString?.() || ''
}

export function treeCellPrefix<T>(
  {
    row,
    treeNode,
    store
  }: {
    row: T
    treeNode: TreeNode
    store: Store<T>
  },
  createPlacehoder = false
) {
  const { bem, isBem } = store
  if (!treeNode) {
    if (createPlacehoder) {
      return [
        h('span', {
          class: bem('placeholder')
        })
      ]
    }
    return null
  }
  const ele: VNode[] = []
  const callback = function (e) {
    e.stopPropagation()
    if (treeNode.loading) {
      return
    }
    store.loadOrToggle(row)
  }
  if (treeNode.indent) {
    ele.push(
      h('span', {
        class: bem('indent'),
        style: { 'padding-left': `${treeNode.indent}px` }
      })
    )
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = [
      bem('expand-icon'),
      treeNode.expanded ? bem('expand-icon', 'expanded') : ''
    ]
    let icon = ArrowRight
    if (treeNode.loading) {
      icon = Loading
    }

    ele.push(
      h(
        'div',
        {
          class: expandClasses,
          onClick: callback
        },
        {
          default: () => [
            h(
              Icon,
              { class: { [isBem('loading')]: treeNode.loading } },
              {
                default: () => [h(icon)]
              }
            )
          ]
        }
      )
    )
  } else {
    ele.push(
      h('span', {
        class: bem('placeholder')
      })
    )
  }
  return ele
}
