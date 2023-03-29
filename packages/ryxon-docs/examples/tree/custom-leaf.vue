<template>
  <r-tree :props="props" :load="loadNode" lazy show-checkbox />
</template>

<script lang="ts" setup>
import type { TreeNode } from '@ryxon/components'

interface Tree {
  name: string
  leaf?: boolean
}

const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf'
}

const loadNode = (node: TreeNode, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  if (node.level > 1) return resolve([])

  setTimeout(() => {
    const data: Tree[] = [
      {
        name: 'leaf',
        leaf: true
      },
      {
        name: 'zone'
      }
    ]

    resolve(data)
  }, 500)
}
</script>
