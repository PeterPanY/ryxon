// @ts-nocheck
import {
  ref,
  watch,
  provide,
  computed,
  defineComponent,
  getCurrentInstance,
  type PropType,
  type ExtractPropTypes,
  type ComponentInternalInstance
} from 'vue'

// Utils
import { iconPropType, createNamespace } from '../utils'
import { useDragNodeHandler } from './model/useDragNode'
import { useKeydown } from './model/useKeydown'
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast'
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util'
import { useExpose } from '../composables/use-expose'

// Components
import RTreeNode from './tree-node.vue'

import TreeStore from './model/tree-store'
import type Node from './model/node'
import type { Nullable } from '../utils'
import type {
  TreeKey,
  TreeData,
  TreeNodeData,
  TreeFilterValue,
  TreeComponentProps
} from './types'

const [name, bem, t, isBem] = createNamespace('tree')

export const treeProps = {
  data: { type: Array, default: () => [] },
  emptyText: { type: String },
  renderAfterExpand: { type: Boolean, default: true },
  nodeKey: String,
  checkStrictly: Boolean,
  defaultExpandAll: Boolean,
  expandOnClickNode: { type: Boolean, default: true },
  checkOnClickNode: Boolean,
  checkDescendants: { type: Boolean, default: false },
  autoExpandParent: { type: Boolean, default: true },
  defaultCheckedKeys: Array as PropType<
    TreeComponentProps['defaultCheckedKeys']
  >,
  defaultExpandedKeys: Array as PropType<
    TreeComponentProps['defaultExpandedKeys']
  >,
  currentNodeKey: [String, Number] as PropType<string | number>,
  renderContent: Function,
  showCheckbox: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  allowDrag: Function,
  allowDrop: Function,
  props: {
    type: Object as PropType<TreeComponentProps['props']>,
    default: () => ({
      children: 'children',
      label: 'label',
      disabled: 'disabled'
    })
  },
  lazy: { type: Boolean, default: false },
  highlightCurrent: Boolean,
  load: Function as PropType<TreeComponentProps['load']>,
  filterNodeMethod: Function as PropType<
    TreeComponentProps['filterNodeMethod']
  >,
  accordion: Boolean,
  indent: { type: Number, default: 18 },
  icon: { type: iconPropType }
}

export type TreeProps = ExtractPropTypes<typeof treeProps>

