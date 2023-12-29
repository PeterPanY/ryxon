import {
  h,
  ref,
  reactive,
  computed,
  onMounted,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Utils
import { extend } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { pick } from 'lodash-unified'
import { useSelect } from './select'
import { useTree } from './tree'
import CacheOptions from './cache-options'

// Components
import { Select, selectProps } from '../select'
import { Tree, treeProps } from '../tree'

const [name] = createNamespace('tree-select-pc')

export const treeSelectPcProps = extend({}, selectProps, treeProps, {
  cacheData: { type: Array, default: () => [] }
})

export type TreeSelectPcProps = ExtractPropTypes<typeof treeSelectPcProps>

export default defineComponent({
  name,
  // 禁用`RSelect`继承当前属性
  inheritAttrs: false,
  props: treeSelectPcProps,
  setup(props, context) {
    const { slots, expose } = context

    const select = ref<InstanceType<typeof Select>>()
    const tree = ref<InstanceType<typeof Tree>>()

    const key = computed(() => props.nodeKey || props.valueKey || 'value')

    const selectProps = useSelect(props, context, { select, tree, key })
    // eslint-disable-next-line no-restricted-syntax
    const { cacheOptions, ...treeProps } = useTree(props, context, {
      select,
      tree,
      key
    })

    const methods = reactive({})
    expose(methods)

    onMounted(() => {
      Object.assign(methods, {
        // eslint-disable-next-line no-restricted-syntax
        ...pick(tree.value, [
          'filter',
          'updateKeyChildren',
          'getCheckedNodes',
          'setCheckedNodes',
          'getCheckedKeys',
          'setCheckedKeys',
          'setChecked',
          'getHalfCheckedNodes',
          'getHalfCheckedKeys',
          'getCurrentKey',
          'getCurrentNode',
          'setCurrentKey',
          'setCurrentNode',
          'getNode',
          'remove',
          'append',
          'insertBefore',
          'insertAfter'
        ]),
        // eslint-disable-next-line no-restricted-syntax
        ...pick(select.value, ['focus', 'blur'])
      })
    })
    return () =>
      h(
        Select,
        reactive({
          // eslint-disable-next-line no-restricted-syntax
          ...selectProps,
          // eslint-disable-next-line no-return-assign
          ref: (ref: any) => (select.value = ref)
        }),
        {
          // eslint-disable-next-line no-restricted-syntax
          ...slots,
          default: () => [
            h(CacheOptions, { data: cacheOptions.value }),
            h(
              Tree,
              reactive({
                // eslint-disable-next-line no-restricted-syntax
                ...treeProps,
                // eslint-disable-next-line no-return-assign
                ref: (ref: any) => (tree.value = ref)
              })
            )
          ]
        }
      )
  }
})
