// @ts-nocheck
import { computed, nextTick, toRefs, type Ref } from 'vue'
import { lodashPick } from '@ryxon/utils'
import { Select, selectProps } from '../select'
import { createNamespace } from '../utils'
import { Tree } from '../tree'

export const useSelect = (
  props,
  { attrs },
  {
    tree,
    key
  }: {
    select: Ref<InstanceType<typeof Select> | undefined>
    tree: Ref<InstanceType<typeof Tree> | undefined>
    key: Ref<string>
  }
) => {
  const [, bem] = createNamespace('tree-select-pc')

  const result = {
    // eslint-disable-next-line no-restricted-syntax
    ...lodashPick(toRefs(props), Object.keys(selectProps)),
    // eslint-disable-next-line no-restricted-syntax
    ...attrs,
    valueKey: key,
    popperClass: computed(() => {
      const classes = [bem('popper')]
      if (props.popperClass) classes.push(props.popperClass)
      return classes.join(' ')
    }),
    filterMethod: (keyword = '') => {
      if (props.filterMethod) props.filterMethod(keyword)

      nextTick(() => {
        // let tree node expand only, same with tree filter
        tree.value?.filter(keyword)
      })
    },
    // clear filter text when visible change
    onVisibleChange: (visible: boolean) => {
      attrs.onVisibleChange?.(visible)

      if (props.filterable && visible) {
        result.filterMethod()
      }
    }
  }

  return result
}
