<script lang="ts">
// @ts-nocheck
import { defineComponent, h, inject } from 'vue'

import { createNamespace } from '../utils'
import type { ComponentInternalInstance } from 'vue'
import type { RootTreeType } from './types'

export default defineComponent({
  name: 'RTreeNodeContent',
  props: {
    node: { type: Object, required: true },
    renderContent: Function
  },
  setup(props) {
    const [, bem] = createNamespace('tree')
    const nodeInstance = inject<ComponentInternalInstance>('NodeInstance')
    const tree = inject<RootTreeType>('RootTree')
    return () => {
      const { node } = props
      const { data, store } = node
      return props.renderContent
        ? props.renderContent(h, { _self: nodeInstance, node, data, store })
        : tree.ctx.slots.default
        ? tree.ctx.slots.default({ node, data })
        : h('span', { class: bem('node-label') }, [node.label])
    }
  }
})
</script>
