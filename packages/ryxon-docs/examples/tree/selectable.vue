<template>
  <r-tree
    :props="props"
    :load="loadNode"
    lazy
    show-checkbox
    @check-change="handleCheckChange"
  />
</template>

<script lang="ts" setup>
import type { TreeNode } from '@ryxon/components'

let count = 1

interface Tree {
  name: string
}

const props = {
  label: 'name',
  children: 'zones'
}

const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate)
}

const loadNode = (node: TreeNode, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'Root1' }, { name: 'Root2' }])
  }
  if (node.level > 3) return resolve([])

  // 随机看下面是否还有子节点
  const hasChild = Math.random() > 0.5

  setTimeout(() => {
    let data: Tree[] = []
    if (hasChild) {
      data = [
        {
          name: `zone${count++}`
        },
        {
          name: `zone${count++}`
        }
      ]
    } else {
      data = []
    }

    resolve(data)
  }, 500)
}
</script>