export default defineComponent({
  name,
  props: treeProps,
  emits: [
    'check-change',
    'current-change',
    'node-click',
    'node-contextmenu',
    'node-collapse',
    'node-expand',
    'check',
    'node-drag-start',
    'node-drag-end',
    'node-drop',
    'node-drag-leave',
    'node-drag-enter',
    'node-drag-over'
  ],
  setup(props, ctx) {
    const store = ref<TreeStore>(
      new TreeStore({
        key: props.nodeKey,
        data: props.data,
        lazy: props.lazy,
        props: props.props,
        load: props.load,
        currentNodeKey: props.currentNodeKey,
        checkStrictly: props.checkStrictly,
        checkDescendants: props.checkDescendants,
        defaultCheckedKeys: props.defaultCheckedKeys,
        defaultExpandedKeys: props.defaultExpandedKeys,
        autoExpandParent: props.autoExpandParent,
        defaultExpandAll: props.defaultExpandAll,
        filterNodeMethod: props.filterNodeMethod
      })
    )
    store.value.initialize()

    const el$ = ref<Nullable<HTMLElement>>(null)
    const dropIndicator$ = ref<Nullable<HTMLElement>>(null)
    const root = ref<Node>(store.value.root)
    const currentNode = ref<Node>(null)

    const { dragState } = useDragNodeHandler({
      props,
      ctx,
      el$,
      dropIndicator$,
      store
    })

    const { broadcastExpanded } = useNodeExpandEventBroadcast(props)

    useKeydown({ el$ }, store)

    watch(
      () => props.currentNodeKey,
      (newVal) => {
        store.value.setCurrentNodeKey(newVal)
      }
    )

    watch(
      () => props.defaultCheckedKeys,
      (newVal) => {
        store.value.setDefaultCheckedKey(newVal)
      }
    )

    watch(
      () => props.defaultExpandedKeys,
      (newVal) => {
        store.value.setDefaultExpandedKeys(newVal)
      }
    )

    watch(
      () => props.data,
      (newVal) => {
        store.value.setData(newVal)
      },
      { deep: true }
    )

    watch(
      () => props.checkStrictly,
      (newVal) => {
        store.value.checkStrictly = newVal
      }
    )

    provide('RootTree', {
      ctx,
      props,
      store,
      root,
      currentNode,
      instance: getCurrentInstance()
    } as any)

    // 过滤所有树节点，过滤后的节点将被隐藏
    const filter = (value: TreeFilterValue) => {
      if (!props.filterNodeMethod)
        throw new Error('[Tree] filterNodeMethod is required when filter')
      store.value.filter(value)
    }

    // 为节点设置新数据，只有当设置 node-key 属性的时候才可用
    const updateKeyChildren = (key: TreeKey, data: TreeData) => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in updateKeyChild')
      store.value.updateChildren(key, data)
    }

    // 如果节点可以被选中，(show-checkbox 为 true), 本方法将返回当前选中节点的数组
    const getCheckedNodes = (
      leafOnly?: boolean,
      includeHalfChecked?: boolean
    ): TreeNodeData[] =>
      store.value.getCheckedNodes(leafOnly, includeHalfChecked)

    // 设置目前勾选的节点，使用此方法必须提前设置 node-key 属性
    const setCheckedNodes = (nodes: Node[], leafOnly?: boolean) => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in setCheckedNodes')
      store.value.setCheckedNodes(nodes, leafOnly)
    }

    // 若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
    const getCheckedKeys = (leafOnly?: boolean): TreeKey[] =>
      store.value.getCheckedKeys(leafOnly)

    // 设置目前选中的节点，使用此方法必须设置 node-key 属性
    const setCheckedKeys = (keys: TreeKey[], leafOnly?: boolean) => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in setCheckedKeys')
      store.value.setCheckedKeys(keys, leafOnly)
    }

    // 设置节点是否被选中, 使用此方法必须设置 node-key 属性
    const setChecked = (
      data: TreeKey | TreeNodeData,
      checked: boolean,
      deep: boolean
    ) => {
      store.value.setChecked(data, checked, deep)
    }

    // 如果节点可用被选中 (show-checkbox 为 true), 它将返回当前半选中的节点组成的数组
    const getHalfCheckedNodes = (): TreeNodeData[] =>
      store.value.getHalfCheckedNodes()

    // 若节点可被选中(show-checkbox 为 true)，则返回目前半选中的节点的 key 所组成的数组
    const getHalfCheckedKeys = (): TreeKey[] => store.value.getHalfCheckedKeys()

    // 返回当前被选中节点的数据 (如果没有则返回 null)
    const getCurrentNode = (): TreeNodeData => {
      const currentNode = store.value.getCurrentNode()
      return currentNode ? currentNode.data : null
    }

    // 返回当前被选中节点的数据 (如果没有则返回 null)
    const getCurrentKey = (): any => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in getCurrentKey')
      const currentNode = getCurrentNode()
      return currentNode ? currentNode[props.nodeKey] : null
    }

    // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key  属性
    const setCurrentKey = (key?: TreeKey, shouldAutoExpandParent = true) => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in setCurrentKey')

      handleCurrentChange(store, ctx.emit, () =>
        store.value.setCurrentNodeKey(key, shouldAutoExpandParent)
      )
    }

    // 设置节点为选中状态，使用此方法必须设置 node-key 属性
    const setCurrentNode = (node: Node, shouldAutoExpandParent = true) => {
      if (!props.nodeKey)
        throw new Error('[Tree] nodeKey is required in setCurrentNode')

      handleCurrentChange(store, ctx.emit, () =>
        store.value.setUserCurrentNode(node, shouldAutoExpandParent)
      )
    }

    // 根据 data 或者 key 拿到 Tree 组件中的 node
    const getNode = (data: TreeKey | TreeNodeData): Node =>
      store.value.getNode(data)

    // 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性
    const remove = (data: TreeNodeData | Node) => {
      store.value.remove(data)
    }

    // 为 Tree 中的一个节点追加一个子节点
    const append = (
      data: TreeNodeData,
      parentNode: TreeNodeData | TreeKey | Node
    ) => {
      store.value.append(data, parentNode)
    }

    // 在 Tree 中给定节点前插入一个节点
    const insertBefore = (
      data: TreeNodeData,
      refNode: TreeKey | TreeNodeData
    ) => {
      store.value.insertBefore(data, refNode)
    }

    // 在 Tree 中给定节点后插入一个节点
    const insertAfter = (
      data: TreeNodeData,
      refNode: TreeKey | TreeNodeData
    ) => {
      store.value.insertAfter(data, refNode)
    }

    useExpose({
      filter,
      updateKeyChildren,
      getCheckedNodes,
      setCheckedNodes,
      getCheckedKeys,
      setCheckedKeys,
      setChecked,
      getHalfCheckedNodes,
      getHalfCheckedKeys,
      getCurrentKey,
      getCurrentNode,
      setCurrentKey,
      setCurrentNode,
      getNode,
      remove,
      append,
      insertBefore,
      insertAfter
    })

    const isEmpty = computed(() => {
      const { childNodes } = root.value
      return (
        !childNodes ||
        childNodes.length === 0 ||
        childNodes.every(({ visible }) => !visible)
      )
    })

    const getNodeKey = (node: Node) =>
      getNodeKeyUtil(props.nodeKey || '', node.data)

    const handleNodeExpand = (
      nodeData: TreeNodeData,
      node: Node,
      instance: ComponentInternalInstance
    ) => {
      broadcastExpanded(node)
      ctx.emit('node-expand', nodeData, node, instance)
    }

    const renderNode = (child: Node) => (
      <RTreeNode
        key={getNodeKey(child)}
        node={child}
        props={props}
        accordion={props.accordion}
        render-after-expand={props.renderAfterExpand}
        show-checkbox={props.showCheckbox}
        render-content={props.renderContent}
        onNodeExpand={handleNodeExpand}
      ></RTreeNode>
    )

    return () => (
      <div
        ref={el$}
        class={[
          bem(),
          isBem('dragging', !!dragState.value.draggingNode),
          isBem('drop-not-allow', !dragState.value.allowDrop),
          isBem('drop-inner', dragState.value.dropType === 'inner'),
          { [bem('highlight-current') as string]: props.highlightCurrent }
        ]}
        role="tree"
      >
        {root.value.childNodes.map((child) => renderNode(child))}
        {/* 数据为空 */}
        {isEmpty.value && (
          <div class={bem('empty-block')}>
            <span class={bem('empty-text')}>
              {props.emptyText || t('emptyText')}
            </span>
          </div>
        )}
        <div
          v-show={dragState.value.showDropIndicator}
          ref={dropIndicator$}
          class={bem('drop-indicator')}
        ></div>
      </div>
    )
  }
})
