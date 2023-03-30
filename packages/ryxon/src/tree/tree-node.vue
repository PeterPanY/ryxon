<template>
  <div
    v-show="node.visible"
    ref="node$"
    :class="[
      bem('node'),
      isBem('expanded', expanded),
      isBem('current', node.isCurrent),
      isBem('hidden', !node.visible),
      isBem('focusable', !node.disabled),
      isBem('checked', !node.disabled && node.checked),
      getNodeClass(node)
    ]"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.props.draggable"
    :data-key="getNodeKey(node)"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div
      :class="bem('node-content')"
      :style="{ paddingLeft: (node.level - 1) * tree.props.indent + 'px' }"
    >
      <r-icon
        v-if="tree.props.icon || CaretRight"
        :class="[
          bem('node-expand-icon'),
          isBem('leaf', node.isLeaf),
          {
            expanded: !node.isLeaf && expanded
          }
        ]"
        @click.stop="handleExpandIconClick"
      >
        <component :is="tree.props.icon || CaretRight" />
      </r-icon>

      <r-checkbox
        v-if="showCheckbox"
        :model-value="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        shape="square"
        @click.stop
        @change="handleCheckChange"
      />

      <r-icon
        v-if="node.loading"
        :class="[bem('node-loading-icon'), isBem('loading')]"
      >
        <loading />
      </r-icon>

      <node-content :node="node" :render-content="renderContent" />
    </div>

    <r-collapse-transition>
      <div
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        :class="bem('node-children')"
        role="group"
        :aria-expanded="expanded"
      >
        <r-tree-node
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :node="child"
          :accordion="accordion"
          :props="props"
          @node-expand="handleChildNodeExpand"
        />
      </div>
    </r-collapse-transition>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {
  ref,
  watch,
  inject,
  provide,
  nextTick,
  defineComponent,
  getCurrentInstance,
  type PropType,
  type ComponentInternalInstance
} from 'vue'
import { isString, isFunction, createNamespace } from '../utils'
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util'
import { dragEventsKey } from './model/useDragNode'
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast'
import { Icon } from '../icon'
import { Checkbox } from '../checkbox'
import { CaretRight, Loading } from '@ryxon/icons'
import { CollapseTransition } from '../collapse-transition'
import NodeContent from './tree-node-content.vue'
import Node from './model/node'
import type { Nullable } from '../utils'
import type { RootTreeType, TreeNodeData, TreeOptionProps } from './types'

export default defineComponent({
  name: 'RTreeNode',
  components: {
    RIcon: Icon,
    RCheckbox: Checkbox,
    RCollapseTransition: CollapseTransition,
    NodeContent,
    Loading
  },
  props: {
    node: { type: Node, default: () => ({}) },
    props: { type: Object as PropType<TreeOptionProps>, default: () => ({}) },
    accordion: Boolean,
    renderContent: Function,
    renderAfterExpand: Boolean,
    showCheckbox: { type: Boolean, default: false }
  },
  emits: ['node-expand'],
  setup(props, ctx) {
    const [, bem, , isBem] = createNamespace('tree')

    const { broadcastExpanded } = useNodeExpandEventBroadcast(props)
    const tree = inject<RootTreeType>('RootTree')
    const expanded = ref(false)
    const childNodeRendered = ref(false)
    const oldChecked = ref<boolean>(null)
    const oldIndeterminate = ref<boolean>(null)
    const node$ = ref<Nullable<HTMLElement>>(null)
    const dragEvents = inject(dragEventsKey)
    const instance = getCurrentInstance()

    if (!tree) {
      console.warn('Tree', "Can not find node's tree.")
    }

    if (props.node.expanded) {
      expanded.value = true
      childNodeRendered.value = true
    }

    provide('NodeInstance', instance)

    const childrenKey = tree.props.children || 'children'
    watch(
      () => {
        const children = props.node.data[childrenKey]
        return children && [...children]
      },
      () => {
        props.node.updateChildren()
      }
    )

    watch(
      () => props.node.expanded,
      (val) => {
        // eslint-disable-next-line no-return-assign
        nextTick(() => (expanded.value = val))
        if (val) {
          childNodeRendered.value = true
        }
      }
    )

    const handleSelectChange = (checked: boolean, indeterminate: boolean) => {
      if (
        oldChecked.value !== checked ||
        oldIndeterminate.value !== indeterminate
      ) {
        tree.ctx.emit('check-change', props.node.data, checked, indeterminate)
      }
      oldChecked.value = checked
      oldIndeterminate.value = indeterminate
    }

    watch(
      () => props.node.indeterminate,
      (val) => {
        handleSelectChange(props.node.checked, val)
      }
    )

    watch(
      () => props.node.checked,
      (val) => {
        handleSelectChange(val, props.node.indeterminate)
      }
    )

    const getNodeKey = (node: Node): any =>
      getNodeKeyUtil(tree.props.nodeKey, node.data)

    const getNodeClass = (node: Node) => {
      const nodeClassFunc = props.props.class
      if (!nodeClassFunc) {
        return {}
      }
      let className
      if (isFunction(nodeClassFunc)) {
        const { data } = node
        className = nodeClassFunc(data, node)
      } else {
        className = nodeClassFunc
      }

      if (isString(className)) {
        return { [className]: true }
      }
      return className
    }

    const handleExpandIconClick = () => {
      if (props.node.isLeaf) return
      if (expanded.value) {
        tree.ctx.emit('node-collapse', props.node.data, props.node, instance)
        props.node.collapse()
      } else {
        props.node.expand()
        ctx.emit('node-expand', props.node.data, props.node, instance)
      }
    }

    const handleCheckChange = (value, ev) => {
      props.node.setChecked(
        ev ? ev.target.checked : value,
        !tree.props.checkStrictly
      )
      nextTick(() => {
        const store = tree.store.value
        tree.ctx.emit('check', props.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        })
      })
    }

    const handleClick = (e: MouseEvent) => {
      handleCurrentChange(tree.store, tree.ctx.emit, () =>
        tree.store.value.setCurrentNode(props.node)
      )
      tree.currentNode.value = props.node

      if (tree.props.expandOnClickNode) {
        handleExpandIconClick()
      }

      if (tree.props.checkOnClickNode && !props.node.disabled) {
        handleCheckChange(null, {
          target: { checked: !props.node.checked }
        })
      }
      tree.ctx.emit('node-click', props.node.data, props.node, instance, e)
    }

    const handleContextMenu = (event: Event) => {
      if (tree.instance.vnode.props.onNodeContextmenu) {
        event.stopPropagation()
        event.preventDefault()
      }
      tree.ctx.emit(
        'node-contextmenu',
        event,
        props.node.data,
        props.node,
        instance
      )
    }

    const handleChildNodeExpand = (
      nodeData: TreeNodeData,
      node: Node,
      instance: ComponentInternalInstance
    ) => {
      broadcastExpanded(node)
      tree.ctx.emit('node-expand', nodeData, node, instance)
    }

    const handleDragStart = (event: DragEvent) => {
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragStart({ event, treeNode: props })
    }

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragOver({
        event,
        treeNode: { $el: node$.value, node: props.node }
      })
    }

    const handleDragEnd = (event: DragEvent) => {
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragEnd(event)
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault()
    }

    return {
      bem,
      isBem,
      node$,
      tree,
      expanded,
      childNodeRendered,
      oldChecked,
      oldIndeterminate,
      getNodeKey,
      getNodeClass,
      handleSelectChange,
      handleClick,
      handleContextMenu,
      handleExpandIconClick,
      handleCheckChange,
      handleChildNodeExpand,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      CaretRight
    }
  }
})
</script>
