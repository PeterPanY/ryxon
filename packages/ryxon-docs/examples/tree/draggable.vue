<template>
  <r-tree
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="data"
    draggable
    default-expand-all
    node-key="id"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script lang="ts" setup>
import type {
  TreeNode,
  TreeNodeDropType,
  TreeAllowDropType
} from '@ryxon/components'

const handleDragStart = (node: TreeNode) => {
  console.log('drag start', node)
}
const handleDragEnter = (draggingNode: TreeNode, dropNode: TreeNode) => {
  console.log('tree drag enter:', dropNode.label)
}
const handleDragLeave = (draggingNode: TreeNode, dropNode: TreeNode) => {
  console.log('tree drag leave:', dropNode.label)
}
const handleDragOver = (draggingNode: TreeNode, dropNode: TreeNode) => {
  console.log('tree drag over:', dropNode.label)
}
const handleDragEnd = (
  draggingNode: TreeNode,
  dropNode: TreeNode,
  dropType: TreeNodeDropType
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType)
}
const handleDrop = (
  draggingNode: TreeNode,
  dropNode: TreeNode,
  dropType: TreeNodeDropType
) => {
  console.log('tree drop:', dropNode.label, dropType)
}
const allowDrop = (
  draggingNode: TreeNode,
  dropNode: TreeNode,
  type: TreeAllowDropType
) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  }
  return true
}
const allowDrag = (draggingNode: TreeNode) =>
  !draggingNode.data.label.includes('Level three 3-1-1')

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [{ label: 'Level three 1-1-1' }]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [{ label: 'Level three 2-1-1' }]
      },
      {
        label: 'Level two 2-2',
        children: [{ label: 'Level three 2-2-1' }]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [{ label: 'Level three 3-1-1' }]
      },
      {
        label: 'Level two 3-2',
        children: [{ label: 'Level three 3-2-1' }]
      }
    ]
  }
]
</script>
